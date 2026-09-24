<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

useSeoMeta({
  title: "About Architecture",
  description: "Learn about NEXORA autonomous workflow orchestration engine.",
});

const pillars = [
  {
    icon: "🛡️",
    title: "Zero-Trust Execution",
    desc: "Every agent payload runs inside isolated sandboxes with ephemeral token generation and cryptographically signed action logs.",
  },
  {
    icon: "⚡",
    title: "Sub-50ms Routing",
    desc: "Distributed edge nodes minimize latency across API gateways, providing real-time data streaming and instant fallback handles.",
  },
  {
    icon: "🎯",
    title: "Deterministic Control",
    desc: "Strict schema enforcement guarantees non-hallucinatory JSON responses with automated retry limits and circuit breakers.",
  },
];

const heroRef = ref<HTMLElement | null>(null);
const pillarsRef = ref<HTMLElement | null>(null);
let ctx: any = null;

const { $gsap } = useNuxtApp();

onMounted(() => {
  if (!import.meta.client || !$gsap) return;

  ctx = $gsap.context(() => {
    // Hero Entrance
    if (heroRef.value) {
      $gsap.from(heroRef.value.children, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });
    }

    // Pillars Stagger
    if (pillarsRef.value) {
      const cards = Array.from(pillarsRef.value.children);
      $gsap.set(cards, { opacity: 0, y: 40 });

      $gsap.to(cards, {
        scrollTrigger: {
          trigger: pillarsRef.value,
          start: "top 80%",
          toggleActions: "play none reverse reverse",
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });
    }
  });
});

onUnmounted(() => {
  ctx?.revert();
});
</script>

<template>
  <div class="py-section relative overflow-hidden">
    <!-- Ambient Background Glows -->
    <div
      class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[180px] pointer-events-none"
    />
    <div
      class="absolute bottom-1/4 right-10 w-[500px] h-[300px] bg-accent/10 rounded-full blur-[160px] pointer-events-none"
    />

    <div class="container mx-auto px-6 relative z-10 space-y-24">
      <!-- Page Hero Header -->
      <div ref="heroRef" class="max-w-3xl mx-auto text-center space-y-6">
        <UiBadge>Engineering Philosophy</UiBadge>
        <h1
          class="text-4xl md:text-6xl font-bold tracking-tight text-main-text leading-tight"
        >
          Built for deterministic execution at enterprise scale.
        </h1>
        <p class="text-muted-text text-lg md:text-xl leading-relaxed">
          NEXORA bridges probabilistic LLM reasoning with deterministic
          corporate infrastructure, enabling autonomous actions without
          human-in-the-loop bottlenecks.
        </p>
      </div>

      <!-- Core Architecture Pillars -->
      <div class="space-y-8">
        <div class="text-center space-y-2">
          <span
            class="text-xs font-mono text-primary-light uppercase tracking-widest"
            >Architectural Pillars</span
          >
          <h2 class="text-2xl md:text-4xl font-bold text-main-text">
            Engineered for absolute reliability
          </h2>
        </div>

        <div ref="pillarsRef" class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <UiGlassCard
            v-for="(pillar, idx) in pillars"
            :key="idx"
            class="p-8 space-y-4 border-ui-border/80 hover:border-primary/50 transition-colors duration-300"
          >
            <div
              class="text-3xl p-3 bg-surface rounded-xl w-fit border border-ui-border"
            >
              {{ pillar.icon }}
            </div>
            <h3 class="text-xl font-bold text-main-text">{{ pillar.title }}</h3>
            <p class="text-muted-text text-sm leading-relaxed">
              {{ pillar.desc }}
            </p>
          </UiGlassCard>
        </div>
      </div>

      <!-- Technical Stack Layer Breakdown -->
      <UiGlassCard
        class="p-8 md:p-12 space-y-8 border-primary/30 relative overflow-hidden"
      >
        <div class="max-w-2xl space-y-3">
          <span class="text-xs font-mono text-accent uppercase tracking-widest"
            >System Protocol</span
          >
          <h2 class="text-2xl md:text-3xl font-bold text-main-text">
            Autonomous Pipeline Layers
          </h2>
          <p class="text-muted-text text-sm leading-relaxed">
            How data flows from ingestion to verifiable execution inside NEXORA
            edge clusters.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono text-xs">
          <div
            class="p-4 bg-black/40 rounded-lg border border-ui-border space-y-2"
          >
            <span class="text-primary-light font-bold">01. INGESTION</span>
            <p class="text-main-text text-sm font-sans font-medium">
              gRPC & Webhooks
            </p>
            <p class="text-muted-text font-sans text-xs">
              High-throughput streaming queues.
            </p>
          </div>

          <div
            class="p-4 bg-black/40 rounded-lg border border-accent/40 space-y-2"
          >
            <span class="text-accent font-bold">02. REASONING</span>
            <p class="text-main-text text-sm font-sans font-medium">
              Multi-Agent Router
            </p>
            <p class="text-muted-text font-sans text-xs">
              Context matching & model selection.
            </p>
          </div>

          <div
            class="p-4 bg-black/40 rounded-lg border border-ui-border space-y-2"
          >
            <span class="text-primary-light font-bold">03. VERIFICATION</span>
            <p class="text-main-text text-sm font-sans font-medium">
              JSON Schema Guard
            </p>
            <p class="text-muted-text font-sans text-xs">
              Validation before API payload dispatch.
            </p>
          </div>

          <div
            class="p-4 bg-black/40 rounded-lg border border-green-500/40 space-y-2"
          >
            <span class="text-green-400 font-bold">04. EXECUTION</span>
            <p class="text-main-text text-sm font-sans font-medium">
              Distributed Action Node
            </p>
            <p class="text-muted-text font-sans text-xs">
              Signed API requests & audit logging.
            </p>
          </div>
        </div>
      </UiGlassCard>

      <!-- CTA Footer Callout -->
      <div class="text-center space-y-6 pt-8">
        <h3 class="text-2xl font-bold text-main-text">
          Ready to review the API integration standards?
        </h3>
        <div class="flex items-center justify-center gap-4">
          <NuxtLink to="/docs">
            <UiButton size="lg">Explore Developer Docs</UiButton>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Scoped styles if needed */
</style>
