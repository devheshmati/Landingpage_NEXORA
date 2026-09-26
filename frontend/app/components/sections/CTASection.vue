<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from "vue";

const { openModal } = useContactModal();

const ctaCardRef = ref<HTMLElement | null>(null);
let ctx: gsap.Context | null = null;

const { $gsap } = useNuxtApp();

async function goToDocsPage() {
  await navigateTo("/docs");
}

onMounted(async () => {
  if (!import.meta.client) return;
  await nextTick();

  if (!ctaCardRef.value) return;

  ctx = $gsap.context(() => {
    $gsap.from(ctaCardRef.value, {
      scrollTrigger: {
        trigger: ctaCardRef.value,
        start: "top 85%",
        toggleActions: "play none reverse reverse",
      },
      opacity: 0,
      y: 40,
      scale: 0.98,
      duration: 1,
      ease: "power3.out",
    });
  }, ctaCardRef.value);
});

onUnmounted(() => {
  ctx?.revert();
});
</script>

<template>
  <section class="py-section relative overflow-hidden">
    <div class="container mx-auto px-6 relative z-10">
      <!-- Target wrapper div instead of directly referencing the component -->
      <div ref="ctaCardRef" class="max-w-4xl mx-auto">
        <UiGlassCard
          class="relative overflow-hidden p-8 md:p-16 border-primary/30 text-center space-y-8"
        >
          <!-- Background Ambient Glow inside Card -->
          <div
            class="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none"
          />

          <div class="space-y-4 max-w-2xl mx-auto relative z-10">
            <UiBadge>Ready to Automate?</UiBadge>
            <h2
              class="text-3xl md:text-5xl font-bold tracking-tight text-main-text"
            >
              Build your autonomous AI architecture today.
            </h2>
            <p class="text-muted-text text-base md:text-lg leading-relaxed">
              Schedule a technical discovery call or explore integration
              pathways tailored to your system infrastructure.
            </p>
          </div>

          <div
            class="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10"
          >
            <UiButton size="lg" @click="openModal">
              Schedule Technical Audit
            </UiButton>
            <UiButton variant="secondary" size="lg" @click="goToDocsPage">
              Read Documentation
            </UiButton>
          </div>
        </UiGlassCard>
      </div>
    </div>
  </section>
</template>
