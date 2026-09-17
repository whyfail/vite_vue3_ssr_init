import { describe, expect, it, vi } from "vitest";
import { getCookie } from "h3";
import { getRequestContext } from "./request-context";

vi.mock("h3", () => ({
  getCookie: vi.fn(),
}));

describe("request context", () => {
  it("reads the authentication cookie from the request", () => {
    vi.mocked(getCookie).mockReturnValue("demo-token");
    const event = {} as never;

    expect(getRequestContext(event)).toEqual({
      event,
      runtime: "node",
      token: "demo-token",
    });
  });
});
