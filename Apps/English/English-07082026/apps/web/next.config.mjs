import path from "node:path";

// Vercel packages Next.js output itself; standalone remains necessary only for the Windows installer.
const nextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  ...(process.env.VERCEL ? {} : { output: "standalone" }),
  outputFileTracingRoot: path.resolve(process.cwd(), "../.."),
  reactStrictMode: true,
  transpilePackages: ["@grammar/content"],
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/daily", destination: "/replacements/en/daily.html" },
        { source: "/grammar", destination: "/replacements/en/grammar.html" },
      ],
    };
  },
};

export default nextConfig;
