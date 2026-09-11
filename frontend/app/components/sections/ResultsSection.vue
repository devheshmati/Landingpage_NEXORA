<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const metricsContainerRef = ref<HTMLElement | null>(null);
let ctx: gsap.Context | null = null;

const { $gsap } = useNuxtApp();

onMounted(() => {
  if (!metricsContainerRef.value) return;

  ctx = $gsap.context(() => {
    const cards = Array.from(metricsContainerRef.value.children);

    // Reveal Cards
    $gsap.set(cards, {
      opacity: 0,
      y: 30,
    });

    $gsap.to(cards, {
      scrollTrigger: {
        trigger: metricsContainerRef.value,
        start: "top 80%",
        end: "top 80%",
        toggleActions: "play none reverse reverse",
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
    });

    // Count-up Numbers Animation
    const targets = metricsContainerRef.value.querySelectorAll(".count-num");

    targets.forEach((el) => {
      const targetVal = parseFloat(el.getAttribute("data-target") || "0");
      const isDecimal = targetVal % 1 !== 0;

      const obj = { val: 0 };

      $gsap.to(obj, {
        scrollTrigger: {
          trigger: metricsContainerRef.value,
          start: "top 80%",
          toggleActions: "play none reverse reverse",
        },
        val: targetVal,
        duration: 2,
        ease: "power2.out",
        onUpdate: () => {
          el.textContent = isDecimal
            ? obj.val.toFixed(1)
            : Math.round(obj.val).toString();
        },
      });
    });
  }, metricsContainerRef.value);
});

onUnmounted(() => {
  ctx?.revert();
});
</script>

<template>
  <section
    id="results"
    class="py-section relative overflow-hidden border-y border-ui-border/50 bg-black/20"
  >
    <!-- Ambient Background Glow -->
    <div
      class="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[250px] bg-accent/10 rounded-full blur-[140px] pointer-events-none"
    />

    <div class="container mx-auto px-6 relative z-10">
      <!-- Section Header -->
      <div class="max-w-2xl mb-16 space-y-4">
        <UiBadge>Measurable Impact</UiBadge>
        <h2
          class="text-3xl md:text-5xl font-bold tracking-tight text-main-text"
        >
          Engineered for scale. Proven by numbers.
        </h2>
      </div>

      <!-- Metrics Grid -->
      <div
        ref="metricsContainerRef"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <!-- Metric 1 -->
        <UiGlassCard
          class="metric-card space-y-2 border-ui-border/80 hover:border-primary/50 transition-colors"
        >
          <div
            class="text-4xl md:text-5xl font-mono font-bold text-primary-light flex items-center"
          >
            <span class="count-num" data-target="99.9">0</span>
            <span>%</span>
          </div>
          <h3 class="text-lg font-semibold text-main-text">Uptime Guarantee</h3>
          <p class="text-muted-text text-sm">
            High-availability infrastructure built for critical operations.
          </p>
        </UiGlassCard>

        <!-- Metric 2 -->
        <UiGlassCard
          class="metric-card space-y-2 border-ui-border/80 hover:border-accent/50 transition-colors"
        >
          <div
            class="text-4xl md:text-5xl font-mono font-bold text-accent flex items-center"
          >
            <span class="count-num" data-target="85">0</span>
            <span>%</span>
          </div>
          <h3 class="text-lg font-semibold text-main-text">Cost Reduction</h3>
          <p class="text-muted-text text-sm">
            Average operational savings after autonomous workflow integration.
          </p>
        </UiGlassCard>

        <!-- Metric 3 -->
        <UiGlassCard
          class="metric-card space-y-2 border-ui-border/80 hover:border-primary/50 transition-colors"
        >
          <div
            class="text-4xl md:text-5xl font-mono font-bold text-primary-light flex items-center"
          >
            <span>&lt;</span>
            <span class="count-num" data-target="120">0</span>
            <span>ms</span>
          </div>
          <h3 class="text-lg font-semibold text-main-text">Average Latency</h3>
          <p class="text-muted-text text-sm">
            Sub-second decision-making speeds for real-time triggers.
          </p>
        </UiGlassCard>

        <!-- Metric 4 -->
        <UiGlassCard
          class="metric-card space-y-2 border-ui-border/80 hover:border-accent/50 transition-colors"
        >
          <div
            class="text-4xl md:text-5xl font-mono font-bold text-accent flex items-center"
          >
            <span class="count-num" data-target="10">0</span>
            <span>M+</span>
          </div>
          <h3 class="text-lg font-semibold text-main-text">Daily Executions</h3>
          <p class="text-muted-text text-sm">
            Autonomous events processed seamlessly across system pipelines.
          </p>
        </UiGlassCard>
      </div>
    </div>
  </section>
</template>
