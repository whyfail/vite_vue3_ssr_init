import { beforeEach, describe, expect, it, vi } from "vitest";
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

describe("session API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("rejects missing credentials", async () => {
    vi.mocked(readBody).mockResolvedValue({});

    await expect(sessionHandler({} as never)).rejects.toMatchObject({ statusCode: 400 });
    expect(createError).toHaveBeenCalledOnce();
  });

  it("sets an HttpOnly cookie", async () => {
    vi.mocked(readBody).mockResolvedValue({ username: "admin", password: "admin", remember: true });

    await expect(sessionHandler({} as never)).resolves.toEqual({ authenticated: true });
    expect(setCookie).toHaveBeenCalledWith(
      expect.anything(),
      "auth_token",
      "demo-token",
      expect.objectContaining({ httpOnly: true, maxAge: 60 * 60 * 24 * 30 }),
    );
  });
});
