<script setup lang="ts">
import { RefreshCw } from "@lucide/vue";
import { clearError } from "#app";

const props = defineProps<{
  error: {
    statusCode?: number;
    message?: string;
  };
}>();

function clear() {
  clearError({ redirect: "/docs" });
}
</script>

<template>
  <main class="login-page">
    <section class="login-panel" aria-labelledby="error-title">
      <p class="badge" v-text="props.error.statusCode || 'Error'" />
      <h1 id="error-title" class="page-title">页面加载失败</h1>
      <p class="page-subtitle" v-text="props.error.message || '请稍后重试。'" />
      <div class="form-grid">
        <button class="button primary" type="button" @click="clear">
          <RefreshCw :size="16" aria-hidden="true" />
          <span>返回文档页</span>
        </button>
      </div>
    </section>
  </main>
</template>
