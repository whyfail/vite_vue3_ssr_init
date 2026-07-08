<script setup lang="ts">
const metrics = [
  { label: "SSR 路由", value: "4" },
  { label: "质量门禁", value: "8" },
  { label: "组件覆盖", value: "100%" },
];

const checks = [
  ["服务端渲染", "Nuxt 页面可直接 SSR"],
  ["浏览器 API", "仅允许在 .client 插件或 import.meta.client 中访问"],
  ["组件测试", "每个组件至少 render smoke test"],
  ["E2E", "针对生产预览服务执行 Playwright"],
];
</script>

<template>
  <section class="metric-grid" aria-label="模板指标">
    <div v-for="item in metrics" :key="item.label" class="metric">
      <p class="metric-label" v-text="item.label" />
      <p class="metric-value" v-text="item.value" />
    </div>
  </section>
  <section class="panel" aria-labelledby="checks-title">
    <div class="panel-header">
      <div>
        <h2 id="checks-title" class="panel-title">企业级 SSR 基线</h2>
        <p class="page-subtitle">面向 Node SSR 部署的默认约束。</p>
      </div>
      <span class="badge">Ready</span>
    </div>
    <div class="panel-body">
      <table class="status-table">
        <thead>
          <tr>
            <th>能力</th>
            <th>说明</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="[name, detail] in checks" :key="name">
            <td v-text="name" />
            <td v-text="detail" />
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
