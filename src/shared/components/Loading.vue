<script setup lang="ts">
import { Loader2 } from "@lucide/vue";

withDefaults(
  defineProps<{
    label?: string;
  }>(),
  {
    label: "加载中",
  },
);
</script>

<template>
  <div class="rounded-lg border border-border bg-card" role="status" aria-live="polite">
    <div class="flex items-center gap-2.5 p-5">
      <Loader2 :size="18" aria-hidden="true" />
      <span v-text="label" />
    </div>
  </div>
</template>
