const AUTH_ID_HEADER = "oai-authenticated-user-id";
const AUTH_EMAIL_HEADER = "oai-authenticated-user-email";
const LOCAL_USER_KEY = "local-user";

function cleanHeader(value: string | null) {
  const cleaned = value?.trim();
  return cleaned || null;
}

function isLoopbackHostname(hostname: string) {
  const normalized = hostname.toLowerCase().replace(/\.$/, "");
  if (normalized === "localhost" || normalized === "[::1]") return true;

  const octets = normalized.split(".");
  return octets.length === 4
    && octets[0] === "127"
    && octets.every((octet) => /^\d{1,3}$/.test(octet) && Number(octet) <= 255);
}

/**
 * Local mode is intentionally an explicit two-part opt-in: the process must
 * have LOCAL_MODE=1 and the request URL must use a loopback host. Merely
 * sending a custom Host header to a deployed app cannot create a local user.
 */
export function isLocalModeRequest(request: Request) {
  return process.env.LOCAL_MODE === "1"
    && isLoopbackHostname(new URL(request.url).hostname);
}

/**
 * Whether this deployment trusts oai-authenticated-user-* headers for
 * non-local requests. These headers carry no signature -- they're only safe
 * to trust when a platform gateway in front of this app (the ChatGPT Apps
 * SDK / Sites host) verifies the caller's session and sets them itself,
 * stripping any caller-supplied copy first. The shipped local install
 * (scripts/generate-local-env.mjs) never needs this flag: it sets
 * LOCAL_MODE=1, which is checked first below and never consults these
 * headers at all. Default is "don't trust", so a Worker or Vercel
 * deployment reachable directly -- with no such gateway in front of it --
 * fails safe with 401s instead of letting any caller impersonate an
 * arbitrary user by setting these headers themselves.
 */
function trustsAuthHeaders(): boolean {
  return process.env.TRUST_OAI_AUTH_HEADERS === "1";
}

export function requestOwner(request: Request): string | null {
  if (isLocalModeRequest(request)) return LOCAL_USER_KEY;
  if (!trustsAuthHeaders()) return null;

  // Keep the hosted Sites authentication contract and precedence unchanged.
  return cleanHeader(request.headers.get(AUTH_ID_HEADER))
    || cleanHeader(request.headers.get(AUTH_EMAIL_HEADER));
}

/**
 * Central storage key for tracker data. Email-only hosted users retain the
 * same SHA-256 key format used by the original APIs; local data always uses a
 * stable, human-readable key and never depends on a fake auth header.
 */
export async function requestUserKey(request: Request): Promise<string | null> {
  if (isLocalModeRequest(request)) return LOCAL_USER_KEY;
  if (!trustsAuthHeaders()) return null;

  const email = cleanHeader(request.headers.get(AUTH_EMAIL_HEADER))?.toLowerCase();
  const identity = email || cleanHeader(request.headers.get(AUTH_ID_HEADER));
  if (!identity) return null;

  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(identity),
  );
  const hash = Array.from(new Uint8Array(digest), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
  return `user_${hash}`;
}

export function isSameOriginMutation(request: Request): boolean {
  const origin = request.headers.get("origin");
  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite && !["same-origin", "same-site", "none"].includes(fetchSite)) return false;
  if (!origin) {
    return fetchSite === "same-origin"
      || fetchSite === "same-site"
      || (isLocalModeRequest(request) && !fetchSite);
  }
  return origin === new URL(request.url).origin;
}
