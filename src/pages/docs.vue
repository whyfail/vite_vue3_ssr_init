<script setup lang="ts">
import DocsPage from "@/features/docs/pages/DocsPage.vue";

definePageMeta({
  layout: false,
});

useHead({
  title: "文档 - CWA Vue SSR",
});
</script>

<template>
  <DocsPage />
</template>
