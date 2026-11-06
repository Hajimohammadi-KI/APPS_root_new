import { describe, expect, test } from "bun:test";
import { NextRequest } from "next/server";

import { config, proxy } from "./proxy";

const request = (path: string) =>
  new NextRequest(new URL(path, "https://english.example"));

describe("legacy screen link proxy", () => {
  test("also guards direct professional pages while retaining root legacy redirects", async () => {
    expect(Array.isArray(config.matcher)).toBe(true);
    expect((await proxy(request("/teacher"))).status).toBe(307);
    expect((await proxy(request("/roadmap.html"))).status).toBe(307);
    expect(
      (await proxy(request("/grammar?screen=errors"))).headers.get("location"),
    ).toBeNull();
  });

  test("redirects old ?screen= links to the screen's own path", async () => {
    const response = await proxy(request("/?screen=errors"));
    expect(response.status).toBe(308);
    expect(response.headers.get("location")).toBe(
      "https://english.example/errors",
    );
  });

  test("keeps the other parameters and the old daily alias", async () => {
    const response = await proxy(request("/?screen=automaticity&activity=5"));
    expect(response.headers.get("location")).toBe(
      "https://english.example/daily?activity=5",
    );
  });

  test("drops an unknown screen name without looping", async () => {
    const response = await proxy(request("/?screen=nowhere&lang=fa"));
    expect(response.status).toBe(308);
    expect(response.headers.get("location")).toBe(
      "https://english.example/?lang=fa",
    );
    expect(
      (await proxy(request("/?lang=fa"))).headers.get("location"),
    ).toBeNull();
  });

  test("ordinary home visits pass through", async () => {
    expect((await proxy(request("/"))).headers.get("location")).toBeNull();
  });
});
