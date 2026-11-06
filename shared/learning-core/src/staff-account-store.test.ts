import { expect, test } from "bun:test";
import {
  createStaffAccount,
  hashStaffPassword,
  verifyStaffPassword,
  validateStaffAccountDocument,
  resolveStaffBlobEtag,
} from "./staff-account-store";

test("compressed private Blob responses need matching authoritative ETags before CAS", () => {
  expect(resolveStaffBlobEtag('"version-1"')).toBe('"version-1"');
  expect(resolveStaffBlobEtag('W/"version-1"', '"version-1"')).toBe(
    '"version-1"',
  );
  expect(() => resolveStaffBlobEtag('W/"version-1"')).toThrow();
  expect(() => resolveStaffBlobEtag('W/"version-1"', '"version-2"')).toThrow();
  expect(() => resolveStaffBlobEtag("")).toThrow();
});

test("password hashes use independent salts and never contain the password", async () => {
  const password = "private-test-password-1234";
  const first = await hashStaffPassword(password);
  const second = await hashStaffPassword(password);
  expect(first).not.toBe(second);
  expect(first).not.toContain(password);
  expect(await verifyStaffPassword(password, first)).toBe(true);
  expect(await verifyStaffPassword("wrong-password", first)).toBe(false);
  expect(await verifyStaffPassword(password, "malformed")).toBe(false);
});

test("accounts normalize email, require strong passwords and restrict ownership", async () => {
  const account = await createStaffAccount({
    email: " Owner@Example.test ",
    password: "private-owner-password-1234",
    role: "developer",
    isOwner: true,
  });
  expect(account.email).toBe("owner@example.test");
  expect(account.isOwner).toBe(true);
  expect(account.version).toBe(1);
  expect(account.active).toBe(true);
  expect(
    await verifyStaffPassword(
      "private-owner-password-1234",
      account.passwordHash,
    ),
  ).toBe(true);
  expect(
    createStaffAccount({
      email: "bad",
      password: "long-enough-password",
      role: "teacher",
    }),
  ).rejects.toThrow();
  expect(
    createStaffAccount({
      email: "teacher@example.test",
      password: "short",
      role: "teacher",
    }),
  ).rejects.toThrow();
  expect(
    createStaffAccount({
      email: "teacher@example.test",
      password: "long-enough-password",
      role: "teacher",
      isOwner: true,
    }),
  ).rejects.toThrow();
});

test("stored documents reject duplicate emails and missing active owner", async () => {
  const owner = await createStaffAccount({
    email: "owner@example.test",
    password: "long-enough-password",
    role: "developer",
    isOwner: true,
  });
  expect(
    validateStaffAccountDocument({ schemaVersion: 1, accounts: [owner] })
      .accounts,
  ).toHaveLength(1);
  expect(() =>
    validateStaffAccountDocument({
      schemaVersion: 1,
      accounts: [owner, { ...owner, id: "second-account" }],
    }),
  ).toThrow();
  expect(() =>
    validateStaffAccountDocument({
      schemaVersion: 1,
      accounts: [{ ...owner, active: false }],
    }),
  ).toThrow();
  expect(() =>
    validateStaffAccountDocument({
      schemaVersion: 1,
      accounts: [{ ...owner, role: "administrator" }],
    }),
  ).toThrow();
});
