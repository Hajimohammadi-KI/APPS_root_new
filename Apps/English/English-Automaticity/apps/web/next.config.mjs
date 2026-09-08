import path from "node:path";

// Vercel validates output at the English project root; standalone remains necessary only for the Windows installer.
const nextConfig = {
  allowedDevOrigins: ["127.0.0.1", "192.168.178.24"],
  ...(process.env.VERCEL
    ? { distDir: "../../.next" }
    : { output: "standalone" }),
  outputFileTracingRoot: path.resolve(process.cwd(), "../.."),
  reactStrictMode: true,
  transpilePackages: ["@grammar/content"],
  async rewrites() {
    return {
      beforeFiles: [
        // Preserve explicit app-screen routes while making daily practice the entry page.
        {
          source: "/",
          missing: [{ type: "query", key: "screen" }],
          destination: "/replacements/en/daily.html",
        },
        { source: "/practice", destination: "/learning-core/practice-en.html" },
        { source: "/daily", destination: "/replacements/en/daily.html" },
        { source: "/grammar", destination: "/replacements/en/grammar.html" },
      ],
      // Preserve the existing web API handlers and proxy only the Nest API endpoints.
      afterFiles: ["health", "assessment"].map((endpoint) => ({
        source: `/api/${endpoint}`,
        destination: `${process.env.API_INTERNAL_ORIGIN ?? "http://127.0.0.1:4201"}/api/${endpoint}`,
      })),
    };
  },
};

export default nextConfig;
