<script setup lang="ts">
import LoginForm from "@/features/auth/components/LoginForm.vue";
</script>

<template>
  <main class="login-page">
    <section class="login-panel" aria-labelledby="login-title">
      <p class="badge">Node SSR</p>
      <h1 id="login-title" class="page-title">CWA Vue SSR</h1>
      <p class="page-subtitle">
        登录示例只在客户端写入本地 token，服务端渲染路径保持无浏览器 API 依赖。
      </p>
      <LoginForm />
      <div class="form-grid">
        <NuxtLink class="button" to="/docs">查看文档页</NuxtLink>
      </div>
    </section>
  </main>
</template>
