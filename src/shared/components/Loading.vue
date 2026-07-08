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
  <div class="panel" role="status" aria-live="polite">
    <div class="panel-body toolbar">
      <Loader2 :size="18" aria-hidden="true" />
      <span v-text="label" />
    </div>
  </div>
</template>
