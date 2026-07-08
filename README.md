# {{ name }}

{{ description }}

Enterprise Vue SSR template for create-wl-app, based on Nuxt 4, Vue 3, TypeScript, Pinia, Tailwind CSS 4, Vitest, Playwright, MSW, and jest-axe.

## Stack

- Nuxt 4 with Node SSR
- Vue 3, Composition API, and TypeScript
- Pinia and Tailwind CSS 4
- Nuxt route entries plus `features/shared/server/test` layering
- Vitest component tests, coverage gate, component coverage guard, accessibility tests, and Playwright E2E
- Git hooks with Conventional Commit validation

## Commands

| Command                        | Description                                 |
| ------------------------------ | ------------------------------------------- |
| `pnpm dev`                     | Start the SSR development server            |
| `pnpm build`                   | Build the production SSR app into `.output` |
| `pnpm preview`                 | Run the production Node SSR preview         |
| `pnpm test`                    | Run unit and component tests                |
| `pnpm test:coverage`           | Run coverage gate                           |
| `pnpm test:component-coverage` | Ensure every component has a component test |
| `pnpm test:e2e`                | Run Playwright against production preview   |
| `pnpm typecheck`               | Run Nuxt type checks                        |
| `pnpm lint`                    | Run Oxlint                                  |

## Project Structure

```txt
src/
  pages/               Nuxt route entries
  layouts/             App layouts
  features/            Business features
  shared/              Shared API, UI, components, and utilities
  server/              Server-only helpers and Nitro-oriented code
  stores/              Pinia stores
  test/                Vitest setup and render helpers
tests/e2e/             Playwright specs
```

## SSR Constraints

- Server-rendered code must not directly access `window`, `document`, `localStorage`, `sessionStorage`, canvas, or browser performance APIs.
- Put browser-only behavior in `.client` plugins, `onMounted`, or `import.meta.client` guarded code.
- Keep API setup in `src/shared/api` and server-only request helpers in `src/server`.
- Demo auth writes to browser storage only after hydration. Real SSR auth should use cookies or headers.

## Testing Baseline

Every component must have at least one render smoke test. More complex components should also cover interaction, error, loading, empty, and accessibility states.

Before publishing template changes, run:

```bash
pnpm test
pnpm test:coverage
pnpm test:component-coverage
pnpm typecheck
pnpm lint
pnpm test:e2e
pnpm build
```
