import { describe, expect, test } from "bun:test";
import {
  runStaffAdminCommand,
  staffAccountMetadata,
  type AdminAccountStore,
} from "./manage-language-staff";
import {
  createStaffAccount,
  verifyStaffPassword,
  type StaffAccount,
} from "../shared/learning-core/src/staff-account-store";

const ownerCredentials = {
  email: "owner@example.test",
  password: "Fixture owner password 123!",
};

function memoryStore(accounts: StaffAccount[] = []) {
  let etag = "1";
  let document = { schemaVersion: 1 as const, accounts };
  let writes = 0;
  const store: AdminAccountStore = {
    async read() {
      return document.accounts.length
        ? { document: structuredClone(document), etag }
        : null;
    },
    async write(next, expected) {
      if (expected !== (document.accounts.length ? etag : null))
        throw new Error("fixture conflict");
      document = structuredClone(next);
      etag = String(Number(etag) + 1);
      writes++;
    },
  };
  return {
    store,
    snapshot: () => structuredClone(document),
    writes: () => writes,
  };
}

async function owner() {
  return createStaffAccount({
    ...ownerCredentials,
    role: "developer",
    isOwner: true,
  });
}

describe("private local language staff administration", () => {
  test("bootstraps one owner and refuses replacing an existing account store", async () => {
    const state = memoryStore();
    const account = await runStaffAdminCommand(state.store, {
      action: "bootstrap",
      ...ownerCredentials,
    });
    expect(account.email).toBe(ownerCredentials.email);
    expect(account.isOwner).toBe(true);
    expect(account.role).toBe("developer");
    expect(
      await verifyStaffPassword(
        ownerCredentials.password,
        state.snapshot().accounts[0]!.passwordHash,
      ),
    ).toBe(true);
    await expect(
      runStaffAdminCommand(state.store, {
        action: "bootstrap",
        email: "replacement@example.test",
        password: "Fixture replacement password 123!",
      }),
    ).rejects.toThrow("already_initialized");
    expect(state.writes()).toBe(1);
  });

  test("requires an active owner's current email and password before every mutation", async () => {
    const state = memoryStore([await owner()]);
    const command = {
      action: "create" as const,
      email: "teacher@example.test",
      password: "Fixture teacher password 123!",
      role: "teacher" as const,
    };
    await expect(runStaffAdminCommand(state.store, command)).rejects.toThrow(
      "owner_auth_required",
    );
    await expect(
      runStaffAdminCommand(state.store, command, {
        ...ownerCredentials,
        password: "incorrect fixture password",
      }),
    ).rejects.toThrow("owner_auth_required");
    expect(state.writes()).toBe(0);
    const teacher = await runStaffAdminCommand(
      state.store,
      command,
      ownerCredentials,
    );
    expect(teacher.role).toBe("teacher");
    expect(teacher.isOwner).toBe(false);
    await expect(
      runStaffAdminCommand(
        state.store,
        {
          ...command,
          email: "another@example.test",
        },
        { email: command.email, password: command.password },
      ),
    ).rejects.toThrow("owner_auth_required");
    expect(state.writes()).toBe(1);
  });

  test("normalizes email and rejects duplicate identities without overwriting", async () => {
    const state = memoryStore([await owner()]);
    const created = await runStaffAdminCommand(
      state.store,
      {
        action: "create",
        email: " Teacher@Example.Test ",
        role: "teacher",
        password: "Fixture teacher password 123!",
      },
      ownerCredentials,
    );
    expect(created.email).toBe("teacher@example.test");
    await expect(
      runStaffAdminCommand(
        state.store,
        {
          action: "create",
          email: "TEACHER@example.test",
          role: "developer",
          password: "Fixture replacement password 123!",
        },
        ownerCredentials,
      ),
    ).rejects.toThrow("email_in_use");
    expect(state.snapshot().accounts).toHaveLength(2);
    expect(state.writes()).toBe(1);
  });

  test("email and password changes increment session version and replace only the selected account", async () => {
    const originalOwner = await owner();
    const teacher = await createStaffAccount({
      email: "teacher@example.test",
      role: "teacher",
      password: "Fixture old teacher password 123!",
    });
    const state = memoryStore([originalOwner, teacher]);
    const renamed = await runStaffAdminCommand(
      state.store,
      {
        action: "email",
        id: teacher.id,
        email: " New.Teacher@Example.Test ",
      },
      ownerCredentials,
    );
    expect(renamed.email).toBe("new.teacher@example.test");
    expect(renamed.version).toBe(teacher.version + 1);
    const changed = await runStaffAdminCommand(
      state.store,
      {
        action: "password",
        id: teacher.id,
        password: "Fixture new teacher password 456!",
      },
      ownerCredentials,
    );
    expect(changed.version).toBe(teacher.version + 2);
    const saved = state
      .snapshot()
      .accounts.find((account) => account.id === teacher.id)!;
    expect(
      await verifyStaffPassword(
        "Fixture old teacher password 123!",
        saved.passwordHash,
      ),
    ).toBe(false);
    expect(
      await verifyStaffPassword(
        "Fixture new teacher password 456!",
        saved.passwordHash,
      ),
    ).toBe(true);
    expect(
      state
        .snapshot()
        .accounts.find((account) => account.id === originalOwner.id),
    ).toEqual(originalOwner);
  });

  test("does not deactivate the acting owner and revokes a teacher by version", async () => {
    const originalOwner = await owner();
    const teacher = await createStaffAccount({
      email: "teacher@example.test",
      role: "teacher",
      password: "Fixture teacher password 123!",
    });
    const state = memoryStore([originalOwner, teacher]);
    await expect(
      runStaffAdminCommand(
        state.store,
        { action: "deactivate", id: originalOwner.id },
        ownerCredentials,
      ),
    ).rejects.toThrow("owner_lockout");
    expect(state.writes()).toBe(0);
    const changed = await runStaffAdminCommand(
      state.store,
      { action: "deactivate", id: teacher.id },
      ownerCredentials,
    );
    expect(changed.active).toBe(false);
    expect(changed.version).toBe(teacher.version + 1);
  });

  test("a failed compare-and-swap does not report a successful password change", async () => {
    const state = memoryStore([await owner()]);
    const store: AdminAccountStore = {
      read: state.store.read,
      async write() {
        throw new Error("fixture conflict");
      },
    };
    await expect(
      runStaffAdminCommand(
        store,
        {
          action: "password",
          id: state.snapshot().accounts[0]!.id,
          password: "Fixture new owner password 456!",
        },
        ownerCredentials,
      ),
    ).rejects.toThrow("fixture conflict");
    expect(state.writes()).toBe(0);
  });

  test("listed metadata never exposes the password hash", async () => {
    const account = await owner();
    const metadata = staffAccountMetadata(account);
    expect(metadata).not.toHaveProperty("passwordHash");
    expect(JSON.stringify(metadata)).not.toContain(account.passwordHash);
    expect(metadata.email).toBe(ownerCredentials.email);
  });
});
