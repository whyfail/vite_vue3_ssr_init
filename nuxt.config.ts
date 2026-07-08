const enableCodeInspector =
  process.env.NUXT_ENABLE_CODE_INSPECTOR === "true" && process.env.NODE_ENV !== "production";
const codeInspectorAction = process.env.NUXT_CODE_INSPECTOR_ACTION || "open";
const shouldCopyCodeInspectorInfo = ["copy", "both"].includes(codeInspectorAction);
const shouldLocateCodeInspectorInfo = codeInspectorAction !== "copy";

export default defineNuxtConfig({
  srcDir: "src/",
  compatibilityDate: "2026-07-08",
  devtools: { enabled: true },
  modules: ["@pinia/nuxt"],
  css: ["@/assets/css/tailwind.css", "@/assets/css/main.scss"],
  runtimeConfig: {
    apiBaseUrl: process.env.NUXT_API_BASE_URL || "",
    public: {
      appName: process.env.NUXT_PUBLIC_APP_NAME || "CWA Vue SSR",
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || "/api",
    },
  },
  typescript: {
    strict: true,
    typeCheck: true,
  },
  nitro: {
    preset: "node-server",
  },
  vite: {
    plugins: [
      (await import("@tailwindcss/vite")).default(),
      enableCodeInspector &&
        (await import("code-inspector-plugin")).codeInspectorPlugin({
          bundler: "vite",
          dev: true,
          behavior: {
            copy: shouldCopyCodeInspectorInfo,
            defaultAction: codeInspectorAction === "copy" ? "copy" : "locate",
            locate: shouldLocateCodeInspectorInfo,
          },
        }),
    ].filter(Boolean),
  },
});
