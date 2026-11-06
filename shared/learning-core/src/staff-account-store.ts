import { randomBytes, randomUUID, scrypt, timingSafeEqual } from "node:crypto";
import { get, put, BlobPreconditionFailedError } from "@vercel/blob";

export type StaffRole = "teacher" | "developer";
export interface StaffAccount {
  id: string;
  email: string;
  role: StaffRole;
  isOwner: boolean;
  active: boolean;
  version: number;
  passwordHash: string;
  createdAt: number;
  updatedAt: number;
}
export interface StaffAccountDocument {
  schemaVersion: 1;
  accounts: StaffAccount[];
}
export interface StaffAccountStore {
  read(): Promise<{ document: StaffAccountDocument; etag: string } | null>;
  write(document: StaffAccountDocument, expectedEtag: string | null): Promise<void>;
}
export class StaffAccountValidationError extends Error {}
export class StaffAccountConflictError extends Error {}
const hashPattern = /^scrypt\$32768\$8\$1\$[A-Za-z0-9_-]{43}\$[A-Za-z0-9_-]{86}$/u;
const pathname = "language-staff/accounts-v1.json";

export function normalizeStaffEmail(value: unknown): string {
  if (typeof value !== "string") throw new StaffAccountValidationError("invalid_email");
  const email = value.trim().toLowerCase();
  if (email.length > 254 || !/^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+$/u.test(email)) throw new StaffAccountValidationError("invalid_email");
  return email;
}
export function validateStaffPassword(value: unknown): asserts value is string {
  if (typeof value !== "string" || value.length < 12 || value.length > 512 || !value.trim()) throw new StaffAccountValidationError("invalid_password");
}
async function derive(password: string, salt: Buffer): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    scrypt(password, salt, 64, { N: 32768, r: 8, p: 1, maxmem: 64 * 1024 * 1024 }, (error, result) => error ? reject(error) : resolve(result));
  });
}
export async function hashStaffPassword(password: string): Promise<string> {
  validateStaffPassword(password);
  const salt = randomBytes(32);
  const hash = await derive(password, salt);
  return `scrypt$32768$8$1$${salt.toString("base64url")}$${hash.toString("base64url")}`;
}
export async function verifyStaffPassword(password: string, stored: string): Promise<boolean> {
  if (typeof password !== "string" || password.length > 512 || !hashPattern.test(stored)) return false;
  const parts = stored.split("$");
  const salt = Buffer.from(parts[4]!, "base64url");
  const expected = Buffer.from(parts[5]!, "base64url");
  const actual = await derive(password, salt);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}
export async function createStaffAccount(input: { email: string; password: string; role: StaffRole; isOwner?: boolean }, now = Date.now()): Promise<StaffAccount> {
  const email = normalizeStaffEmail(input.email);
  if ((input.role !== "teacher" && input.role !== "developer") || (input.isOwner && input.role !== "developer")) throw new StaffAccountValidationError("invalid_role");
  return { id: randomUUID(), email, role: input.role, isOwner: input.isOwner === true, active: true, version: 1, passwordHash: await hashStaffPassword(input.password), createdAt: now, updatedAt: now };
}
export function validateStaffAccountDocument(value: unknown): StaffAccountDocument {
  if (!value || typeof value !== "object") throw new StaffAccountValidationError("invalid_document");
  const record = value as Record<string, unknown>;
  if (record.schemaVersion !== 1 || !Array.isArray(record.accounts) || record.accounts.length < 1 || record.accounts.length > 20) throw new StaffAccountValidationError("invalid_document");
  const ids = new Set<string>();
  const emails = new Set<string>();
  const accounts = record.accounts.map((item: unknown): StaffAccount => {
    if (!item || typeof item !== "object") throw new StaffAccountValidationError("invalid_account");
    const account = item as Record<string, unknown>;
    if (typeof account.id !== "string" || !/^[a-zA-Z0-9_-]{8,64}$/u.test(account.id) || ids.has(account.id) || typeof account.email !== "string" || normalizeStaffEmail(account.email) !== account.email || emails.has(account.email) || (account.role !== "teacher" && account.role !== "developer") || typeof account.isOwner !== "boolean" || (account.isOwner && account.role !== "developer") || typeof account.active !== "boolean" || !Number.isSafeInteger(account.version) || (account.version as number) < 1 || typeof account.passwordHash !== "string" || !hashPattern.test(account.passwordHash) || typeof account.createdAt !== "number" || !Number.isFinite(account.createdAt) || typeof account.updatedAt !== "number" || !Number.isFinite(account.updatedAt)) throw new StaffAccountValidationError("invalid_account");
    ids.add(account.id); emails.add(account.email);
    return { id: account.id, email: account.email, role: account.role, isOwner: account.isOwner, active: account.active, version: account.version as number, passwordHash: account.passwordHash, createdAt: account.createdAt, updatedAt: account.updatedAt };
  });
  if (!accounts.some((account) => account.active && account.isOwner)) throw new StaffAccountValidationError("owner_required");
  return { schemaVersion: 1, accounts };
}

/** A private, uncached document shared by both apps; no credential enters a public URL. */
export function createBlobStaffAccountStore(token: string): StaffAccountStore {
  if (!token) throw new StaffAccountValidationError("storage_not_configured");
  return {
    async read() {
      const result = await get(pathname, { access: "private", token, useCache: false });
      if (!result) return null;
      if (result.statusCode !== 200 || !result.stream) throw new Error("staff_storage_unavailable");
      const reader = result.stream.getReader();
      const chunks: Uint8Array[] = [];
      let size = 0;
      try {
        for (;;) {
          const chunk = await reader.read();
          if (chunk.done) break;
          size += chunk.value.byteLength;
          if (size > 65536) { await reader.cancel(); throw new Error("staff_document_too_large"); }
          chunks.push(chunk.value);
        }
      } finally { reader.releaseLock(); }
      return { document: validateStaffAccountDocument(JSON.parse(Buffer.concat(chunks).toString("utf8")) as unknown), etag: result.blob.etag };
    },
    async write(document, expectedEtag) {
      const validated = validateStaffAccountDocument(document);
      try {
        await put(pathname, JSON.stringify(validated), { access: "private", token, addRandomSuffix: false, allowOverwrite: expectedEtag !== null, ...(expectedEtag === null ? {} : { ifMatch: expectedEtag }), contentType: "application/json", cacheControlMaxAge: 0 });
      } catch (error) {
        if (error instanceof BlobPreconditionFailedError || (error instanceof Error && /already exists/iu.test(error.message))) throw new StaffAccountConflictError("account_conflict");
        throw error;
      }
    },
  };
}
