# syntax=docker/dockerfile:1.7
# Multi-stage build for the Nuxt Nitro output. The final image runs the compiled
# server as a non-root user; no package manager or source is shipped.

FROM node:24-alpine AS deps
WORKDIR /app
RUN npm install -g pnpm@11.20.0
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile --ignore-scripts

FROM node:24-alpine AS build
WORKDIR /app
RUN npm install -g pnpm@11.20.0
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

FROM node:24-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production \
    PORT=3000 \
    HOST=0.0.0.0
RUN addgroup -S app && adduser -S app -G app
COPY --from=build --chown=app:app /app/.output ./.output
USER app
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
