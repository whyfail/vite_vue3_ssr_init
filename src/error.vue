<script setup lang="ts">
import { RefreshCw } from "@lucide/vue";
import { clearError } from "#app";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";

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
  <main class="grid min-h-screen place-items-center bg-background p-6">
    <Card class="w-full max-w-[420px] p-7" aria-labelledby="error-title">
      <CardHeader>
        <Badge variant="secondary" v-text="props.error.statusCode || 'Error'" />
        <CardTitle id="error-title" class="text-2xl leading-tight font-semibold">
          页面加载失败
        </CardTitle>
        <CardDescription v-text="props.error.message || '请稍后重试。'" />
      </CardHeader>
      <CardContent>
        <Button class="mt-5 w-full" type="button" @click="clear">
          <RefreshCw :size="16" aria-hidden="true" />
          <span>返回文档页</span>
        </Button>
      </CardContent>
    </Card>
  </main>
</template>
