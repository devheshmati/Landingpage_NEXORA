<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";

useSeoMeta({
  title: "Developer Documentation & API — NEXORA",
  description:
    "Integrate NEXORA autonomous agent pipelines into your applications using our high-throughput gRPC, REST, and SDK interfaces.",
});

const activeTab = ref<"typescript" | "python" | "curl">("typescript");
const copied = ref(false);

const codeSnippets = {
  typescript: `import { NexoraClient } from '@nexora/sdk'

const nexora = new NexoraClient({
  apiKey: process.env.NEXORA_API_KEY,
  region: 'us-east-1'
})

// Dispatch an autonomous workflow execution
const execution = await nexora.agents.dispatch({
  agentId: 'ag_fraud_detection_v4',
  payload: {
    transactionId: 'tx_982341824',
    amount: 14200.00,
    currency: 'USD'
  },
  timeoutMs: 3000
})

console.log('Execution Status:', execution.status)
console.log('Verdict Payload:', execution.result)`,

  python: `from nexora import NexoraClient
import os

client = NexoraClient(
    api_key=os.getenv("NEXORA_API_KEY"),
    region="us-east-1"
)

# Dispatch an autonomous workflow execution
execution = client.agents.dispatch(
    agent_id="ag_fraud_detection_v4",
    payload={
        "transaction_id": "tx_982341824",
        "amount": 14200.00,
        "currency": "USD"
    },
    timeout_ms=3000
)

print(f"Execution Status: {execution.status}")
print(f"Verdict Payload: {execution.result}")`,

  curl: `curl -X POST https://api.nexora.ai/v1/agents/dispatch \\
  -H "Authorization: Bearer $NEXORA_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "agent_id": "ag_fraud_detection_v4",
    "payload": {
      "transaction_id": "tx_982341824",
      "amount": 14200.00,
      "currency": "USD"
    },
    "timeout_ms": 3000
  }'`,
};

const currentCode = computed(() => codeSnippets[activeTab.value]);

function copyCode() {
  navigator.clipboard.writeText(currentCode.value);
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 2000);
}

const endpoints = [
  {
    method: "POST",
    path: "/v1/agents/dispatch",
    desc: "Synchronous execution dispatch with strict JSON output guarantee.",
  },
  {
    method: "GET",
    path: "/v1/executions/:id",
    desc: "Retrieve state, logs, and cryptographic traces for a specific run.",
  },
  {
    method: "POST",
    path: "/v1/webhooks/subscribe",
    desc: "Register endpoints for real-time event-driven agent updates.",
  },
];

const heroRef = ref<HTMLElement | null>(null);
let ctx: any = null;
const { $gsap } = useNuxtApp();

onMounted(() => {
  if (!import.meta.client || !$gsap) return;

  ctx = $gsap.context(() => {
    if (heroRef.value) {
      $gsap.from(heroRef.value.children, {
        opacity: 0,
        y: 25,
        duration: 0.8,
        stagger: 0.12,
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
    <!-- Ambient Background Lighting -->
    <div
      class="absolute top-10 left-1/3 w-[600px] h-[350px] bg-primary/10 rounded-full blur-[180px] pointer-events-none"
    />

    <div class="container mx-auto px-6 relative z-10 space-y-16">
      <!-- Hero Header -->
      <div ref="heroRef" class="max-w-3xl mx-auto text-center space-y-4">
        <UiBadge>Developer Hub</UiBadge>
        <h1
          class="text-4xl md:text-5xl font-bold tracking-tight text-main-text"
        >
          API Reference & SDK Integration
        </h1>
        <p class="text-muted-text text-lg leading-relaxed">
          Deploy, stream, and govern NEXORA agent nodes with less than 10 lines
          of code.
        </p>
      </div>

      <!-- Interactive Code Snippet Card -->
      <div class="max-w-4xl mx-auto">
        <UiGlassCard class="p-0 overflow-hidden border-primary/30 shadow-2xl">
          <!-- Top Bar: Tabs & Copy Button -->
          <div
            class="flex items-center justify-between px-6 py-4 bg-black/60 border-b border-ui-border"
          >
            <div class="flex items-center gap-2">
              <button
                v-for="tab in ['typescript', 'python', 'curl'] as const"
                :key="tab"
                @click="activeTab = tab"
                :class="[
                  'px-3 py-1.5 rounded-md text-xs font-mono transition-all duration-200 capitalize',
                  activeTab === tab
                    ? 'bg-primary text-white font-bold shadow-lg shadow-primary/30'
                    : 'text-muted-text hover:text-main-text hover:bg-surface',
                ]"
              >
                {{ tab }}
              </button>
            </div>

            <button
              @click="copyCode"
              class="text-xs font-mono text-muted-text hover:text-main-text bg-surface hover:bg-ui-border/50 px-3 py-1.5 rounded-md border border-ui-border transition-colors flex items-center gap-1.5"
            >
              <span v-if="copied" class="text-green-400">✓ Copied</span>
              <span v-else>📋 Copy Code</span>
            </button>
          </div>

          <!-- Code View Area -->
          <div
            class="p-6 bg-black/80 font-mono text-xs md:text-sm text-gray-300 overflow-x-auto leading-relaxed"
          >
            <pre><code>{{ currentCode }}</code></pre>
          </div>

          <!-- Live Output Preview Bar -->
          <div
            class="px-6 py-3 bg-surface/80 border-t border-ui-border text-xs font-mono flex items-center justify-between text-muted-text"
          >
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>Response: 200 OK (38ms)</span>
            </div>
            <span class="text-primary-light">JSON Schema Validated</span>
          </div>
        </UiGlassCard>
      </div>

      <!-- API Endpoints Overview -->
      <div class="max-w-4xl mx-auto space-y-6">
        <h2 class="text-2xl font-bold text-main-text">Core REST Endpoints</h2>
        <div class="space-y-4">
          <UiGlassCard
            v-for="(ep, idx) in endpoints"
            :key="idx"
            class="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 border-ui-border/80"
          >
            <div class="flex items-center gap-3">
              <span
                class="px-2.5 py-1 rounded font-mono text-xs font-bold bg-primary/20 text-primary-light border border-primary/30"
              >
                {{ ep.method }}
              </span>
              <span class="font-mono text-sm text-main-text font-semibold">{{
                ep.path
              }}</span>
            </div>
            <p class="text-muted-text text-xs md:text-sm font-sans max-w-md">
              {{ ep.desc }}
            </p>
          </UiGlassCard>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
pre {
  white-space: pre-wrap;
  word-break: break-word;
}
</style>
