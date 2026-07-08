import "@testing-library/jest-dom/vitest";
import { toHaveNoViolations } from "jest-axe";
import { afterEach, expect, vi } from "vitest";
import { cleanup } from "@testing-library/vue";

expect.extend(toHaveNoViolations);

vi.stubGlobal(
  "navigateTo",
  vi.fn(async () => undefined),
);
vi.stubGlobal("definePageMeta", vi.fn());
vi.stubGlobal("useHead", vi.fn());
vi.stubGlobal(
  "useRoute",
  vi.fn(() => ({ meta: { title: "SSR 模板工作台" } })),
);
vi.stubGlobal("defineNuxtPlugin", (plugin: unknown) => plugin);

afterEach(() => {
  cleanup();
  localStorage.clear();
  sessionStorage.clear();
  vi.clearAllMocks();
});
