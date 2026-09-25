<script setup lang="ts">
import { ref, onMounted } from "vue";

const { openModal } = useContactModal();

const { $gsap } = useNuxtApp();
const contentRef = ref(null);
const visualRef = ref(null);

const scrollToSolutions = () => {
  const el = document.getElementById("services");
  el?.scrollIntoView({ behavior: "smooth" });
};

onMounted(() => {
  if (!$gsap) return;

  // Entry animation for text content
  $gsap.from(contentRef.value.children, {
    opacity: 0,
    y: 30,
    duration: 0.8,
    stagger: 0.15,
    ease: "power3.out",
  });

  // Floating & Fade-in animation for visual card
  $gsap.from(visualRef.value, {
    opacity: 0,
    x: 40,
    duration: 1,
    delay: 0.3,
    ease: "power3.out",
  });
});
</script>

<template>
  <section
    class="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden"
  >
    <!-- Glow Orbs Background -->
    <div
      class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none"
    />
    <div
      class="absolute top-1/3 right-10 w-[300px] h-[300px] bg-accent/15 rounded-full blur-[100px] pointer-events-none"
    />

    <div class="container mx-auto px-6 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <!-- Left Column: Content -->
        <div ref="contentRef" class="lg:col-span-7 space-y-6 text-left">
          <UiBadge>AI Automation Studio</UiBadge>

          <h1
            class="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-main-text leading-[1.1]"
          >
            Automate the work.<br />
            <span class="text-gradient">Accelerate the future.</span>
          </h1>

          <p
            class="text-lg md:text-xl text-muted-text max-w-xl font-normal leading-relaxed"
          >
            Build intelligent systems that work while your team focuses on what
            matters.
          </p>

          <div class="flex flex-wrap gap-4 pt-4">
            <UiButton variant="primary" @click="openModal">
              Start a Project →
            </UiButton>
            <UiButton variant="secondary" @click="scrollToSolutions">
              Explore Solutions
            </UiButton>
          </div>
        </div>

        <!-- Right Column: Animated AI Dashboard Visual -->
        <div ref="visualRef" class="lg:col-span-5 relative">
          <div
            class="glass-card p-6 border border-ui-border rounded-xl bg-surface/80 backdrop-blur-xl shadow-2xl relative"
          >
            <!-- Header bar -->
            <div
              class="flex items-center justify-between pb-4 border-b border-ui-border mb-6"
            >
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full bg-red-500/80" />
                <span class="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span class="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span class="text-xs font-mono text-muted-text"
                >NEXORA AI Engine</span
              >
            </div>

            <!-- Animated Automation Workflow Mockup -->
            <div class="space-y-4">
              <div
                class="node-card p-3 rounded-md bg-surface-light border border-ui-border flex items-center justify-between"
              >
                <span class="text-sm text-main-text">Customer Request</span>
                <span
                  class="text-xs text-accent bg-accent/10 px-2 py-0.5 rounded"
                  >Trigger</span
                >
              </div>

              <div class="flex justify-center my-1">
                <div
                  class="w-0.5 h-6 bg-gradient-to-b from-accent to-primary animate-pulse"
                />
              </div>

              <div
                class="node-card p-3 rounded-md bg-surface-light border border-ui-border flex items-center justify-between"
              >
                <span class="text-sm text-main-text">AI Agent Analysis</span>
                <span
                  class="text-xs text-primary-light bg-primary/10 px-2 py-0.5 rounded"
                  >Processing</span
                >
              </div>

              <div class="flex justify-center my-1">
                <div
                  class="w-0.5 h-6 bg-gradient-to-b from-primary to-accent animate-pulse"
                />
              </div>

              <div
                class="node-card p-3 rounded-md bg-surface-light border border-ui-border flex items-center justify-between"
              >
                <span class="text-sm text-main-text"
                  >CRM Updated & Email Sent</span
                >
                <span
                  class="text-xs text-green-400 bg-green-500/10 px-2 py-0.5 rounded"
                  >Completed ✓</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
