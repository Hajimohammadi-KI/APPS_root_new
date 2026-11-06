export interface AudioRecord {
  id: string;
  blob: Blob;
  createdAt: string;
  grammarTitle: string;
  topic: string;
  transcript: string;
  corrected: string;
  repetitionStatus: "new" | "listened" | "repeated";
}

const DB_NAME = "GrammarAutomaticityV27";
const STORE = "audio";

/**
 * بدون ورودی، پایگاه محلی صوت را باز می‌کند و Promise<IDBDatabase> می‌دهد.
 * ارتقای نسخه فقط مخزن audio را با کلید id ایجاد می‌کند؛ موفقیت اتصال را تحویل می‌دهد و خطای IndexedDB را رد می‌کند.
 * runAudio مالک بستن این اتصال است؛ این تابع فایل یا متن یادگیرنده را به شبکه نمی‌فرستد.
 */
function openDatabase() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    // این callback فقط هنگام ارتقای ساختار اجرا می‌شود؛ مخزن موجود را حذف یا بازنویسی نمی‌کند.
    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains(STORE)) {
        database.createObjectStore(STORE, { keyPath: "id" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/** رکورد کامل صوت را با id در تراکنش نوشتنی ثبت/جایگزین می‌کند؛ Promise<void> پس از پایان تراکنش حل می‌شود و خطا به فراخواننده می‌رسد. */
export async function putAudio(record: AudioRecord) {
  await runAudio("readwrite",store=>store.put(record));
}

/** بدون ورودی، همهٔ AudioRecordهای ذخیره‌شده را برای فهرست ضبط‌ها برمی‌گرداند؛ خواندن از تراکنش readonly است و چیزی را تغییر نمی‌دهد. */
export async function listAudio() {
  return await runAudio("readonly",store=>store.getAll()) as AudioRecord[];
}

/** فقط رکورد دارای id ورودی را از مخزن صوت حذف می‌کند؛ پایان Promise به معنی کامل‌شدن تراکنش محلی است، نه حذف داده از سرویس بیرونی. */
export async function deleteAudio(id: string) {
  await runAudio("readwrite",store=>store.delete(id));
}

/**
 * mode و callback سازندهٔ درخواست را می‌گیرد و نتیجهٔ نوع T را پس از commit تراکنش برمی‌گرداند.
 * operation مخزن بازشده را دریافت می‌کند؛ putAudio/listAudio/deleteAudio تنها نوع درخواست آن را انتخاب می‌کنند.
 * خطای درخواست یا abort رد می‌شود؛ finally اتصال را در موفقیت و شکست می‌بندد تا اتصال قدیمی باز نماند.
 */
async function runAudio<T>(mode:IDBTransactionMode,operation:(store:IDBObjectStore)=>IDBRequest<T>):Promise<T> {
  const database = await openDatabase();
  try { return await new Promise<T>((resolve, reject) => {
    const transaction=database.transaction(STORE,mode);
    const request=operation(transaction.objectStore(STORE));
    transaction.oncomplete=()=>resolve(request.result);
    transaction.onabort=()=>reject(transaction.error??new Error("Audio transaction aborted"));
    request.onerror = () => reject(request.error);
  }); } finally { database.close(); }
}
