export const API_BASE_URL =
  // Same-origin requests also work from phones and through the local HTTPS gateway.
  (process.env.NEXT_PUBLIC_API_URL ?? "/api/v1").replace(/\/$/, "");

export const API_HEALTH_URL = `${API_BASE_URL}/health`;
