import { describe, expect, it } from "vitest";
import { createApiClient } from "./http";

describe("api client", () => {
  it("creates a configured axios client", () => {
    expect(createApiClient("/demo").defaults.baseURL).toBe("/demo");
  });
});
