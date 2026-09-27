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
  { id: 1, title: "Edge Gateway", status: "active", x: 15, y: 38 },
  { id: 2, title: "Neural Core", status: "processing", x: 50, y: 22 },
  { id: 3, title: "Vector DB", status: "active", x: 82, y: 48 },
  { id: 4, title: "Inference Engine", status: "processing", x: 50, y: 78 },
]);

const containerRef = ref<HTMLElement | null>(null);
let ctx: gsap.Context | null = null;

onMounted(() => {
  if (containerRef.value) {
    ctx = gsap.context(() => {
      // Floating animation for nodes
      gsap.to(".node-card", {
        y: "+=6",
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
        scale: 1.6,
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
  ctx?.revert();
});
</script>

<template>
  <div
    ref="containerRef"
    class="relative mx-auto w-full sm:w-11/12 md:w-3/4 h-[380px] sm:h-[450px] bg-slate-950/80 border border-slate-800/80 sm:rounded-2xl p-3 sm:p-6 overflow-hidden flex items-center justify-center backdrop-blur-xl shadow-2xl"
  >
    <!-- Grid pattern background -->
    <div
      class="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] sm:bg-[size:2rem_2rem] pointer-events-none"
    ></div>

    <!-- SVG connection lines (مختصات دقیقاً متناظر با درصد نودها) -->
    <svg
      class="absolute inset-0 w-full h-full pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- Node 1 (15%, 38%) to Node 2 (50%, 22%) -->
      <line
        x1="15%"
        y1="38%"
        x2="50%"
        y2="22%"
        stroke="#3b82f6"
        stroke-width="2"
        stroke-dasharray="4"
        class="opacity-40 animate-pulse"
      />
      <!-- Node 2 (50%, 22%) to Node 3 (82%, 48%) -->
      <line
        x1="50%"
        y1="22%"
        x2="82%"
        y2="48%"
        stroke="#3b82f6"
        stroke-width="2"
        class="opacity-40"
      />
      <!-- Node 2 (50%, 22%) to Node 4 (50%, 78%) -->
      <line
        x1="50%"
        y1="22%"
        x2="50%"
        y2="78%"
        stroke="#8b5cf6"
        stroke-width="2"
        stroke-dasharray="6"
        class="opacity-50"
      />
      <!-- Node 1 (15%, 38%) to Node 4 (50%, 78%) -->
      <line
        x1="15%"
        y1="38%"
        x2="50%"
        y2="78%"
        stroke="#10b981"
        stroke-width="2"
        class="opacity-40"
      />
    </svg>

    <!-- Interactive processing nodes -->
    <div class="relative w-full h-full">
      <div
        v-for="node in nodes"
        :key="node.id"
        class="node-card absolute -translate-x-1/2 -translate-y-1/2 bg-slate-900/90 border border-slate-700/60 hover:border-blue-500/50 transition-colors p-2 sm:p-3.5 rounded-xl shadow-lg cursor-pointer flex items-center gap-2 sm:gap-3 group backdrop-blur-md"
        :style="{ left: `${node.x}%`, top: `${node.y}%` }"
      >
        <!-- Pulse effect container -->
        <div
          v-if="node.status === 'processing'"
          class="pulse-ring absolute inset-0 rounded-xl border border-blue-500/60 pointer-events-none"
        ></div>

        <div
          class="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full shrink-0"
          :class="{
            'bg-emerald-400 shadow-[0_0_10px_#34d399]':
              node.status === 'active',
            'bg-blue-500 shadow-[0_0_12px_#3b82f6] animate-ping':
              node.status === 'processing',
            'bg-slate-500': node.status === 'idle',
          }"
        ></div>

        <div class="min-w-[65px] sm:min-w-[100px]">
          <span class="text-[9px] sm:text-xs text-slate-400 block font-mono leading-none mb-0.5 sm:mb-1"
            >NODE #0{{ node.id }}</span
          >
          <h4
            class="text-[11px] sm:text-sm font-semibold text-slate-200 group-hover:text-blue-400 transition-colors whitespace-nowrap leading-tight"
          >
            {{ node.title }}
          </h4>
        </div>
      </div>
    </div>

    <!-- Status header badge -->
    <div
      class="absolute top-3 left-3 sm:top-4 sm:left-4 flex items-center gap-1.5 sm:gap-2 bg-slate-900/80 border border-slate-800 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg z-10 backdrop-blur-md"
    >
      <span class="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500 animate-pulse"></span>
      <span class="text-[10px] sm:text-xs font-mono text-slate-300"
        >SYSTEM: ONLINE <span class="hidden xs:inline">/ 4 NODES ACTIVE</span></span
      >
    </div>
  </div>
</template>
