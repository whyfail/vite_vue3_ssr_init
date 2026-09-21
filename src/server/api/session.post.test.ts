import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createError, readBody, setCookie } from "h3";
import sessionHandler from "./session.post";

vi.mock("h3", () => ({
  createError: vi.fn((input: { statusCode: number; statusMessage: string }) =>
    Object.assign(new Error(input.statusMessage), input),
  ),
  defineEventHandler: vi.fn((handler: unknown) => handler),
  readBody: vi.fn(),
  setCookie: vi.fn(),
}));

const BACKEND = "http://localhost:8080/api/v1";
const BACKEND_TOKEN = "unit-test-opaque-token-abcdefghijklmnopqrstuvwxyz0123456789abcdef";

describe("session API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it("rejects missing credentials", async () => {
    vi.mocked(readBody).mockResolvedValue({});

    await expect(sessionHandler({} as never)).rejects.toMatchObject({ statusCode: 400 });
    expect(createError).toHaveBeenCalledOnce();
  });

  it("calls the real backend and sets an HttpOnly cookie capped at expiresAt", async () => {
    vi.stubEnv("NUXT_BACKEND_API_BASE_URL", BACKEND);
    vi.stubEnv("NUXT_ENABLE_AUTH_MOCK", "false");
    vi.mocked(readBody).mockResolvedValue({
      username: "admin",
      password: "ChangeMe123!",
      remember: true,
    });

    const rawMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      _data: {
        token: BACKEND_TOKEN,
        tokenType: "Bearer",
        expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
        user: { username: "admin" },
      },
    });
    vi.stubGlobal("$fetch", { raw: rawMock });

    await expect(sessionHandler({} as never)).resolves.toEqual({ authenticated: true });

    expect(rawMock).toHaveBeenCalledWith(
      `${BACKEND}/login`,
      expect.objectContaining({ method: "POST", ignoreResponseError: true }),
    );
    expect(setCookie).toHaveBeenCalledWith(
      expect.anything(),
      "auth_token",
      BACKEND_TOKEN,
      expect.objectContaining({ httpOnly: true, sameSite: "lax" }),
    );
    const options = vi.mocked(setCookie).mock.calls[0]?.[3] as { maxAge: number };

    expect(options.maxAge).toBeGreaterThan(0);
    expect(options.maxAge).toBeLessThanOrEqual(3600);
  });

  it("propagates problem details from the backend on invalid credentials", async () => {
    vi.stubEnv("NUXT_BACKEND_API_BASE_URL", BACKEND);
    vi.stubEnv("NUXT_ENABLE_AUTH_MOCK", "false");
    vi.mocked(readBody).mockResolvedValue({ username: "admin", password: "wrong-password" });

    vi.stubGlobal("$fetch", {
      raw: vi.fn().mockResolvedValue({
        ok: false,
        status: 401,
        _data: {
          code: "AUTH_INVALID_CREDENTIALS",
          msg: "用户名或密码错误",
          requestId: "req-fixed",
        },
      }),
    });

    await expect(sessionHandler({} as never)).rejects.toMatchObject({ statusCode: 401 });
    expect(createError).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: 401,
        data: expect.objectContaining({
          code: "AUTH_INVALID_CREDENTIALS",
          msg: "用户名或密码错误",
          requestId: "req-fixed",
        }),
      }),
    );
  });

  it("issues a mock session only when the mock switch is explicitly enabled", async () => {
    vi.stubEnv("NUXT_ENABLE_AUTH_MOCK", "true");
    vi.mocked(readBody).mockResolvedValue({ username: "admin", password: "admin" });

    const rawMock = vi.fn();
    vi.stubGlobal("$fetch", { raw: rawMock });

    await expect(sessionHandler({} as never)).resolves.toEqual({ authenticated: true });

    expect(rawMock).not.toHaveBeenCalled();
    expect(setCookie).toHaveBeenCalledWith(
      expect.anything(),
      "auth_token",
      expect.stringContaining("mock-opaque-token"),
      expect.objectContaining({ httpOnly: true }),
    );
  });
});
