export default defineNuxtConfig({
  srcDir: "src/",
  compatibilityDate: "2026-07-08",
  devtools: { enabled: true },
  modules: ["@pinia/nuxt"],
  css: ["@/assets/css/main.css"],
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
    plugins: [(await import("@tailwindcss/vite")).default()],
  },
});
