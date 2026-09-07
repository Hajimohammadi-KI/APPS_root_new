// The shared verifier also checks every German topic and device-ink persistence.
process.env.WORKSHEET_LANGUAGE = "de";
await import("../../../shared/grammar-worksheets/verify-browser.mjs");
