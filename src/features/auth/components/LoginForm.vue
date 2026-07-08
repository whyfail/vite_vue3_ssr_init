<script setup lang="ts">
import { LogIn } from "@lucide/vue";
import { ref } from "vue";
import { setToken } from "@/features/auth/session";

const username = ref("");
const password = ref("");
const error = ref("");

async function submit() {
  if (!username.value || !password.value) {
    error.value = "请输入账号和密码。";
    return;
  }

  setToken("demo-token", true);
  if (typeof window !== "undefined") {
    window.location.assign("/docs");
  }
}
</script>

<template>
  <form class="form-grid" @submit.prevent="submit">
    <div v-if="error" class="alert" v-text="error" />
    <div class="field">
      <label for="username">账号</label>
      <input
        id="username"
        v-model="username"
        name="username"
        autocomplete="username"
        placeholder="admin"
      />
    </div>
    <div class="field">
      <label for="password">密码</label>
      <input
        id="password"
        v-model="password"
        name="password"
        type="password"
        autocomplete="current-password"
        placeholder="任意密码"
      />
    </div>
    <button class="button primary" type="submit">
      <LogIn :size="16" aria-hidden="true" />
      <span>登录</span>
    </button>
  </form>
</template>
