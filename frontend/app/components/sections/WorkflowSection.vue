<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const workflowContainerRef = ref<HTMLElement | null>(null);
let ctx: gsap.Context | null = null;

const { $gsap } = useNuxtApp();

onMounted(() => {
  if (!workflowContainerRef.value) return;

  ctx = $gsap.context(() => {
    const cards = Array.from(workflowContainerRef.value.children);

    $gsap.set(cards, {
      opacity: 0,
      y: 40,
    });

    $gsap.to(cards, {
      scrollTrigger: {
        trigger: workflowContainerRef.value,
        start: "top 80%",
        end: "top 80%",
        toggleActions: "play none reverse reverse",
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
    });
  }, workflowContainerRef.value);
});

onUnmounted(() => {
  ctx?.revert();
});
</script>

<template>
  <section id="process" class="py-section relative overflow-hidden">
    <!-- Ambient Background Glow -->
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-[140px] pointer-events-none"
    />

    <div class="container mx-auto px-6 relative z-10">
      <!-- Section Header -->
      <div class="max-w-2xl mb-16 space-y-4">
        <UiBadge>AI Execution Workflow</UiBadge>
        <h2
          class="text-3xl md:text-5xl font-bold tracking-tight text-main-text"
        >
          How autonomous decisions happen in real-time.
        </h2>
      </div>

      <!-- Interactive Process Pipeline -->
      <div
        ref="workflowContainerRef"
        class="grid grid-cols-1 md:grid-cols-3 gap-6 relative"
      >
        <!-- Step 1: Data Ingestion -->
        <UiGlassCard
          class="step-card space-y-4 relative border-ui-border hover:border-primary/40 transition-colors"
        >
          <div class="flex items-center justify-between">
            <span
              class="text-xs font-mono text-primary-light uppercase tracking-widest"
              >Step 01</span
            >
            <span class="text-2xl">📥</span>
          </div>
          <h3 class="text-xl font-bold text-main-text">
            Data Ingestion & Event
          </h3>
          <p class="text-muted-text text-sm leading-relaxed">
            Raw triggers arrive via Webhooks, APIs, or database updates from
            multi-channel business systems.
          </p>
          <div
            class="pt-2 font-mono text-xs text-muted-text flex items-center gap-2"
          >
            <span class="w-2 h-2 rounded-full bg-primary animate-ping" />
            Listening to endpoints...
          </div>
        </UiGlassCard>

        <!-- Step 2: AI Reasoning -->
        <UiGlassCard
          class="step-card space-y-4 relative border-ui-border hover:border-accent/40 transition-colors"
        >
          <div class="flex items-center justify-between">
            <span
              class="text-xs font-mono text-accent uppercase tracking-widest"
              >Step 02</span
            >
            <span class="text-2xl">🧠</span>
          </div>
          <h3 class="text-xl font-bold text-main-text">
            Contextual AI Reasoning
          </h3>
          <p class="text-muted-text text-sm leading-relaxed">
            LLM agents evaluate business rules, apply historical context, and
            determine optimal execution paths.
          </p>
          <div
            class="pt-2 font-mono text-xs text-accent flex items-center gap-2"
          >
            <span class="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Processing semantic context
          </div>
        </UiGlassCard>

        <!-- Step 3: Action Execution -->
        <UiGlassCard
          class="step-card space-y-4 relative border-ui-border hover:border-primary/40 transition-colors"
        >
          <div class="flex items-center justify-between">
            <span
              class="text-xs font-mono text-primary-light uppercase tracking-widest"
              >Step 03</span
            >
            <span class="text-2xl">⚡</span>
          </div>
          <h3 class="text-xl font-bold text-main-text">Autonomous Execution</h3>
          <p class="text-muted-text text-sm leading-relaxed">
            Actions trigger instantly across external CRMs, notification
            channels, and operational databases.
          </p>
          <div
            class="pt-2 font-mono text-xs text-green-400 flex items-center gap-2"
          >
            <span class="w-2 h-2 rounded-full bg-green-400" />
            Execution completed
          </div>
        </UiGlassCard>
      </div>
    </div>
  </section>
</template>
