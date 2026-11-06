// Edge cold-run using a public WAV. No learner recording or cloud speech API.
import assert from "node:assert/strict";
import { createServer } from "node:http";
import { readFileSync, statSync } from "node:fs";
import { extname, resolve, sep } from "node:path";
import { createRequire } from "node:module";

const root = resolve(import.meta.dirname, "..");
const publicRoot = resolve(
  root,
  "Apps/English/English-Automaticity/apps/web/public",
);
const require = createRequire(
  resolve(root, "Apps/English/English-Automaticity/package.json"),
);
const { chromium } = require("@playwright/test");
const wavPath =
  process.argv.slice(2).find((argument) => !argument.startsWith("--")) ??
  "C:/Users/Elahe/AppData/Local/Temp/language-w26-experiment/speechocean762/WAVE/SPEAKER0001/000010011.WAV";
// Optional public fixture: speechocean762 / OpenSLR 101, speaker 1186,
// "THANKFUL FOR SO MANY OF YOU"; CC BY 4.0, Zhang et al. (2021).
// https://www.openslr.org/101/
const expectedText =
  process.argv.find((argument) => argument.startsWith("--expect="))?.slice(9) ??
  "bill";
const redirectModel = process.argv.includes("--redirect");
const corruptCache = process.argv.includes("--corrupt-cache");

function readWav(path) {
  const bytes = readFileSync(path);
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  assert.equal(bytes.toString("ascii", 0, 4), "RIFF");
  assert.equal(bytes.toString("ascii", 8, 12), "WAVE");
  let format = -1;
  let data = -1;
  for (let at = 12; at + 8 <= bytes.length;) {
    const name = bytes.toString("ascii", at, at + 4);
    const size = view.getUint32(at + 4, true);
    if (name === "fmt ") format = at + 8;
    if (name === "data") data = at + 8;
    at += 8 + size + (size % 2);
  }
  assert.ok(format >= 0 && data >= 0);
  assert.equal(view.getUint16(format, true), 1);
  assert.equal(view.getUint16(format + 2, true), 1);
  assert.equal(view.getUint16(format + 14, true), 16);
  const sampleRate = view.getUint32(format + 4, true);
  const sampleCount = (bytes.length - data) / 2;
  const samples = new Float32Array(
    Math.round((sampleCount * 16000) / sampleRate),
  );
  for (let index = 0; index < samples.length; index++) {
    const at = (index * sampleRate) / 16000;
    const before = Math.floor(at);
    const after = Math.min(sampleCount - 1, before + 1);
    const fraction = at - before;
    samples[index] =
      ((1 - fraction) * view.getInt16(data + before * 2, true) +
        fraction * view.getInt16(data + after * 2, true)) /
      32768;
  }
  return samples;
}

const server = createServer((request, response) => {
  response.setHeader(
    "content-security-policy",
    "default-src 'self'; script-src 'self' blob: 'wasm-unsafe-eval'; worker-src 'self' blob:; connect-src 'self'",
  );
  const pathname = decodeURIComponent(
    new URL(request.url, "http://localhost").pathname,
  );
  if (redirectModel && pathname.endsWith("/config.json")) {
    response.writeHead(302, {
      location: "https://example.org/redirected-model",
    });
    response.end();
    return;
  }
  if (pathname === "/") {
    response.writeHead(200, { "content-type": "text/html" });
    response.end(
      "<!doctype html><title>Local transcription worker test</title>",
    );
    return;
  }
  const path = resolve(publicRoot, "." + pathname.replaceAll("/", sep));
  if (!path.startsWith(publicRoot + sep)) {
    response.writeHead(403).end();
    return;
  }
  try {
    const type = {
      ".js": "text/javascript",
      ".mjs": "text/javascript",
      ".json": "application/json",
      ".onnx": "application/octet-stream",
      ".wasm": "application/wasm",
    }[extname(path)];
    response.writeHead(200, {
      "content-type": type ?? "application/octet-stream",
      "content-length": statSync(path).size,
    });
    response.end(readFileSync(path));
  } catch {
    response.writeHead(404).end();
  }
});
await new Promise((done) => server.listen(0, "127.0.0.1", done));
const address = server.address();
assert.ok(address && typeof address !== "string");
const origin = `http://127.0.0.1:${address.port}`;
const requests = [];
const browser = await chromium.launch({ channel: "msedge", headless: true });
try {
  const context = await browser.newContext();
  context.on("request", (request) => requests.push(request.url()));
  await context.route("**/*", (route) => {
    const url = new URL(route.request().url());
    if (url.origin !== origin) return route.abort();
    return route.continue();
  });
  const page = await context.newPage();
  await page.goto(origin);
  if (corruptCache) {
    await page.evaluate(async () => {
      for (const name of [
        "transformers-cache",
        "english-local-transcription-pinned-v2",
      ]) {
        const cache = await caches.open(name);
        await cache.put(
          "/local-transcription/models/onnx-community/whisper-base.en/config.json",
          new Response('{"bad":true}', { status: 200 }),
        );
        await cache.put(
          "/local-transcription/wasm/ort-wasm-simd-threaded.asyncify.wasm",
          new Response(new Uint8Array(64), { status: 200 }),
        );
        await cache.put(
          "/local-transcription/wasm/ort-wasm-simd-threaded.asyncify.mjs",
          new Response("export default () => { throw Error('poisoned'); }", {
            status: 200,
          }),
        );
      }
    });
  }
  const shortSamples = readWav(wavPath);
  const samples = process.argv.includes("--long")
    ? new Float32Array(35 * 16000)
    : shortSamples;
  if (samples !== shortSamples) samples.set(shortSamples);
  const started = Date.now();
  const transcribe = () =>
    page.evaluate(
      ({ samples }) =>
        new Promise((done) => {
          const worker = new Worker("/local-transcription/worker.js", {
            type: "module",
          });
          const timeout = setTimeout(() => {
            worker.terminate();
            done({ type: "timeout" });
          }, 180000);
          worker.onerror = (event) => {
            clearTimeout(timeout);
            worker.terminate();
            done({ type: "worker-error", message: event.message });
          };
          worker.onmessage = (event) => {
            if (event.data.type === "result" || event.data.type === "error") {
              clearTimeout(timeout);
              worker.terminate();
              done(event.data);
            }
          };
          const audio = Float32Array.from(samples);
          worker.postMessage(
            {
              type: "transcribe",
              requestId: "public-wav",
              sampleRate: 16000,
              samples: audio,
            },
            [audio.buffer],
          );
        }),
      { samples: Array.from(samples) },
    );
  const outcome = await transcribe();
  if (redirectModel) {
    assert.equal(outcome.type, "error", JSON.stringify(outcome));
  } else {
    assert.equal(outcome.type, "result", JSON.stringify(outcome));
    assert.equal(outcome.result.source, "local_whisper");
    assert.equal(outcome.result.verified, false);
    assert.match(outcome.result.text, new RegExp(expectedText, "i"));
  }
  if (process.argv.includes("--reuse-offline")) {
    assert.equal(outcome.type, "result", JSON.stringify(outcome));
    const before = requests.length;
    await context.route("**/local-transcription/**", (route) => {
      if (new URL(route.request().url()).pathname.endsWith("/worker.js"))
        return route.continue();
      return route.abort();
    });
    const cachedOutcome = await transcribe();
    assert.equal(cachedOutcome.type, "result", JSON.stringify(cachedOutcome));
    assert.match(cachedOutcome.result.text, new RegExp(expectedText, "i"));
    assert.ok(
      requests.slice(before).every((url) => url.endsWith("/worker.js")),
      "All model and runtime files must come from verified CacheStorage entries",
    );
  }
  assert.ok(requests.length > 0);
  assert.ok(requests.every((url) => url.startsWith(origin)));
  assert.equal(
    requests.filter((url) =>
      url.endsWith("/wasm/ort-wasm-simd-threaded.asyncify.mjs"),
    ).length,
    1,
    "The runtime must import the verified MJS bytes without a second URL fetch",
  );
  console.log(
    JSON.stringify({
      outcome,
      audioSeconds: samples.length / 16000,
      milliseconds: Date.now() - started,
      requests: requests.map((url) => new URL(url).pathname),
    }),
  );
} finally {
  await browser.close();
  server.close();
}
