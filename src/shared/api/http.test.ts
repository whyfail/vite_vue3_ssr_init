import { describe, expect, it } from "vitest";
import { apiClient, createApiClient } from "./http";

describe("api client", () => {
  it("creates a configured axios client", () => {
    expect(createApiClient("/demo").defaults.baseURL).toBe("/demo");
  });

  it("exports the default api client", () => {
    expect(apiClient.defaults.timeout).toBe(15_000);
  });
});
