<script setup lang="ts">
const currentYear = new Date().getFullYear();
const route = useRoute();
const isHomePage = computed(() => route.path === "/");
</script>

<template>
  <footer class="border-t border-ui-border/60 bg-black/40 relative z-10">
    <div class="container mx-auto px-6 py-12 md:py-16">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-10">
        <!-- Brand Info -->
        <div class="space-y-4 md:col-span-1">
          <NuxtLink
            to="/"
            class="text-xl font-mono font-bold tracking-wider text-main-text flex items-center gap-2"
          >
            <span class="w-2.5 h-2.5 rounded-full bg-primary" />
            NEXORA<span class="text-primary-light">.AI</span>
          </NuxtLink>
          <p class="text-muted-text text-sm leading-relaxed">
            Autonomous AI agent infrastructure for enterprise workflows.
          </p>
        </div>

        <!-- Navigation Links 1 -->
        <div class="space-y-3">
          <h4
            class="text-xs font-mono uppercase text-main-text tracking-widest"
          >
            Architecture
          </h4>
          <ul class="space-y-2 text-sm text-muted-text">
            <li v-if="isHomePage">
              <NuxtLink
                to="#services"
                class="hover:text-main-text transition-colors"
              >
                Core Engine
              </NuxtLink>
            </li>
            <li v-if="isHomePage">
              <NuxtLink
                to="#workflow"
                class="hover:text-main-text transition-colors"
              >
                Pipeline Workflow
              </NuxtLink>
            </li>
            <li v-if="isHomePage">
              <NuxtLink
                to="#services"
                class="hover:text-main-text transition-colors"
              >
                Integrations
              </NuxtLink>
            </li>
            <NuxtLink v-if="!isHomePage" to="/">Home</NuxtLink>
          </ul>
        </div>

        <!-- Navigation Links 2 -->
        <div class="space-y-3">
          <h4
            class="text-xs font-mono uppercase text-main-text tracking-widest"
          >
            Resources
          </h4>
          <ul class="space-y-2 text-sm text-muted-text">
            <li>
              <NuxtLink
                to="/docs"
                class="hover:text-main-text transition-colors"
              >
                API Reference
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- System Status Indicator -->
        <div class="space-y-3">
          <h4
            class="text-xs font-mono uppercase text-main-text tracking-widest"
          >
            Network Status
          </h4>
          <div
            class="p-3 rounded-lg border border-ui-border bg-black/30 space-y-2"
          >
            <div
              class="flex items-center gap-2 text-xs text-green-400 font-mono"
            >
              <span class="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              All Systems Operational
            </div>
            <p class="text-[11px] text-muted-text font-mono">
              Global Node Latency: 18ms
            </p>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div
        class="mt-12 pt-6 border-t border-ui-border/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-text"
      >
        <p>© {{ currentYear }} NEXORA AI Inc. All rights reserved.</p>
        <div class="flex gap-6">
          <NuxtLink
            to="/privacy"
            class="hover:text-main-text transition-colors"
          >
            Privacy Policy
          </NuxtLink>
          <NuxtLink to="/terms" class="hover:text-main-text transition-colors">
            Terms of Service
          </NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>
