import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { createInterface, emitKeypressEvents, type Key } from "node:readline";
import {
  createBlobStaffAccountStore,
  createStaffAccount,
  hashStaffPassword,
  normalizeStaffEmail,
  verifyStaffPassword,
  type StaffAccount,
  type StaffAccountDocument,
} from "../shared/learning-core/src/staff-account-store";

export interface AdminAccountStore {
  read(): Promise<{ document: StaffAccountDocument; etag: string } | null>;
  write(
    document: StaffAccountDocument,
    expectedEtag: string | null,
  ): Promise<void>;
}
type OwnerCredentials = { email: string; password: string };
type StaffAdminCommand =
  | { action: "bootstrap"; email: string; password: string }
  | {
      action: "create";
      email: string;
      password: string;
      role: "teacher" | "developer";
    }
  | { action: "email"; id: string; email: string }
  | { action: "password"; id: string; password: string }
  | { action: "deactivate"; id: string };

class StaffAdminError extends Error {}
class CancelledError extends Error {}

export function staffAccountMetadata(account: StaffAccount) {
  const { id, email, role, isOwner, active, version, createdAt, updatedAt } =
    account;
  return { id, email, role, isOwner, active, version, createdAt, updatedAt };
}

/** Every mutation reads current state, reauthenticates and commits by ETag. */
export async function runStaffAdminCommand(
  store: AdminAccountStore,
  command: StaffAdminCommand,
  credentials?: OwnerCredentials,
) {
  const snapshot = await store.read();
  const now = Date.now();
  if (command.action === "bootstrap") {
    if (snapshot) throw new StaffAdminError("already_initialized");
    const account = await createStaffAccount(
      {
        email: command.email,
        password: command.password,
        role: "developer",
        isOwner: true,
      },
      now,
    );
    await store.write({ schemaVersion: 1, accounts: [account] }, null);
    return staffAccountMetadata(account);
  }
  const document = snapshot?.document;
  const actor =
    credentials &&
    document?.accounts.find(
      (account) =>
        account.email === credentials.email.trim().toLowerCase() &&
        account.active &&
        account.isOwner &&
        account.role === "developer",
    );
  if (
    !actor ||
    !credentials ||
    !(await verifyStaffPassword(credentials.password, actor.passwordHash))
  )
    throw new StaffAdminError("owner_auth_required");
  if (!snapshot || !document) throw new StaffAdminError("owner_auth_required");
  const accounts = structuredClone(document.accounts);
  let changed: StaffAccount;
  if (command.action === "create") {
    const email = normalizeStaffEmail(command.email);
    if (accounts.some((account) => account.email === email))
      throw new StaffAdminError("email_in_use");
    changed = await createStaffAccount(
      { email, password: command.password, role: command.role },
      now,
    );
    accounts.push(changed);
  } else {
    const target = accounts.find((account) => account.id === command.id);
    if (!target) throw new StaffAdminError("account_missing");
    if (command.action === "email") {
      const email = normalizeStaffEmail(command.email);
      if (
        accounts.some(
          (account) => account.id !== target.id && account.email === email,
        )
      )
        throw new StaffAdminError("email_in_use");
      target.email = email;
    } else if (command.action === "password") {
      target.passwordHash = await hashStaffPassword(command.password);
    } else {
      // An owner cannot be disabled here, including by another owner.
      if (target.isOwner || target.id === actor.id)
        throw new StaffAdminError("owner_lockout");
      target.active = false;
    }
    target.version++;
    target.updatedAt = now;
    changed = target;
  }
  await store.write({ schemaVersion: 1, accounts }, snapshot.etag);
  return staffAccountMetadata(changed);
}

async function textInput(prompt: string): Promise<string> {
  const reader = createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  try {
    return await new Promise((resolveValue, reject) => {
      reader.once("SIGINT", () => reject(new CancelledError()));
      reader.question(prompt, resolveValue);
    });
  } finally {
    reader.close();
  }
}

/** Passwords never enter readline history, command arguments or console output. */
export async function hiddenPassword(
  prompt: string,
  input: NodeJS.ReadStream = process.stdin,
  output: Pick<NodeJS.WriteStream, "write"> = process.stdout,
): Promise<string> {
  if (!input.isTTY) throw new StaffAdminError("interactive_terminal_required");
  const wasRaw = input.isRaw;
  const wasPaused = input.isPaused();
  emitKeypressEvents(input);
  output.write(prompt);
  return new Promise((resolveValue, reject) => {
    let value = "";
    let finished = false;
    const cleanup = () => {
      input.removeListener("keypress", keypress);
      input.removeListener("error", failed);
      input.removeListener("end", cancelled);
      input.setRawMode(wasRaw);
      if (wasPaused) input.pause();
      output.write("\n");
    };
    const finish = (error?: Error) => {
      if (finished) return;
      finished = true;
      cleanup();
      if (error) reject(error);
      else resolveValue(value);
      value = "";
    };
    const failed = () => finish(new StaffAdminError("terminal_error"));
    const cancelled = () => finish(new CancelledError());
    const keypress = (character: string | undefined, key: Key) => {
      if (key.ctrl && key.name === "c") return cancelled();
      if (key.name === "return" || key.name === "enter") return finish();
      if (key.name === "backspace") {
        value = [...value].slice(0, -1).join("");
        return;
      }
      if (
        character &&
        !key.ctrl &&
        !key.meta &&
        !/[\u0000-\u001f\u007f]/u.test(character)
      ) {
        value += character;
        if (value.length > 128)
          finish(new StaffAdminError("password_too_long"));
      }
    };
    input.on("keypress", keypress);
    input.once("error", failed);
    input.once("end", cancelled);
    try {
      input.setRawMode(true);
      input.resume();
    } catch {
      failed();
    }
  });
}

async function newPassword(): Promise<string> {
  const password = await hiddenPassword(
    "New password (12–128 characters; hidden): ",
  );
  const confirmation = await hiddenPassword("Repeat new password (hidden): ");
  if (password !== confirmation)
    throw new StaffAdminError("passwords_do_not_match");
  return password;
}

async function authenticateOwner(): Promise<OwnerCredentials> {
  return {
    email: await textInput("Owner email: "),
    password: await hiddenPassword("Current owner password (hidden): "),
  };
}

async function main() {
  if (Bun.argv.length > 2)
    throw new StaffAdminError("interactive_only_no_arguments");
  if (!process.stdin.isTTY || !process.stdout.isTTY)
    throw new StaffAdminError("interactive_terminal_required");
  const configPath = resolve(
    import.meta.dir,
    "../artifacts/private/language-staff-admin.json",
  );
  const config: unknown = JSON.parse(await readFile(configPath, "utf8"));
  if (
    !config ||
    typeof config !== "object" ||
    !("blobToken" in config) ||
    typeof config.blobToken !== "string" ||
    config.blobToken.length < 20
  )
    throw new StaffAdminError("private_configuration_missing");
  const store = createBlobStaffAccountStore(config.blobToken);
  console.log(
    "Private staff account manager · English Automaticity and DeutschFlow",
  );
  console.log(
    "Both apps use these accounts. Passwords are stored only as server-side hashes.",
  );
  for (;;) {
    const snapshot = await store.read();
    if (!snapshot) {
      console.log(
        "No owner account exists. Create the initial owner for both apps.",
      );
      const email = await textInput("Owner email: ");
      const password = await newPassword();
      await runStaffAdminCommand(store, {
        action: "bootstrap",
        email,
        password,
      });
      console.log(
        "Owner account created. Use this email and password at either app's /staff page.",
      );
      continue;
    }
    console.log(
      "\n1. List accounts\n2. Create teacher/developer account\n3. Change email\n4. Change password\n5. Deactivate account\n0. Exit",
    );
    const action = (await textInput("Choose: ")).trim();
    if (action === "0") return;
    if (action === "1") {
      console.table(snapshot.document.accounts.map(staffAccountMetadata));
      continue;
    }
    if (!["2", "3", "4", "5"].includes(action)) {
      console.log("Choose a number from the menu.");
      continue;
    }
    const credentials = await authenticateOwner();
    let command: StaffAdminCommand;
    if (action === "2") {
      const email = await textInput("New account email: ");
      const roleInput = (
        await textInput("Role: teacher or developer: ")
      ).trim();
      if (roleInput !== "teacher" && roleInput !== "developer")
        throw new StaffAdminError("invalid_role");
      command = {
        action: "create",
        email,
        role: roleInput,
        password: await newPassword(),
      };
    } else {
      const email = normalizeStaffEmail(
        await textInput("Account email to change: "),
      );
      const target = snapshot.document.accounts.find(
        (account) => account.email === email,
      );
      if (!target) throw new StaffAdminError("account_missing");
      command =
        action === "3"
          ? {
              action: "email",
              id: target.id,
              email: await textInput("New email: "),
            }
          : action === "4"
            ? {
                action: "password",
                id: target.id,
                password: await newPassword(),
              }
            : { action: "deactivate", id: target.id };
      if (
        action === "5" &&
        (await textInput(`Type DEACTIVATE to disable ${target.email}: `)) !==
          "DEACTIVATE"
      ) {
        console.log("Cancelled. No changes saved.");
        continue;
      }
    }
    const result = await runStaffAdminCommand(store, command, credentials);
    console.log(
      `Saved ${result.email}. Changes apply to both apps; existing sessions for this account must sign in again.`,
    );
  }
}

if (import.meta.main) {
  try {
    await main();
  } catch (error) {
    if (error instanceof CancelledError) {
      console.error("Cancelled. No pending operation was saved.");
      process.exitCode = 130;
    } else {
      // Provider errors may contain authorization details: never print raw errors.
      console.error(
        error instanceof StaffAdminError
          ? `Unable to continue: ${error.message}.`
          : "Unable to save safely. Check the private configuration, connection, email/password policy and account state, then retry. No success was reported.",
      );
      process.exitCode = 1;
    }
  }
}
