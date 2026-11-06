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

/** قرارداد خواندن سند حساب‌ها و ذخیرهٔ شرطی؛ ETag مانع بازنویسی تغییر هم‌زمان است. */
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

/** فقط کد خطای کنترل‌شده دارد؛ متن پاسخ سرویس یا رمز در آن قرار نمی‌گیرد. */
class StaffAdminError extends Error {}
/** لغو تعاملی را از خطای ذخیره جدا می‌کند تا خروج Ctrl-C کد صحیح داشته باشد. */
class CancelledError extends Error {}

/** ورودی حساب کامل است؛ خروجی فقط مشخصات نمایشی است و هش رمز را حذف می‌کند. */
export function staffAccountMetadata(account: StaffAccount) {
  const { id, email, role, isOwner, active, version, createdAt, updatedAt } =
    account;
  return { id, email, role, isOwner, active, version, createdAt, updatedAt };
}

/**
 * فرمان و مشخصات مالک را می‌گیرد و پس از خواندن تازه و احراز هویت، مشخصات امن حساب را برمی‌گرداند.
 * ذخیره با ETag انجام می‌شود؛ شکست اعتبارسنجی یا تعارض هیچ موفقیتی گزارش نمی‌کند.
 */
export async function runStaffAdminCommand(
  store: AdminAccountStore,
  command: StaffAdminCommand,
  credentials?: OwnerCredentials,
) {
  const snapshot = await store.read();
  const now = Date.now();
  if (command.action === "bootstrap") {
    // فقط مخزن واقعاً خالی اجازهٔ ساخت مالک نخست دارد؛ حساب موجود جایگزین نمی‌شود.
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
      // حتی مالک دیگر هم نمی‌تواند حساب مالک را غیرفعال کند؛ راه مدیریت نباید بسته شود.
      if (target.isOwner || target.id === actor.id)
        throw new StaffAdminError("owner_lockout");
      target.active = false;
    }
    // تغییر هویت/رمز/وضعیت، نسخه را عوض می‌کند تا نشست‌های قبلی دیگر معتبر نباشند.
    target.version++;
    target.updatedAt = now;
    changed = target;
  }
  // نوشتن فقط با نسخه‌ای که خوانده‌ایم مجاز است؛ تغییر هم‌زمان سرویس را بازنویسی نمی‌کنیم.
  await store.write({ schemaVersion: 1, accounts }, snapshot.etag);
  return staffAccountMetadata(changed);
}

/** پرسش غیرمحرمانه را نمایش می‌دهد و پاسخ را می‌گیرد؛ رابط حتی پس از لغو بسته می‌شود. */
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

/**
 * رمز را از ترمینال تعاملی بدون بازتاب می‌خواند و به فراخواننده برمی‌گرداند.
 * ورودی فایل/pipe پذیرفته نیست؛ وضعیت قبلی ترمینال در پایان، خطا یا Ctrl-C برگردانده می‌شود.
 */
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
    /** شنونده‌های رمز را حذف و وضعیت قبلی ترمینال را بازیابی می‌کند؛ خرابی را برمی‌گرداند. */
    const cleanup = () => {
      input.removeListener("keypress", keypress);
      input.removeListener("error", failed);
      input.removeListener("end", cancelled);
      let failedRestore = false;
      try {
        input.setRawMode(wasRaw);
      } catch {
        failedRestore = true;
      }
      try {
        if (wasPaused) input.pause();
        output.write("\n");
      } catch {
        failedRestore = true;
      }
      return failedRestore;
    };
    /** عملیات را یک بار تمام می‌کند؛ در خطای ترمینال رمز به‌عنوان پاسخ تحویل داده نمی‌شود. */
    const finish = (error?: Error) => {
      if (finished) return;
      finished = true;
      const failedRestore = cleanup();
      if (error || failedRestore)
        reject(error ?? new StaffAdminError("terminal_error"));
      else resolveValue(value);
      value = "";
    };
    /** خطای خام ترمینال به کد امن تبدیل می‌شود؛ محتوای خطا چاپ یا بازگردانده نمی‌شود. */
    const failed = () => finish(new StaffAdminError("terminal_error"));
    /** قطع ورودی یا Ctrl-C هیچ رمز نیمه‌واردشده‌ای را تحویل نمی‌دهد. */
    const cancelled = () => finish(new CancelledError());
    /** Enter پایان است، Backspace آخرین نویسه را حذف می‌کند و کلیدهای کنترلی ذخیره نمی‌شوند. */
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
      // اگر فعال‌کردن حالت خام شکست بخورد هم مسیر پاک‌سازی و بازیابی اجرا می‌شود.
      failed();
    }
  });
}

/** رمز تازه را دو بار پنهانی می‌گیرد؛ فقط پاسخ‌های یکسان به اعتبارسنجی و هش‌سازی می‌رسند. */
async function newPassword(): Promise<string> {
  const password = await hiddenPassword(
    "New password (12–128 characters; hidden): ",
  );
  const confirmation = await hiddenPassword("Repeat new password (hidden): ");
  if (password !== confirmation)
    throw new StaffAdminError("passwords_do_not_match");
  return password;
}

/** ایمیل و رمز فعلی مالک را برای یک عملیات می‌گیرد؛ چیزی روی دیسک ذخیره نمی‌شود. */
async function authenticateOwner(): Promise<OwnerCredentials> {
  return {
    email: await textInput("Owner email: "),
    password: await hiddenPassword("Current owner password (hidden): "),
  };
}

/** فقط توکن مخزن را از تنظیمات معتبر برمی‌گرداند؛ کلیدهای دیگر وارد مسیر نمایش نمی‌شوند. */
export function parseStaffAdminConfiguration(value: unknown): {
  blobToken: string;
} {
  if (
    !value ||
    typeof value !== "object" ||
    !("blobToken" in value) ||
    typeof value.blobToken !== "string" ||
    value.blobToken.length < 20 ||
    value.blobToken.length > 512 ||
    /\s/u.test(value.blobToken)
  )
    throw new StaffAdminError("private_configuration_missing");
  return { blobToken: value.blobToken };
}

/** مسیر ثابت خصوصی زیر ریشهٔ پروژه را می‌خواند؛ خطای فایل/JSON بدون محتوای محرمانه گزارش می‌شود. */
export async function loadStaffAdminConfiguration(
  root = resolve(import.meta.dir, ".."),
): Promise<{ blobToken: string }> {
  try {
    const text = await readFile(
      resolve(root, "artifacts/private/language-staff-admin.json"),
      "utf8",
    );
    if (text.length > 8192)
      throw new StaffAdminError("private_configuration_missing");
    return parseStaffAdminConfiguration(JSON.parse(text) as unknown);
  } catch {
    throw new StaffAdminError("private_configuration_missing");
  }
}

/** منوی تعاملی دو اپ را اجرا می‌کند؛ هیچ رمز یا فرمان تغییری از آرگومان خط فرمان نمی‌پذیرد. */
async function main() {
  if (Bun.argv.length > 2)
    throw new StaffAdminError("interactive_only_no_arguments");
  if (!process.stdin.isTTY || !process.stdout.isTTY)
    throw new StaffAdminError("interactive_terminal_required");
  const config = await loadStaffAdminConfiguration();
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
      // توکن خصوصی همین رایانه فقط در نبود همهٔ حساب‌ها اجازهٔ راه‌اندازی نخست را می‌دهد.
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
      // فهرست فقط مشخصات امن دارد؛ هش یا رمز در جدول خروجی قرار نمی‌گیرد.
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
    // تابع فرمان دوباره سند را می‌خواند؛ انتخاب منو مجوز عبور از احراز هویت نیست.
    const result = await runStaffAdminCommand(store, command, credentials);
    console.log(
      `Saved ${result.email}. Changes apply to both apps; existing sessions for this account must sign in again.`,
    );
  }
}

if (import.meta.main) {
  // واردکردن فایل در آزمون، منو را اجرا نمی‌کند و تنظیمات خصوصی را نمی‌خواند.
  try {
    await main();
  } catch (error) {
    if (error instanceof CancelledError) {
      console.error("Cancelled. No pending operation was saved.");
      process.exitCode = 130;
    } else {
      // خطای سرویس ممکن است جزئیات مجوز داشته باشد؛ تنها کدهای کنترل‌شده چاپ می‌شوند.
      console.error(
        error instanceof StaffAdminError
          ? `Unable to continue: ${error.message}.`
          : "Unable to save safely. Check the private configuration, connection, email/password policy and account state, then retry. No success was reported.",
      );
      process.exitCode = 1;
    }
  }
}
