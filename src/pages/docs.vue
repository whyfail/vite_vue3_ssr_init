<script setup lang="ts">
import DocsPage from "@/features/docs/pages/DocsPage.vue";

definePageMeta({
  layout: false,
});

useHead({
  title: "文档 - Vue SSR Template",
});
</script>

<template>
  <DocsPage />
</template>
