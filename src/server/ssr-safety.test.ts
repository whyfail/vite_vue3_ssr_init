import { renderToString } from "vue/server-renderer";
import { createSSRApp } from "vue";
import { describe, expect, it } from "vitest";
import DocsPage from "@/features/docs/pages/DocsPage.vue";
import LoginPage from "@/features/auth/pages/LoginPage.vue";

describe("SSR safety", () => {
  it("server-renders the docs view without browser globals", async () => {
    await expect(renderToString(createSSRApp(DocsPage))).resolves.toContain("项目开发文档");
  });

  it("server-renders the login view without browser globals", async () => {
    await expect(renderToString(createSSRApp(LoginPage))).resolves.toContain("登录");
  });
});
