<script setup lang="ts">
import {
  BellAlertIcon,
  BoltIcon,
  CircleStackIcon,
  CodeBracketSquareIcon,
  CubeTransparentIcon,
  DocumentTextIcon,
  FolderIcon,
  PaintBrushIcon,
  PuzzlePieceIcon,
  RocketLaunchIcon,
  ShieldCheckIcon,
  SparklesIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/vue/24/outline";

const structures = [
  {
    icon: RocketLaunchIcon,
    path: "src/pages",
    description: "只放 Nuxt 页面入口；layout、插件和业务实现分别进入对应边界。",
  },
  {
    icon: FolderIcon,
    path: "src/features",
    description: "业务归属目录：page、component、api、store、business logic 都跟随 feature。",
  },
  {
    icon: PuzzlePieceIcon,
    path: "src/shared",
    description: "跨业务基础能力：ui、api、lib、components。不要放具体业务行为。",
  },
  {
    icon: ShieldCheckIcon,
    path: "src/features/auth",
    description: "登录与 session 边界。演示 token 只在 client-safe 交互中写入。",
  },
  {
    icon: DocumentTextIcon,
    path: "src/server",
    description: "服务端专属能力。Nitro 路由、请求上下文和特权调用只放这里。",
  },
];

const libraries = [
  {
    icon: BoltIcon,
    name: "Nuxt",
    role: "Nuxt 4 SSR、文件路由、布局和生产预览服务。",
  },
  {
    icon: CubeTransparentIcon,
    name: "Vue",
    role: "组件化视图、Composition API 与 client-safe 交互。",
  },
  {
    icon: PaintBrushIcon,
    name: "Tailwind CSS",
    role: "默认样式表达方式，主题变量映射在 assets/css/tailwind.css。",
  },
  {
    icon: PuzzlePieceIcon,
    name: "shadcn-vue",
    role: "基础 UI primitives；只放 shared/ui。",
  },
  {
    icon: SparklesIcon,
    name: "Heroicons",
    role: "文档与信息展示图标；从 @heroicons/vue 按需导入。",
  },
  {
    icon: SparklesIcon,
    name: "@lucide/vue",
    role: "常见操作图标；用于导航、按钮和控制类 UI。",
  },
  {
    icon: CodeBracketSquareIcon,
    name: "Axios",
    role: "HTTP 基础库；统一封装在 shared/api。",
  },
  {
    icon: BellAlertIcon,
    name: "vue-sonner",
    role: "Toast 基础能力，业务层按封装入口调用。",
  },
  {
    icon: CircleStackIcon,
    name: "Pinia",
    role: "feature-local 状态管理。",
  },
];

const switches = [
  {
    icon: WrenchScrewdriverIcon,
    key: "NUXT_ENABLE_CODE_INSPECTOR",
    plugin: "code-inspector-plugin",
    description: "在页面上按住组合键点击元素，快速定位组件源码位置；模板默认关闭。",
  },
  {
    icon: BoltIcon,
    key: "nuxt.config.ts",
    plugin: "Nuxt config",
    description: "集中维护 Nuxt SSR 构建配置、模块开关与部署约束。",
  },
  {
    icon: CodeBracketSquareIcon,
    key: "vitest.config.ts",
    plugin: "Vitest",
    description: "组件测试与单元测试配置，覆盖 SSR 安全边界和共享模块。",
  },
  {
    icon: ShieldCheckIcon,
    key: "playwright.config.ts",
    plugin: "Playwright",
    description: "E2E 针对生产预览服务执行，验证真实路由、hydration 与登录路径。",
  },
];
</script>

<template>
  <main class="bg-slate-950 text-slate-100">
    <section class="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-8">
      <header
        class="rounded-lg border border-cyan-400/20 bg-slate-900/80 p-8 shadow-[0_18px_60px_rgba(8,145,178,0.16)]"
      >
        <p class="text-sm font-semibold text-cyan-300">Vue SSR Template Guide</p>
        <h2 class="mt-3 text-3xl font-bold text-white">项目开发文档</h2>
        <p class="mt-4 max-w-3xl text-base leading-7 text-slate-300">
          这是给开发者看的极简索引。AI 执行规则已同步到根目录 AGENTS.md；这里保留 SSR
          边界、目录职责和依赖职责的短说明。
        </p>
      </header>

      <section class="grid gap-4 md:grid-cols-2">
        <article
          v-for="item in structures"
          :key="item.path"
          class="rounded-lg border border-slate-800 bg-slate-900 p-5"
        >
          <div class="flex items-center gap-3">
            <component :is="item.icon" class="size-5 text-cyan-300" aria-hidden="true" />
            <code class="text-sm font-semibold text-cyan-300" v-text="item.path" />
          </div>
          <p class="mt-3 text-sm leading-6 text-slate-300" v-text="item.description" />
        </article>
      </section>

      <section class="rounded-lg border border-slate-800 bg-slate-900 p-6">
        <h2 class="text-xl font-semibold text-white">推荐开发流程</h2>
        <div class="mt-5 grid gap-4 md:grid-cols-4">
          <div class="rounded-md bg-slate-950 p-4">
            <strong class="text-cyan-300">1. 建模块</strong>
            <p class="mt-2 text-sm leading-6 text-slate-300">业务代码进 features。</p>
          </div>
          <div class="rounded-md bg-slate-950 p-4">
            <strong class="text-cyan-300">2. 配路由</strong>
            <p class="mt-2 text-sm leading-6 text-slate-300">页面入口集中在 src/pages。</p>
          </div>
          <div class="rounded-md bg-slate-950 p-4">
            <strong class="text-cyan-300">3. 控边界</strong>
            <p class="mt-2 text-sm leading-6 text-slate-300">
              浏览器 API 加 import.meta.client guard。
            </p>
          </div>
          <div class="rounded-md bg-slate-950 p-4">
            <strong class="text-cyan-300">4. 做验证</strong>
            <p class="mt-2 text-sm leading-6 text-slate-300">执行 pnpm lint/build。</p>
          </div>
        </div>
      </section>

      <section class="rounded-lg border border-slate-800 bg-slate-900 p-6">
        <h2 class="text-xl font-semibold text-white">核心库职责</h2>
        <div class="mt-5 grid gap-3 md:grid-cols-2">
          <div
            v-for="item in libraries"
            :key="item.name"
            class="rounded-md border border-slate-800 bg-slate-950 p-4"
          >
            <div class="flex items-center gap-3">
              <component :is="item.icon" class="size-5 text-cyan-300" aria-hidden="true" />
              <h3 class="font-semibold text-slate-100" v-text="item.name" />
            </div>
            <p class="mt-2 text-sm leading-6 text-slate-300" v-text="item.role" />
          </div>
        </div>
      </section>

      <section class="rounded-lg border border-slate-800 bg-slate-900 p-6">
        <h2 class="text-xl font-semibold text-white">构建开关</h2>
        <p class="mt-2 text-sm leading-6 text-slate-300">
          SSR
          模板通过环境变量和配置文件集中管理构建行为；实验性能力默认关闭，开启后需要回归验证渲染和
          hydration。
        </p>
        <div class="mt-5 grid gap-3 md:grid-cols-2">
          <div
            v-for="item in switches"
            :key="item.key"
            class="rounded-md border border-slate-800 bg-slate-950 p-4"
          >
            <div class="flex items-center gap-3">
              <component :is="item.icon" class="size-5 text-cyan-300" aria-hidden="true" />
              <code class="text-sm font-semibold text-cyan-300" v-text="item.key" />
            </div>
            <p class="mt-2 text-xs leading-5 text-slate-400">
              插件：<code class="text-slate-300" v-text="item.plugin" />
            </p>
            <p class="mt-2 text-sm leading-6 text-slate-300" v-text="item.description" />
          </div>
        </div>
      </section>

      <section class="grid gap-4 md:grid-cols-3">
        <article class="rounded-lg border border-slate-800 bg-slate-900 p-5">
          <div class="flex items-center gap-3">
            <PaintBrushIcon class="size-5 text-cyan-300" aria-hidden="true" />
            <h2 class="text-lg font-semibold text-white">UI 约定</h2>
          </div>
          <p class="mt-3 text-sm leading-6 text-slate-300">
            基础组件放 shared/ui；业务组件留在 feature。
          </p>
        </article>
        <article class="rounded-lg border border-slate-800 bg-slate-900 p-5">
          <div class="flex items-center gap-3">
            <ShieldCheckIcon class="size-5 text-cyan-300" aria-hidden="true" />
            <h2 class="text-lg font-semibold text-white">SSR 边界</h2>
          </div>
          <p class="mt-3 text-sm leading-6 text-slate-300">
            server-only 代码进 src/server；客户端存储只在 client-safe 交互中访问。
          </p>
        </article>
        <article class="rounded-lg border border-slate-800 bg-slate-900 p-5">
          <div class="flex items-center gap-3">
            <SparklesIcon class="size-5 text-cyan-300" aria-hidden="true" />
            <h2 class="text-lg font-semibold text-white">样式方式</h2>
          </div>
          <p class="mt-3 text-sm leading-6 text-slate-300">
            默认 Tailwind；全局样式只放 assets/css/main.scss 与 assets/css/tailwind.css。
          </p>
        </article>
      </section>
    </section>
  </main>
</template>
