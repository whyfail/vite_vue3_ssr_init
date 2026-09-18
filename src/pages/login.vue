<script setup lang="ts">
import LoginPage from "@/features/auth/pages/LoginPage.vue";

definePageMeta({
  layout: false,
});

useHead({
  title: "登录 - Vue SSR Template",
});
</script>

<template>
  <LoginPage />
</template>
