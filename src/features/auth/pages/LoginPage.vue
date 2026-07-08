<script setup lang="ts">
import LoginForm from "@/features/auth/components/LoginForm.vue";
</script>

<template>
  <main class="relative grid min-h-screen place-items-center overflow-hidden p-6">
    <div class="absolute inset-0 overflow-hidden bg-[#060b18]" aria-hidden="true">
      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(34,211,238,0.28),transparent_30%),radial-gradient(circle_at_68%_58%,rgba(244,114,182,0.22),transparent_26%),linear-gradient(135deg,#05111f_0%,#0f172a_46%,#111827_100%)]"
      />
      <div
        class="absolute top-1/2 left-1/2 size-[min(72vw,760px)] -translate-1/2 rounded-full bg-[conic-gradient(from_90deg,#22d3ee,#818cf8,#f472b6,#38bdf8,#22d3ee)] opacity-60 blur-3xl"
      />
      <div
        class="absolute top-1/2 left-1/2 size-[520px] -translate-1/2 rotate-45 bg-[linear-gradient(135deg,rgba(103,232,249,0.86),rgba(129,140,248,0.2)_38%,rgba(244,114,182,0.74))] opacity-75 blur-[2px] [clip-path:polygon(50%_0,100%_50%,50%_100%,0_50%)]"
      />
      <div
        class="absolute top-1/2 left-1/2 size-[430px] -translate-1/2 rotate-45 border border-white/30 bg-black/10 shadow-[0_0_90px_rgba(34,211,238,0.45)] [clip-path:polygon(50%_0,100%_50%,50%_100%,0_50%)]"
      />
      <div
        class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px] opacity-35"
      />
      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.34)_58%,rgba(2,6,23,0.78)_100%)]"
      />
    </div>
    <section
      class="relative z-10 w-full max-w-[520px] rounded-[32px] bg-[#ecf0f350] p-8 shadow-[1px_1px_3px_#cbced1,-1px_-1px_3px_white] backdrop-blur-md"
      aria-labelledby="login-title"
    >
      <h1
        id="login-title"
        class="text-center text-[32px] leading-tight font-bold text-white [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]"
      >
        登录
      </h1>
      <LoginForm />
    </section>
  </main>
</template>
