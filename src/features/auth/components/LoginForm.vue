<script setup lang="ts">
import { ref } from "vue";
import { setToken } from "@/features/auth/session";
import { Alert, AlertDescription } from "@/shared/ui/alert";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

const username = ref("admin");
const password = ref("admin");
const error = ref("");
const remember = ref(false);

async function submit() {
  if (!username.value || !password.value) {
    error.value = "请输入账号和密码。";
    return;
  }

  setToken("demo-token", remember.value);
  if (typeof window !== "undefined") {
    window.location.assign("/docs");
  }
}
</script>

<template>
  <form class="mt-6 flex flex-col gap-4" @submit.prevent="submit">
    <Alert v-if="error" class="bg-white/85" variant="destructive">
      <AlertDescription v-text="error" />
    </Alert>
    <div class="grid gap-1.5">
      <Label class="sr-only" for="username">账号</Label>
      <Input
        id="username"
        v-model="username"
        class="h-10 bg-white/80"
        name="username"
        autocomplete="username"
        placeholder="请输入账号：admin"
      />
    </div>
    <div class="grid gap-1.5">
      <Label class="sr-only" for="password">密码</Label>
      <Input
        id="password"
        v-model="password"
        class="h-10 bg-white/80"
        name="password"
        type="password"
        autocomplete="current-password"
        placeholder="请输入登录密码：admin"
      />
    </div>
    <Button class="h-10 w-full" type="submit">登录</Button>
    <label class="flex items-center justify-end gap-2 text-sm text-white">
      <input
        v-model="remember"
        class="size-4 rounded border-white/70 bg-white/80 accent-primary"
        type="checkbox"
      />
      <span>记住账号</span>
    </label>
  </form>
</template>
