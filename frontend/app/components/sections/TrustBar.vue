<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const titleEle = ref<HTMLElement | null>(null);
const brandFrame = ref<HTMLElement | null>(null);
let ctx: any = null;

const { $gsap } = useNuxtApp();

onMounted(() => {
  if (!import.meta.client || !$gsap) return;

  ctx = $gsap.context(() => {
    if (titleEle.value) {
      $gsap.set(titleEle.value, {
        x: -100,
        opacity: 0,
      });

      $gsap.to(titleEle.value, {
        scrollTrigger: {
          trigger: titleEle.value,
          start: "top 80%",
          end: "top 80%",
          toggleActions: "play none reverse reverse",
        },
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: "expo.out",
      });
    }

    if (brandFrame.value) {
      const brands = Array.from(brandFrame.value.children);

      $gsap.set(brands, {
        opacity: 0,
        y: 25,
      });

      $gsap.to(brands, {
        scrollTrigger: {
          trigger: brandFrame.value,
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
    }
  });
});

onUnmounted(() => {
  ctx?.revert();
});
</script>

<template>
  <section class="py-12 border-y border-ui-border/50 bg-surface/20">
    <div class="container mx-auto px-6">
      <p
        ref="titleEle"
        class="text-center text-xs font-semibold text-muted-text uppercase tracking-widest mb-8"
      >
        Trusted by forward-thinking teams
      </p>

      <div
        ref="brandFrame"
        class="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500"
      >
        <span class="text-lg font-bold tracking-wider text-main-text/80"
          >VERTEX</span
        >
        <span class="text-lg font-bold tracking-wider text-main-text/80"
          >NOVA</span
        >
        <span class="text-lg font-bold tracking-wider text-main-text/80"
          >ORBIT</span
        >
        <span class="text-lg font-bold tracking-wider text-main-text/80"
          >SYNAPSE</span
        >
        <span class="text-lg font-bold tracking-wider text-main-text/80"
          >PULSE</span
        >
      </div>
    </div>
  </section>
</template>
