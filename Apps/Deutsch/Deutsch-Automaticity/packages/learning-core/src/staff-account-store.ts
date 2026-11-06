import { randomBytes, randomUUID, scrypt, timingSafeEqual } from "node:crypto";
import { get, head, put, BlobPreconditionFailedError } from "@vercel/blob";

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
  write(
    document: StaffAccountDocument,
    expectedEtag: string | null,
  ): Promise<void>;
}
export class StaffAccountValidationError extends Error {}
export class StaffAccountConflictError extends Error {}
/**
 * ورودی: ETag پاسخ محتوا و، فقط برای پاسخ فشردهٔ ضعیف، ETag متادیتای مبدأ.
 * خروجی: نسخهٔ قویِ همان سند برای CAS. حذف سادهٔ W/ بدون تطبیق متادیتا مجاز نیست:
 * ممکن است بین دو خواندن سند تغییر کرده باشد و نباید دادهٔ تازه را بازنویسی کنیم.
 */
export function resolveStaffBlobEtag(
  transferEtag: string,
  authoritativeEtag?: string,
): string {
  if (
    !/^"[^"\r\n]+"$/u.test(transferEtag) &&
    !/^W\/"[^"\r\n]+"$/u.test(transferEtag)
  )
    throw new StaffAccountConflictError("invalid_etag");
  if (!transferEtag.startsWith("W/")) return transferEtag;
  if (authoritativeEtag !== transferEtag.slice(2))
    throw new StaffAccountConflictError("account_conflict");
  return authoritativeEtag;
}
const hashPattern =
  /^scrypt\$32768\$8\$1\$[A-Za-z0-9_-]{43}\$[A-Za-z0-9_-]{86}$/u;
const defaultPathname = "language-staff/accounts-v1.json";

/** ورودی ایمیل کاربر است؛ خروجیِ یکتا و کوچک‌شده جلوی حساب تکراری با تفاوت حروف را می‌گیرد. */
export function normalizeStaffEmail(value: unknown): string {
  if (typeof value !== "string")
    throw new StaffAccountValidationError("invalid_email");
  const email = value.trim().toLowerCase();
  if (
    email.length > 254 ||
    !/^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+$/u.test(
      email,
    )
  )
    throw new StaffAccountValidationError("invalid_email");
  return email;
}
/** رمز فقط در مرز سرور اعتبارسنجی می‌شود؛ محدودیت طول هم امنیت و هم هزینهٔ پردازش را کنترل می‌کند. */
export function validateStaffPassword(value: unknown): asserts value is string {
  if (
    typeof value !== "string" ||
    value.length < 12 ||
    value.length > 128 ||
    !value.trim()
  )
    throw new StaffAccountValidationError("invalid_password");
}
/** scrypt ناهمگام با پارامتر ثابت اجرا می‌شود تا رمز خام ذخیره نشود و حلقهٔ رویداد مسدود نماند. */
async function derive(password: string, salt: Buffer): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    scrypt(
      password,
      salt,
      64,
      { N: 32768, r: 8, p: 1, maxmem: 64 * 1024 * 1024 },
      (error, result) => (error ? reject(error) : resolve(result)),
    );
  });
}
/** رمز ورودی با نمک تصادفی مستقل هش می‌شود؛ خروجیِ نسخه‌دار فقط برای مخزن خصوصی حساب‌هاست. */
export async function hashStaffPassword(password: string): Promise<string> {
  validateStaffPassword(password);
  const salt = randomBytes(32);
  const hash = await derive(password, salt);
  return `scrypt$32768$8$1$${salt.toString("base64url")}$${hash.toString("base64url")}`;
}
/** رمز و هش ذخیره‌شده را با مقایسهٔ ثابت‌زمان بررسی می‌کند؛ قالب ناشناخته بدون تفسیر پارامتر دلخواه رد می‌شود. */
export async function verifyStaffPassword(
  password: string,
  stored: string,
): Promise<boolean> {
  if (
    typeof password !== "string" ||
    password.length > 128 ||
    !hashPattern.test(stored)
  )
    return false;
  const parts = stored.split("$");
  const salt = Buffer.from(parts[4]!, "base64url");
  const expected = Buffer.from(parts[5]!, "base64url");
  const actual = await derive(password, salt);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}
/** اطلاعات معتبر حساب را با شناسهٔ تازه و نسخهٔ امنیتی یک می‌سازد؛ مالک فقط می‌تواند توسعه‌دهنده باشد. */
export async function createStaffAccount(
  input: {
    email: string;
    password: string;
    role: StaffRole;
    isOwner?: boolean;
  },
  now = Date.now(),
): Promise<StaffAccount> {
  const email = normalizeStaffEmail(input.email);
  if (
    (input.role !== "teacher" && input.role !== "developer") ||
    (input.isOwner && input.role !== "developer")
  )
    throw new StaffAccountValidationError("invalid_role");
  return {
    id: randomUUID(),
    email,
    role: input.role,
    isOwner: input.isOwner === true,
    active: true,
    version: 1,
    passwordHash: await hashStaffPassword(input.password),
    createdAt: now,
    updatedAt: now,
  };
}
/** سند خوانده‌شده یا آمادهٔ نوشتن بررسی می‌شود؛ دادهٔ خراب، حساب تکراری یا حذف آخرین مالک قابل پذیرش نیست. */
export function validateStaffAccountDocument(
  value: unknown,
): StaffAccountDocument {
  if (!value || typeof value !== "object")
    throw new StaffAccountValidationError("invalid_document");
  const record = value as Record<string, unknown>;
  if (
    record.schemaVersion !== 1 ||
    !Array.isArray(record.accounts) ||
    record.accounts.length < 1 ||
    record.accounts.length > 20
  )
    throw new StaffAccountValidationError("invalid_document");
  const ids = new Set<string>();
  const emails = new Set<string>();
  const accounts = record.accounts.map((item: unknown): StaffAccount => {
    if (!item || typeof item !== "object")
      throw new StaffAccountValidationError("invalid_account");
    const account = item as Record<string, unknown>;
    if (
      typeof account.id !== "string" ||
      !/^[a-zA-Z0-9_-]{8,64}$/u.test(account.id) ||
      ids.has(account.id) ||
      typeof account.email !== "string" ||
      normalizeStaffEmail(account.email) !== account.email ||
      emails.has(account.email) ||
      (account.role !== "teacher" && account.role !== "developer") ||
      typeof account.isOwner !== "boolean" ||
      (account.isOwner && account.role !== "developer") ||
      typeof account.active !== "boolean" ||
      !Number.isSafeInteger(account.version) ||
      (account.version as number) < 1 ||
      typeof account.passwordHash !== "string" ||
      !hashPattern.test(account.passwordHash) ||
      typeof account.createdAt !== "number" ||
      !Number.isFinite(account.createdAt) ||
      typeof account.updatedAt !== "number" ||
      !Number.isFinite(account.updatedAt)
    )
      throw new StaffAccountValidationError("invalid_account");
    ids.add(account.id);
    emails.add(account.email);
    return {
      id: account.id,
      email: account.email,
      role: account.role,
      isOwner: account.isOwner,
      active: account.active,
      version: account.version as number,
      passwordHash: account.passwordHash,
      createdAt: account.createdAt,
      updatedAt: account.updatedAt,
    };
  });
  if (!accounts.some((account) => account.active && account.isOwner))
    throw new StaffAccountValidationError("owner_required");
  return { schemaVersion: 1, accounts };
}

/** مخزن خصوصی مشترک دو اپ را می‌سازد؛ مسیر اختیاری فقط ورودی پیکربندیِ مورداعتماد برای آزمون مستقل است. */
export function createBlobStaffAccountStore(
  token: string,
  pathname = defaultPathname,
): StaffAccountStore {
  if (!token) throw new StaffAccountValidationError("storage_not_configured");
  if (
    !/^language-staff\/[a-zA-Z0-9_-]+(?:\/[a-zA-Z0-9_-]+)*\.json$/u.test(
      pathname,
    )
  )
    throw new StaffAccountValidationError("invalid_storage_path");
  return {
    /** خواندن بدون کش لازم است تا تغییر رمز و لغو حساب در بررسی بعدیِ مجوز سمت سرورِ هر دو اپ اعمال شود. */
    async read() {
      const result = await get(pathname, {
        access: "private",
        token,
        useCache: false,
      });
      if (!result) return null;
      if (result.statusCode !== 200 || !result.stream)
        throw new Error("staff_storage_unavailable");
      const reader = result.stream.getReader();
      const chunks: Uint8Array[] = [];
      let size = 0;
      try {
        for (;;) {
          const chunk = await reader.read();
          if (chunk.done) break;
          size += chunk.value.byteLength;
          if (size > 65536) {
            await reader.cancel();
            throw new Error("staff_document_too_large");
          }
          chunks.push(chunk.value);
        }
      } finally {
        reader.releaseLock();
      }
      // پاسخ فشرده ممکن است W/ داشته باشد؛ متادیتا باید دقیقاً به همان محتوای خوانده‌شده اشاره کند.
      const transferEtag = result.blob.etag;
      const authoritative = transferEtag.startsWith("W/")
        ? await head(pathname, { token })
        : null;
      const etag = resolveStaffBlobEtag(transferEtag, authoritative?.etag);
      return {
        document: validateStaffAccountDocument(
          JSON.parse(Buffer.concat(chunks).toString("utf8")) as unknown,
        ),
        etag,
      };
    },
    /** نوشتن شرطی CAS مانع ازبین‌رفتن تغییر هم‌زمان یا ساخت دو مالک هنگام اولین راه‌اندازی است. */
    async write(document, expectedEtag) {
      const validated = validateStaffAccountDocument(document);
      try {
        await put(pathname, JSON.stringify(validated), {
          access: "private",
          token,
          addRandomSuffix: false,
          allowOverwrite: expectedEtag !== null,
          ...(expectedEtag === null ? {} : { ifMatch: expectedEtag }),
          contentType: "application/json",
          cacheControlMaxAge: 0,
        });
      } catch (error) {
        if (
          error instanceof BlobPreconditionFailedError ||
          (error instanceof Error && /already exists/iu.test(error.message))
        )
          throw new StaffAccountConflictError("account_conflict");
        throw error;
      }
    },
  };
}
