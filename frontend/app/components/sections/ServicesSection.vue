<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const bentoGridRef = ref<HTMLElement | null>(null);
let ctx: gsap.Context | null = null;

const { $gsap } = useNuxtApp();

onMounted(async () => {
  if (!bentoGridRef.value) return;

  ctx = $gsap.context(() => {
    $gsap.set(bentoGridRef.value.children, {
      opacity: 0,
      y: 50,
    });

    $gsap.to(bentoGridRef.value.children, {
      scrollTrigger: {
        trigger: bentoGridRef.value,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
    });
  }, bentoGridRef.value);
});

onUnmounted(() => {
  ctx?.revert();
});
</script>

<template>
  <section id="services" class="py-section relative">
    <div class="container mx-auto px-6">
      <!-- Section Header -->
      <div class="max-w-2xl mb-16 space-y-4">
        <UiBadge>Our Solutions</UiBadge>
        <h2
          class="text-3xl md:text-5xl font-bold tracking-tight text-main-text"
        >
          Systems built to work for you.
        </h2>
      </div>

      <!-- Bento Grid Layout -->
      <div
        ref="bentoGridRef"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <!-- Bento Item 1: AI Agents -->
        <UiGlassCard
          class="lg:col-span-2 space-y-4 relative overflow-hidden group"
        >
          <div
            class="absolute -right-10 -bottom-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-500"
          />
          <div
            class="w-10 h-10 rounded-md bg-primary/20 border border-primary/30 flex items-center justify-center text-primary-light"
          >
            🤖
          </div>
          <h3 class="text-2xl font-bold text-main-text">AI Agents</h3>
          <p class="text-muted-text text-sm leading-relaxed max-w-md">
            Custom intelligent agents built for business operations. They
            analyze requests, reason through decisions, and execute multi-step
            tasks independently.
          </p>
        </UiGlassCard>

        <!-- Bento Item 2: Workflow Automation -->
        <UiGlassCard class="space-y-4 relative overflow-hidden group">
          <div
            class="w-10 h-10 rounded-md bg-accent/20 border border-accent/30 flex items-center justify-center text-accent"
          >
            ⚡
          </div>
          <h3 class="text-xl font-bold text-main-text">Workflow Automation</h3>
          <p class="text-muted-text text-sm leading-relaxed">
            Automate repetitive, multi-step processes across departments with
            high reliability and full auditing.
          </p>
        </UiGlassCard>

        <!-- Bento Item 3: Intelligent Workflows -->
        <UiGlassCard
          class="lg:col-span-3 space-y-4 relative overflow-hidden group bg-gradient-to-r from-surface-light via-surface to-surface-light"
        >
          <div
            class="flex flex-col lg:flex-row lg:items-center justify-between gap-6"
          >
            <div class="space-y-2 max-w-xl">
              <span
                class="text-xs font-mono text-accent uppercase tracking-widest"
                >Core Infrastructure</span
              >
              <h3 class="text-2xl font-bold text-main-text">
                Intelligent Workflows
              </h3>
              <p class="text-muted-text text-sm leading-relaxed">
                Seamlessly connect triggers, real-time AI decision-making
                engines, and external business tools into a single frictionless
                pipeline.
              </p>
            </div>
            <div
              class="flex items-center gap-2 font-mono text-xs text-muted-text bg-background/50 p-4 rounded-md border border-ui-border"
            >
              <span>Trigger</span> →
              <span class="text-primary-light">Analyze</span> →
              <span class="text-accent">Execute</span>
            </div>
          </div>
        </UiGlassCard>

        <!-- Bento Item 4: Data Intelligence -->
        <UiGlassCard class="space-y-4">
          <div
            class="w-10 h-10 rounded-md bg-primary/20 border border-primary/30 flex items-center justify-center text-primary-light"
          >
            📊
          </div>
          <h3 class="text-xl font-bold text-main-text">Data Intelligence</h3>
          <p class="text-muted-text text-sm leading-relaxed">
            Turn fragmented operational data into actionable real-time decision
            insights.
          </p>
        </UiGlassCard>

        <!-- Bento Item 5: Custom Integrations -->
        <UiGlassCard class="lg:col-span-2 space-y-4">
          <div
            class="w-10 h-10 rounded-md bg-accent/20 border border-accent/30 flex items-center justify-center text-accent"
          >
            🔗
          </div>
          <h3 class="text-2xl font-bold text-main-text">Custom Integrations</h3>
          <p class="text-muted-text text-sm leading-relaxed max-w-md">
            Connect existing software tools, CRMs, databases, and custom APIs
            without replacing your core infrastructure.
          </p>
        </UiGlassCard>
      </div>
    </div>
  </section>
</template>
