import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { setCookie } from "h3";
import { backendFetch } from "@/server/backend";
import sessionHandler from "./session.delete";

vi.mock("h3", () => ({
  defineEventHandler: vi.fn((handler: unknown) => handler),
  setCookie: vi.fn(),
}));

vi.mock("@/server/backend", () => ({
  backendFetch: vi.fn().mockResolvedValue({ ok: true, status: 204 }),
}));

describe("session DELETE API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("revokes the backend session and clears the local cookie", async () => {
    vi.stubEnv("NUXT_ENABLE_AUTH_MOCK", "false");

    await expect(sessionHandler({} as never)).resolves.toBeNull();

    expect(backendFetch).toHaveBeenCalledWith(expect.anything(), "/logout", { method: "POST" });
    expect(setCookie).toHaveBeenCalledWith(
      expect.anything(),
      "auth_token",
      "",
      expect.objectContaining({ httpOnly: true, maxAge: 0 }),
    );
  });

  it("still clears the local cookie when the backend revoke fails", async () => {
    vi.stubEnv("NUXT_ENABLE_AUTH_MOCK", "false");
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    vi.mocked(backendFetch).mockRejectedValueOnce(new Error("backend down"));

    await expect(sessionHandler({} as never)).resolves.toBeNull();

    expect(setCookie).toHaveBeenCalledWith(
      expect.anything(),
      "auth_token",
      "",
      expect.objectContaining({ maxAge: 0 }),
    );
    expect(errorSpy).toHaveBeenCalled();

    errorSpy.mockRestore();
  });

  it("skips the backend revoke while auth mock is enabled", async () => {
    vi.stubEnv("NUXT_ENABLE_AUTH_MOCK", "true");

    await expect(sessionHandler({} as never)).resolves.toBeNull();

    expect(backendFetch).not.toHaveBeenCalled();
    expect(setCookie).toHaveBeenCalled();
  });
});
