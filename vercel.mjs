// Vercel runs build commands inside the configured Root Directory. This fallback
// keeps the English project deployable when its dashboard root is accidentally
// set to the repository root, without redirecting any other Vercel project.
const englishProjectId = "prj_aZq86djXxrAiJIBxYgkuuB8QfpFu";

export const config =
  process.env.VERCEL_PROJECT_ID === englishProjectId
    ? {
        framework: "nextjs",
        bunVersion: "1.x",
        installCommand:
          "cd Apps/English/English-07082026 && bun install --frozen-lockfile",
        buildCommand:
          "cd Apps/English/English-07082026 && bun run --cwd apps/web build",
        outputDirectory: "Apps/English/English-07082026/apps/web/.next",
        ignoreCommand: null,
      }
    : {};
