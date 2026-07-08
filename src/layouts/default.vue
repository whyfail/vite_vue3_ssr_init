<script setup lang="ts">
import { FileText, ShieldCheck } from "@lucide/vue";
import { useRoute } from "#app";

const route = useRoute();
</script>

<template>
  <div class="grid min-h-screen grid-cols-1 md:grid-cols-[248px_minmax(0,1fr)]">
    <aside
      class="border-b border-border bg-card px-4.5 py-6 md:border-r md:border-b-0"
      aria-label="主导航"
    >
      <NuxtLink class="flex items-center gap-2.5 text-sm font-semibold" to="/docs">
        <span
          class="grid size-8.5 place-items-center rounded-full bg-primary text-primary-foreground"
        >
          SSR
        </span>
        <span>CWA Vue SSR</span>
      </NuxtLink>
      <nav class="mt-7 grid gap-1.5">
        <NuxtLink
          class="flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm text-secondary-foreground hover:bg-muted hover:text-primary [&.router-link-active]:bg-muted [&.router-link-active]:text-primary"
          to="/docs"
        >
          <FileText :size="16" aria-hidden="true" />
          <span>文档中心</span>
        </NuxtLink>
        <NuxtLink
          class="flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm text-secondary-foreground hover:bg-muted hover:text-primary [&.router-link-active]:bg-muted [&.router-link-active]:text-primary"
          to="/login"
        >
          <ShieldCheck :size="16" aria-hidden="true" />
          <span>登录示例</span>
        </NuxtLink>
      </nav>
    </aside>
    <main class="min-w-0 p-5 md:p-7">
      <header
        class="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center"
      >
        <div>
          <h1
            class="text-2xl leading-tight font-semibold"
            v-text="route.meta.title || 'SSR 模板工作台'"
          />
          <p class="mt-1.5 text-sm text-muted-foreground">Nuxt 4 企业级 SSR 模板基线</p>
        </div>
        <div class="flex items-center gap-2.5">
          <NuxtLink
            class="inline-flex min-h-9 items-center justify-center gap-2 rounded-full border border-border bg-card px-3.5 text-sm text-foreground hover:bg-muted"
            to="/login"
          >
            登录示例
          </NuxtLink>
        </div>
      </header>
      <slot />
    </main>
  </div>
</template>
