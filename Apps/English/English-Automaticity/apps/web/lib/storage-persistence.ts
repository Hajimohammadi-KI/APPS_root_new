/**
 * Durable local storage for learner progress (roadmap R91).
 *
 * - Unreadable saved state is moved to a quarantine key instead of being
 *   silently replaced, so later saves succeed and the copy can still be
 *   exported.
 * - State written by a newer app version is snapshotted before the current
 *   version normalizes it, so a downgrade never destroys data.
 * - The browser is asked to mark storage as persistent, which stops eviction
 *   under storage pressure, and the answer can be shown in Settings.
 * - A backup reminder is derived from the last recorded export.
 *
 * Recovery keys live under `automaticity:v2:<language>:recovery:`. The
 * complete backup in learning-core exports every key with that language
 * prefix, while the legacy snapshot and event readers skip it.
 */
export interface KeyValueStorage {
	readonly length: number;
	key(index: number): string | null;
	getItem(key: string): string | null;
	setItem(key: string, value: string): void;
	removeItem(key: string): void;
}

export type StoredStateRead =
	| { kind: "missing" }
	| { kind: "ok"; value: unknown; version: number | null; newerSnapshotKey: string | null }
	| { kind: "corrupt"; quarantineKey: string };

export const BACKUP_REMINDER_DAYS = 30;

/** Namespace for the recovery keys that belong to one stored state key. */
/** زبان و کلید وضعیت را به پیشوند بازیابی اختصاصی همان داده تبدیل می‌کند؛ جداسازی en/de مانع آمیختن نسخه‌های پشتیبان دو اپ می‌شود. */
export function recoveryNamespace(language: "en" | "de", key: string) {
	return `automaticity:v2:${language}:recovery:${key}`;
}

/** از پیشوند بازیابی، کلید نگهداری JSON خراب را می‌سازد؛ readStoredState و recoveryEntries از همین نام مشترک استفاده می‌کنند. */
export function quarantineKey(namespace: string) {
	return `${namespace}:quarantine`;
}

/** پیشوند و شمارهٔ نسخهٔ خوانده‌شده را به کلید snapshot تبدیل می‌کند تا اجرای نسخهٔ قدیمی‌تر، نسخهٔ جدید داده را از بین نبرد. */
export function newerVersionKey(namespace: string, version: number) {
	return `${namespace}:newer-v${version}`;
}

/** کلید تاریخ آخرین خروجی پشتیبان را برای recordBackup و backupReminder یکسان می‌سازد؛ خود دادهٔ پشتیبان در این کلید ذخیره نمی‌شود. */
export function lastBackupKey(namespace: string) {
	return `${namespace}:last-backup`;
}

/** از ورودی ناشناخته فقط فیلد version عددیِ یک شیء را می‌خواند؛ در نبود آن null می‌دهد و شیء را تغییر نمی‌دهد. */
function storedVersion(value: unknown) {
	return value && typeof value === "object" && typeof (value as { version?: unknown }).version === "number"
		? (value as { version: number }).version
		: null;
}

/**
 * storage، کلید اصلی، نسخهٔ قابل‌فهم اپ و پیشوند بازیابی را می‌گیرد و وضعیت missing/ok/corrupt برمی‌گرداند.
 * JSON خراب پیش از کنارگذاشتن در quarantine کپی می‌شود؛ دادهٔ نسخهٔ جدیدتر نیز پیش از نرمال‌سازی snapshot می‌گیرد.
 * شکست نوشتن کپی بازیابی، نتیجهٔ تشخیص را پنهان نمی‌کند؛ AppStoreProvider براساس kind پیام مناسب نشان می‌دهد.
 */
export function readStoredState(
	storage: KeyValueStorage,
	key: string,
	currentVersion: number,
	namespace: string,
): StoredStateRead {
	const raw = storage.getItem(key);
	// نبود رکورد با خراب‌بودن JSON فرق دارد؛ مهاجرت دادهٔ قدیمی فقط به تصمیم فراخواننده انجام می‌شود.
	if (raw === null) return { kind: "missing" };
	let value: unknown;
	try {
		value = JSON.parse(raw);
	} catch {
		const target = quarantineKey(namespace);
		try {
			storage.setItem(target, raw);
			storage.removeItem(key);
		} catch {
			// Keeping the unreadable copy is best effort; the read result still
			// tells the caller that defaults are in use.
		}
		return { kind: "corrupt", quarantineKey: target };
	}
	const version = storedVersion(value);
	let newerSnapshotKey: string | null = null;
	// نسخهٔ آینده را فقط یک‌بار کپی می‌کنیم؛ اجرای چندبارهٔ نسخهٔ قدیمی نباید snapshot اصلی را بازنویسی کند.
	if (version !== null && version > currentVersion) {
		newerSnapshotKey = newerVersionKey(namespace, version);
		try {
			if (storage.getItem(newerSnapshotKey) === null) storage.setItem(newerSnapshotKey, raw);
		} catch {
			newerSnapshotKey = null;
		}
	}
	return { kind: "ok", value, version, newerSnapshotKey };
}

/** مقدار را به JSON تبدیل و در کلید مشخص می‌نویسد؛ true یعنی setItem موفق بود و false خطای ظرفیت/دسترسی را برای هشدارِ رابط گزارش می‌کند. */
export function writeStoredState(storage: KeyValueStorage, key: string, value: unknown) {
	try {
		storage.setItem(key, JSON.stringify(value));
		return true;
	} catch {
		return false;
	}
}

/** فقط زوج‌های کلید/متنِ quarantine و snapshotهای نسخهٔ جدیدتر این پیشوند را برای خروجی پشتیبان جمع می‌کند؛ کلیدهای نامرتبط را صادر نمی‌کند. */
export function recoveryEntries(storage: KeyValueStorage, namespace: string) {
	const entries: Array<[string, string]> = [];
	for (let index = 0; index < storage.length; index += 1) {
		const name = storage.key(index);
		if (!name || !(name === quarantineKey(namespace) || name.startsWith(`${namespace}:newer-v`))) continue;
		const raw = storage.getItem(name);
		if (raw !== null) entries.push([name, raw]);
	}
	return entries;
}

/** زمان خروجی پشتیبان موفق را در کلید یادآوری می‌نویسد؛ شکست آن عمداً دادهٔ یادگیرنده یا فایل خروجی را تغییر نمی‌دهد و فقط زمان یادآوری نامعلوم می‌ماند. */
export function recordBackup(storage: KeyValueStorage, namespace: string, at: string) {
	try {
		storage.setItem(lastBackupKey(namespace), at);
	} catch {
		// A missing reminder timestamp only affects the hint shown in Settings.
	}
}

/** نسبت به now، تاریخ معتبر آخرین پشتیبان و overdue پس از ۳۰ روز را می‌دهد؛ تاریخ مفقود/نامعتبر overdue است تا تنظیمات یادآوری را پنهان نکند. */
export function backupReminder(storage: KeyValueStorage, namespace: string, now: Date) {
	const raw = storage.getItem(lastBackupKey(namespace));
	const lastBackupAt = raw && !Number.isNaN(Date.parse(raw)) ? raw : null;
	const ageDays = lastBackupAt ? (now.getTime() - Date.parse(lastBackupAt)) / 86_400_000 : Number.POSITIVE_INFINITY;
	return { lastBackupAt, overdue: ageDays >= BACKUP_REMINDER_DAYS };
}

export interface PersistenceStatus {
	supported: boolean;
	persisted: boolean;
}

type StorageNavigator = { storage?: { persist?: () => Promise<boolean>; persisted?: () => Promise<boolean> } };

/** بدون درخواست مجوز تازه، پایداری فعلی ذخیرهٔ مرورگر را می‌خواند؛ ناوبری تزریقی آزمون آفلاین را ممکن می‌کند و نبود API/خطا به وضعیت غیرپایدار تبدیل می‌شود. */
export async function persistentStorageStatus(nav: StorageNavigator | undefined = globalThis.navigator): Promise<PersistenceStatus> {
	const persisted = nav?.storage?.persisted;
	if (!persisted) return { supported: false, persisted: false };
	try {
		return { supported: true, persisted: await persisted.call(nav.storage) };
	} catch {
		return { supported: true, persisted: false };
	}
}

/** پس از تعامل کاربر توسط AppStoreProvider فراخوانی می‌شود و درخواست persist را به مرورگر می‌دهد؛ نتیجه تضمین پشتیبان نیست و رد/خطا به persisted:false تبدیل می‌شود. */
export async function requestPersistentStorage(nav: StorageNavigator | undefined = globalThis.navigator): Promise<PersistenceStatus> {
	const persist = nav?.storage?.persist;
	if (!persist) return { supported: false, persisted: false };
	try {
		return { supported: true, persisted: await persist.call(nav.storage) };
	} catch {
		return { supported: true, persisted: false };
	}
}
