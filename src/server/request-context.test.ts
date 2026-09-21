import { describe, expect, it, vi } from "vitest";
import { getCookie } from "h3";
import { getRequestContext } from "./request-context";

vi.mock("h3", () => ({
  getCookie: vi.fn(),
}));

describe("request context", () => {
  it("reads the authentication cookie from the request", () => {
    vi.mocked(getCookie).mockReturnValue("unit-test-opaque-token");
    const event = {} as never;

    expect(getRequestContext(event)).toEqual({
      event,
      runtime: "node",
      token: "unit-test-opaque-token",
    });
  });
});
