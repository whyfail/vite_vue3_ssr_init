# AGENTS.md

## AI Project Notes

- This is the CWA enterprise Vue SSR template built with Nuxt 4, Vue 3, TypeScript, Pinia, Tailwind CSS 4, Vitest, Playwright, MSW, and jest-axe.
- Keep the project layered by responsibility: route entries live in `src/pages`, layouts in `src/layouts`, business code in `src/features`, shared primitives in `src/shared`, server-only helpers in `src/server`, and test helpers in `src/test`.
- Nuxt SSR is enabled by default. Browser-only behavior must live in `.client` plugins, `onMounted`, or `import.meta.client` guarded code.
- Do not access `window`, `document`, `localStorage`, `sessionStorage`, canvas, or browser performance APIs from server-rendered paths.
- Business requests should use shared API wrappers in `src/shared/api`; do not scatter raw `fetch` or `axios` setup across pages.
- When adding or changing any component, add or update a component test for it; every component should have at least a render smoke test.
- Validate with `pnpm test`, `pnpm test:coverage`, `pnpm test:component-coverage`, `pnpm typecheck`, `pnpm lint`, `pnpm test:e2e`, and `pnpm build`.
- Test reports are written to `coverage/`, `test-results/`, and `playwright-report/`; inspect them before lowering coverage thresholds.

## SSR Rules

- Keep secrets and privileged calls in server-only modules under `src/server` or Nitro server routes.
- Client-only plugins must use the `.client.ts` suffix.
- Authentication in this template is a demo. Server render must not depend on browser storage; use cookies or request headers for real SSR auth.
- Playwright E2E must run against the production preview server so hydration and routing match deployment behavior.

## Code Style

- Prefer TypeScript and `<script setup lang="ts">`.
- Avoid Vue mustache interpolation in template files that may be processed by create-wl-app. Prefer `v-text` for dynamic demo text.
- Keep UI text concise and business-like. This template is a work surface, not a marketing page.
