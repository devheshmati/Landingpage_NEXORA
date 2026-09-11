<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";

// 1. تعداد فرایندها در ماه (۱۰ تا ۱,۰۰۰)
const taskCount = ref(250);

// 2. هزینه/حقوق ساعتی نیروی انسانی بر حسب دلار (۱۰$ تا ۱۵۰$)
const hourlyRate = ref(25);

// هر task حدود ۱۰ دقیقه (0.166 ساعت) زمان می‌برد. AI حدود ۸۵٪ این زمان را آزاد می‌کند.
const monthlyHoursSaved = computed(() =>
  Math.round(taskCount.value * (10 / 60) * 0.85),
);

// صرفه‌جویی ماهانه = (ساعات آزاد شده در ماه) × (هزینه ساعتی نیروی انسانی)
const monthlySavings = computed(
  () => monthlyHoursSaved.value * hourlyRate.value,
);

// صرفه‌جویی سالانه
const annualSavings = computed(() => monthlySavings.value * 12);

const calculatorContainerRef = ref<HTMLElement | null>(null);
let ctx: gsap.Context | null = null;

const { $gsap } = useNuxtApp();

onMounted(() => {
  if (!calculatorContainerRef.value) return;

  ctx = $gsap.context(() => {
    const cards = Array.from(calculatorContainerRef.value.children);

    $gsap.set(cards, { opacity: 0, y: 40 });

    $gsap.to(cards, {
      scrollTrigger: {
        trigger: calculatorContainerRef.value,
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
  }, calculatorContainerRef.value);
});

onUnmounted(() => {
  ctx?.revert();
});
</script>

<template>
  <section id="pricing" class="py-section relative overflow-hidden">
    <!-- Ambient Glow -->
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/10 rounded-full blur-[160px] pointer-events-none"
    />

    <div class="container mx-auto px-6 relative z-10">
      <!-- Section Header -->
      <div class="max-w-2xl mb-16 space-y-4">
        <UiBadge>ROI Calculator</UiBadge>
        <h2
          class="text-3xl md:text-5xl font-bold tracking-tight text-main-text"
        >
          Calculate your automation return on investment.
        </h2>
        <p class="text-muted-text text-base leading-relaxed">
          Estimate immediate operational cost reductions achieved through
          autonomous AI execution pipelines.
        </p>
      </div>

      <!-- Calculator & Pricing Container -->
      <div
        ref="calculatorContainerRef"
        class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
      >
        <!-- Interactive Controls (Left Column) -->
        <UiGlassCard class="lg:col-span-7 space-y-8 p-6 md:p-8">
          <h3 class="text-xl font-bold text-main-text flex items-center gap-2">
            <span>⚙️</span> Operational Parameters
          </h3>

          <!-- Slider 1: Monthly Manual Workflows -->
          <div class="space-y-3">
            <div class="flex justify-between items-center text-sm">
              <label class="text-muted-text font-medium"
                >Monthly Manual Workflows</label
              >
              <span class="font-mono text-primary-light font-bold text-base"
                >{{ taskCount.toLocaleString() }} tasks</span
              >
            </div>
            <input
              v-model.number="taskCount"
              type="range"
              min="10"
              max="1000"
              step="10"
              class="w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div
              class="flex justify-between text-[11px] font-mono text-muted-text"
            >
              <span>10</span>
              <span>1000</span>
            </div>
          </div>

          <!-- Slider 2: Average Hourly Rate -->
          <div class="space-y-3">
            <div class="flex justify-between items-center text-sm">
              <label class="text-muted-text font-medium"
                >Avg. Human Hourly Rate ($)</label
              >
              <span class="font-mono text-accent font-bold text-base"
                >${{ hourlyRate }} / hr</span
              >
            </div>
            <input
              v-model.number="hourlyRate"
              type="range"
              min="10"
              max="150"
              step="5"
              class="w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer accent-accent"
            />
            <div
              class="flex justify-between text-[11px] font-mono text-muted-text"
            >
              <span>$10</span>
              <span>$150</span>
            </div>
          </div>

          <!-- Calculated Metrics Display -->
          <div class="pt-4 border-t border-ui-border/60 grid grid-cols-2 gap-4">
            <div class="bg-black/30 p-4 rounded-lg border border-ui-border">
              <span class="text-xs font-mono text-muted-text block mb-1"
                >Hours Saved / Mo</span
              >
              <span class="text-2xl font-mono font-bold text-main-text"
                >{{ monthlyHoursSaved.toLocaleString() }} hrs</span
              >
            </div>
            <div class="bg-black/30 p-4 rounded-lg border border-ui-border">
              <span class="text-xs font-mono text-muted-text block mb-1"
                >Efficiency Gain</span
              >
              <span class="text-2xl font-mono font-bold text-green-400"
                >~85%</span
              >
            </div>
          </div>
        </UiGlassCard>

        <!-- ROI Summary Card (Right Column) -->
        <UiGlassCard
          class="lg:col-span-5 p-6 md:p-8 space-y-6 border-primary/40 relative overflow-hidden bg-gradient-to-b from-surface-light/40 via-surface to-surface"
        >
          <div class="space-y-2">
            <span
              class="text-xs font-mono text-primary-light uppercase tracking-widest"
              >Projected Annual Savings</span
            >
            <div
              class="text-4xl md:text-5xl font-mono font-bold text-main-text tracking-tight"
            >
              ${{ Math.round(annualSavings).toLocaleString() }}
            </div>
            <p class="text-xs text-muted-text leading-relaxed">
              Based on automated task resolution replacing human labor
              bottlenecks.
            </p>
          </div>

          <div class="space-y-3 pt-4 border-t border-ui-border/60">
            <div class="flex items-center gap-3 text-sm text-main-text">
              <span class="text-green-400">✓</span> Full Auditability & System
              Logs
            </div>
            <div class="flex items-center gap-3 text-sm text-main-text">
              <span class="text-green-400">✓</span> 99.9% Autonomous Uptime
            </div>
            <div class="flex items-center gap-3 text-sm text-main-text">
              <span class="text-green-400">✓</span> Dedicated API Connector
              Setup
            </div>
          </div>

          <div class="pt-4">
            <UiButton class="w-full"> Claim Enterprise ROI Audit </UiButton>
          </div>
        </UiGlassCard>
      </div>
    </div>
  </section>
</template>
