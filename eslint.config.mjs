import tsParser from "@typescript-eslint/parser";
import tailwindcss from "eslint-plugin-tailwindcss";
import vueParser from "vue-eslint-parser";

export default [
  {
    ignores: [".nuxt", ".output", "coverage", "playwright-report", "test-results"],
  },
  {
    files: ["src/**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      tailwindcss,
    },
    settings: {
      tailwindcss: {
        cssConfigPath: "./src/assets/css/tailwind.css",
      },
    },
    rules: {
      ...tailwindcss.configs.recommended.rules,
      "tailwindcss/no-custom-classname": "off",
    },
  },
];
