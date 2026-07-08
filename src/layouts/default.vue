<script setup lang="ts">
import { FileText, ShieldCheck } from "@lucide/vue";
import { useRoute } from "#app";

const route = useRoute();
</script>

<template>
  <div class="app-shell">
    <aside class="sidebar" aria-label="主导航">
      <NuxtLink class="brand" to="/docs">
        <span class="brand-mark">SSR</span>
        <span>CWA Vue SSR</span>
      </NuxtLink>
      <nav class="nav-list">
        <NuxtLink class="nav-link" to="/docs">
          <FileText :size="16" aria-hidden="true" />
          <span>文档中心</span>
        </NuxtLink>
        <NuxtLink class="nav-link" to="/login">
          <ShieldCheck :size="16" aria-hidden="true" />
          <span>登录示例</span>
        </NuxtLink>
      </nav>
    </aside>
    <main class="content">
      <header class="topbar">
        <div>
          <h1 class="page-title" v-text="route.meta.title || 'SSR 模板工作台'" />
          <p class="page-subtitle">Nuxt 4 企业级 SSR 模板基线</p>
        </div>
        <div class="toolbar">
          <NuxtLink class="button" to="/login">登录示例</NuxtLink>
        </div>
      </header>
      <slot />
    </main>
  </div>
</template>
