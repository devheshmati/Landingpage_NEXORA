<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const cardsGridRef = ref<HTMLElement | null>(null);
let ctx: gsap.Context | null = null;

const { $gsap } = useNuxtApp();

onMounted(async () => {
  if (!cardsGridRef.value) return;

  ctx = $gsap.context(() => {
    const cards = Array.from(cardsGridRef.value.children);

    $gsap.set(cards, {
      opacity: 0,
      y: 40,
    });

    $gsap.to(cards, {
      scrollTrigger: {
        trigger: cardsGridRef.value,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
    });
  }, cardsGridRef.value);
});

onUnmounted(() => {
  ctx?.revert();
});
</script>

<template>
  <section class="py-section relative">
    <div class="container mx-auto px-6">
      <!-- Section Header -->
      <div class="max-w-2xl mb-16 space-y-4">
        <UiBadge>The Problem</UiBadge>
        <h2
          class="text-3xl md:text-5xl font-bold tracking-tight text-main-text"
        >
          Your business shouldn't run on repetitive work.
        </h2>
      </div>

      <!-- Problem Cards Grid -->
      <div ref="cardsGridRef" class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <UiGlassCard class="space-y-4">
          <div
            class="w-12 h-12 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center text-primary-light font-mono font-bold text-lg"
          >
            01
          </div>
          <h3 class="text-xl font-bold text-main-text">Manual Processes</h3>
          <p class="text-muted-text text-sm leading-relaxed">
            Hours disappear into repetitive tasks that keep your team from
            focused strategic growth.
          </p>
        </UiGlassCard>

        <UiGlassCard class="space-y-4">
          <div
            class="w-12 h-12 rounded-md bg-accent/10 border border-accent/20 flex items-center justify-center text-accent font-mono font-bold text-lg"
          >
            02
          </div>
          <h3 class="text-xl font-bold text-main-text">Fragmented Tools</h3>
          <p class="text-muted-text text-sm leading-relaxed">
            Your team jumps between disconnected systems, creating data silos
            and friction.
          </p>
        </UiGlassCard>

        <UiGlassCard class="space-y-4">
          <div
            class="w-12 h-12 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center text-primary-light font-mono font-bold text-lg"
          >
            03
          </div>
          <h3 class="text-xl font-bold text-main-text">Slow Decisions</h3>
          <p class="text-muted-text text-sm leading-relaxed">
            Important information gets buried in manual workflows, slowing down
            business execution.
          </p>
        </UiGlassCard>
      </div>
    </div>
  </section>
</template>
