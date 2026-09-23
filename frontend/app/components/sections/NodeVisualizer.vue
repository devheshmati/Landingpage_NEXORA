<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { gsap } from "gsap";

interface NodeItem {
  id: number;
  title: string;
  status: "active" | "processing" | "idle";
  x: number;
  y: number;
}

const nodes = ref<NodeItem[]>([
  { id: 1, title: "Edge Gateway", status: "active", x: 5, y: 26 },
  { id: 2, title: "Neural Core", status: "processing", x: 50, y: 15 },
  { id: 3, title: "Vector DB", status: "active", x: 100, y: 40 },
  { id: 4, title: "Inference Engine", status: "processing", x: 50, y: 70 },
]);

const containerRef = ref<HTMLElement | null>(null);
let ctx: gsap.Context | null = null;

onMounted(() => {
  if (containerRef.value) {
    ctx = gsap.context(() => {
      // Floating animation for nodes
      gsap.to(".node-card", {
        y: "+=8",
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          amount: 1.5,
          from: "random",
        },
      });

      // Pulse ring animation for processing nodes
      gsap.to(".pulse-ring", {
        scale: 1.8,
        opacity: 0,
        duration: 2,
        repeat: -1,
        stagger: 0.5,
        ease: "power1.out",
      });
    }, containerRef.value);
  }
});

onUnmounted(() => {
  ctx?.revert(); // Prevent memory leaks
});
</script>

<template>
  <div
    ref="containerRef"
    class="relative mx-auto w-3/4 h-[450px] bg-slate-950/80 border border-slate-800/80 rounded-2xl p-6 overflow-hidden flex items-center justify-center backdrop-blur-xl shadow-2xl"
  >
    <!-- Grid pattern background -->
    <div
      class="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none"
    ></div>

    <!-- SVG connection lines -->
    <svg
      class="absolute inset-0 w-full h-full pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="20%"
        y1="30%"
        x2="50%"
        y2="20%"
        stroke="#3b82f6"
        stroke-width="2"
        stroke-dasharray="4"
        class="opacity-40 animate-pulse"
      />
      <line
        x1="50%"
        y1="20%"
        x2="80%"
        y2="40%"
        stroke="#3b82f6"
        stroke-width="2"
        class="opacity-40"
      />
      <line
        x1="50%"
        y1="20%"
        x2="50%"
        y2="70%"
        stroke="#8b5cf6"
        stroke-width="2"
        stroke-dasharray="6"
        class="opacity-50"
      />
      <line
        x1="20%"
        y1="30%"
        x2="50%"
        y2="70%"
        stroke="#10b981"
        stroke-width="2"
        class="opacity-40"
      />
    </svg>

    <!-- Interactive processing nodes -->
    <div class="relative w-full h-full max-w-2xl">
      <div
        v-for="node in nodes"
        :key="node.id"
        class="node-card absolute -translate-x-1/2 -translate-y-1/2 bg-slate-900/90 border border-slate-700/60 hover:border-blue-500/50 transition-colors p-4 rounded-xl shadow-lg cursor-pointer flex items-center gap-3 group"
        :style="{ left: `${node.x}%`, top: `${node.y}%` }"
      >
        <!-- Pulse effect container -->
        <div
          v-if="node.status === 'processing'"
          class="pulse-ring absolute inset-0 rounded-xl border border-blue-500/60 pointer-events-none"
        ></div>

        <div
          class="w-3 h-3 rounded-full"
          :class="{
            'bg-emerald-400 shadow-[0_0_10px_#34d399]':
              node.status === 'active',
            'bg-blue-500 shadow-[0_0_12px_#3b82f6] animate-ping':
              node.status === 'processing',
            'bg-slate-500': node.status === 'idle',
          }"
        ></div>

        <div class="min-w-[100px]">
          <span class="text-xs text-slate-400 block font-mono"
            >NODE #0{{ node.id }}</span
          >
          <h4
            class="text-sm font-semibold text-slate-200 group-hover:text-blue-400 transition-colors"
          >
            {{ node.title }}
          </h4>
        </div>
      </div>
    </div>

    <!-- Status header badge -->
    <div
      class="absolute top-4 left-4 flex items-center gap-2 bg-slate-900/60 border border-slate-800 px-3 py-1.5 rounded-lg"
    >
      <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
      <span class="text-xs font-mono text-slate-300"
        >SYSTEM: ONLINE / 4 NODES ACTIVE</span
      >
    </div>
  </div>
</template>
