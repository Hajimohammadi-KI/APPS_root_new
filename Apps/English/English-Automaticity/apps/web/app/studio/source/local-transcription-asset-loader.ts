import {
  LOCAL_TRANSCRIPTION_ASSETS,
  LOCAL_TRANSCRIPTION_ASSET_CACHE,
  type LocalTranscriptionAsset,
} from "./local-transcription-assets";

const ASSET_PREFIX = "/local-transcription/";
const allowed = new Map<string, LocalTranscriptionAsset>(
  LOCAL_TRANSCRIPTION_ASSETS.map((asset) => [asset.path, asset]),
);

/** Resolve only explicitly pinned files; a matching directory prefix is insufficient. */
export function localTranscriptionAssetFor(
  input: string | URL,
  origin: string,
): { url: URL; asset: LocalTranscriptionAsset } {
  const url = new URL(String(input), origin);
  const asset = url.pathname.startsWith(ASSET_PREFIX)
    ? allowed.get(url.pathname.slice(ASSET_PREFIX.length))
    : undefined;
  if (
    url.origin !== origin ||
    url.username ||
    url.password ||
    url.search ||
    url.hash ||
    !asset
  )
    throw new Error("Local transcription blocked an unpinned asset request.");
  return { url, asset };
}

async function verifiedBytes(
  response: Response,
  asset: LocalTranscriptionAsset,
): Promise<Uint8Array<ArrayBuffer>> {
  if (response.status !== 200 || !response.body)
    throw new Error(`Local transcription asset unavailable: ${asset.path}`);
  const bytes = new Uint8Array(asset.bytes);
  const reader = response.body.getReader();
  let loaded = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (loaded + value.byteLength > bytes.byteLength)
        throw new Error(`Local transcription asset too large: ${asset.path}`);
      bytes.set(value, loaded);
      loaded += value.byteLength;
    }
  } catch (error) {
    await reader.cancel().catch(() => {});
    throw error;
  } finally {
    reader.releaseLock();
  }
  if (loaded !== asset.bytes)
    throw new Error(`Local transcription asset size mismatch: ${asset.path}`);
  const digest = new Uint8Array(await crypto.subtle.digest("SHA-256", bytes));
  const sha256 = Array.from(digest, (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
  if (sha256 !== asset.sha256)
    throw new Error(
      `Local transcription asset checksum mismatch: ${asset.path}`,
    );
  return bytes;
}

export class VerifiedLocalTranscriptionAssets {
  private readonly pending = new Map<
    string,
    Promise<Uint8Array<ArrayBuffer>>
  >();

  constructor(
    private readonly origin: string,
    private readonly fetchAsset: typeof fetch = fetch,
    private readonly storage: CacheStorage | undefined = typeof caches ===
    "undefined"
      ? undefined
      : caches,
  ) {}

  get(input: string | URL): Promise<Uint8Array<ArrayBuffer>> {
    const { url, asset } = localTranscriptionAssetFor(input, this.origin);
    const key = url.href;
    const current = this.pending.get(key);
    if (current) return current;
    const loading = this.load(url, asset).catch((error: unknown) => {
      this.pending.delete(key);
      throw error;
    });
    this.pending.set(key, loading);
    return loading;
  }

  private async load(
    url: URL,
    asset: LocalTranscriptionAsset,
  ): Promise<Uint8Array<ArrayBuffer>> {
    let cache: Cache | undefined;
    try {
      cache = await this.storage?.open(LOCAL_TRANSCRIPTION_ASSET_CACHE);
      const cached = await cache?.match(url.href);
      if (cached) {
        try {
          return await verifiedBytes(cached, asset);
        } catch {
          await cache?.delete(url.href);
        }
      }
    } catch {
      cache = undefined;
    }
    const response = await this.fetchAsset(url.href, {
      credentials: "omit",
      redirect: "error",
      mode: "same-origin",
    });
    if (response.redirected || response.url !== url.href)
      throw new Error(`Local transcription asset redirected: ${asset.path}`);
    const bytes = await verifiedBytes(response, asset);
    try {
      await cache?.put(url.href, new Response(bytes.slice(), { status: 200 }));
    } catch {
      // Storage quota and private browsing restrictions must not block inference.
    }
    return bytes;
  }
}
