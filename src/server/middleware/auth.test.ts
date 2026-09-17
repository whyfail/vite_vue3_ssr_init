import { beforeEach, describe, expect, it, vi } from "vitest";
import { getCookie, getRequestURL, sendRedirect } from "h3";
import authMiddleware from "./auth";

vi.mock("h3", () => ({
  defineEventHandler: vi.fn((handler: unknown) => handler),
  getCookie: vi.fn(),
  getRequestURL: vi.fn(),
  sendRedirect: vi.fn(),
}));

describe("auth middleware", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("redirects anonymous docs requests", () => {
    vi.mocked(getRequestURL).mockReturnValue(new URL("http://localhost/docs"));
    vi.mocked(getCookie).mockReturnValue(undefined);

    authMiddleware({} as never);

    expect(sendRedirect).toHaveBeenCalledWith(expect.anything(), "/login", 302);
  });

  it("allows authenticated docs requests", () => {
    vi.mocked(getRequestURL).mockReturnValue(new URL("http://localhost/docs"));
    vi.mocked(getCookie).mockReturnValue("demo-token");

    authMiddleware({} as never);

    expect(sendRedirect).not.toHaveBeenCalled();
  });
});
