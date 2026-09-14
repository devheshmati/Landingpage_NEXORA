<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from "vue";

interface NodeDetail {
  label: string;
  desc: string;
  payload?: string;
  model?: string;
  action?: string;
  status?: string;
}

interface Scenario {
  id: string;
  title: string;
  icon: string;
  latency: number;
  nodes: {
    trigger: NodeDetail;
    agent: NodeDetail;
    tools: NodeDetail;
    output: NodeDetail;
  };
}

const scenarios: Scenario[] = [
  {
    id: "support",
    title: "Support Escalation",
    icon: "💬",
    latency: 142,
    nodes: {
      trigger: {
        label: "Inbound Ticket",
        desc: "Customer submits urgent SLA request via Webhook.",
        payload: "ticket_id: #9402",
      },
      agent: {
        label: "Sentiment & Context",
        desc: "Evaluates priority, context history, and SLA level.",
        model: "Claude 3.5 Sonnet",
      },
      tools: {
        label: "Zendesk & Slack API",
        desc: "Fetches user subscription plan and opens emergency bridge.",
        action: "api.sync_context()",
      },
      output: {
        label: "Routed to Tier-3",
        desc: "Ticket updated, engineer notified on Slack channel.",
        status: "200 OK (Executed)",
      },
    },
  },
  {
    id: "security",
    title: "Security Threat Mitigation",
    icon: "🛡️",
    latency: 48,
    nodes: {
      trigger: {
        label: "Anomaly Detector",
        desc: "Multiple failed SSH attempts detected on server node.",
        payload: "ip: 192.168.1.104",
      },
      agent: {
        label: "Threat Analysis Engine",
        desc: "Correlates IP behavior against global threat intelligence.",
        model: "Nexora Core Guard",
      },
      tools: {
        label: "UFW / IPTables Router",
        desc: "Executes automated firewall drop rule on cluster.",
        action: "iptables.block_ip()",
      },
      output: {
        label: "IP Isolated",
        desc: "Attacker blocked, incident report logged in database.",
        status: "Blocked in 48ms",
      },
    },
  },
  {
    id: "leads",
    title: "Automated Lead Qualification",
    icon: "🎯",
    latency: 95,
    nodes: {
      trigger: {
        label: "Form Submission",
        desc: "High-intent enterprise visitor requests API demo.",
        payload: "company_size: 500+",
      },
      agent: {
        label: "ICP Scoring Agent",
        desc: "Scores lead potential based on domain enrichment data.",
        model: "GPT-4o Enterprise",
      },
      tools: {
        label: "HubSpot & Calendly",
        desc: "Auto-enriches CRM records and generates priority booking link.",
        action: "crm.enrich_lead()",
      },
      output: {
        label: "Sales Notification",
        desc: "Account Rep assigned, automated personalized invite sent.",
        status: "Enriched & Synced",
      },
    },
  },
];

const activeScenarioId = ref("support");
const sectionRef = ref<HTMLElement | null>(null);
const nodesGridRef = ref<HTMLElement | null>(null);

let ctx: any = null;
const { $gsap } = useNuxtApp();

const currentScenario = computed(() => {
  return scenarios.find((s) => s.id === activeScenarioId.value) || scenarios[0];
});

// GSAP Pulse Animation for Switch Transitions
const animateNodes = () => {
  if (!nodesGridRef.value || !$gsap) return;
  const cards = Array.from(nodesGridRef.value.children);

  $gsap.set(cards, {
    scale: 0.9,
    opacity: 0.4,
  });

  $gsap.to(cards, {
    scale: 1,
    opacity: 1,
    duration: 0.4,
    stagger: 0.08,
    ease: "power2.out",
  });
};

const selectScenario = async (id: string) => {
  activeScenarioId.value = id;
  await nextTick();
  animateNodes();
};

onMounted(() => {
  if (!sectionRef.value || !$gsap) return;

  ctx = $gsap.context(() => {
    const cards = Array.from(nodesGridRef.value.children);

    $gsap.set(cards, { opacity: 0, y: 100 });

    $gsap.to(cards, {
      scrollTrigger: {
        trigger: nodesGridRef.value,
        start: "top 80%",
        toggleActions: "play none reverse reverse",
      },
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: "power3.out",
    });
  }, nodesGridRef.value);
});

onUnmounted(() => {
  ctx?.revert();
});
</script>

<template>
  <section
    ref="sectionRef"
    class="py-section relative overflow-hidden bg-black/40 border-y border-ui-border/40"
  >
    <!-- Ambient Background Glow -->
    <div
      class="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[300px] bg-accent/10 rounded-full blur-[150px] pointer-events-none"
    />

    <div class="container mx-auto px-6 relative z-10">
      <!-- Section Header -->
      <div class="max-w-2xl mb-12 space-y-4">
        <UiBadge>Interactive Visualizer</UiBadge>
        <h2
          class="text-3xl md:text-5xl font-bold tracking-tight text-main-text"
        >
          Experience real-time AI node routing.
        </h2>
        <p class="text-muted-text text-base leading-relaxed">
          Select an enterprise use-case to simulate how autonomous triggers
          process events across distributed nodes.
        </p>
      </div>

      <!-- Use-Case Selector Tabs -->
      <div class="flex flex-wrap gap-3 mb-8">
        <button
          v-for="scenario in scenarios"
          :key="scenario.id"
          @click="selectScenario(scenario.id)"
          :class="[
            'px-4 py-2 rounded-lg text-sm font-mono transition-all duration-300 flex items-center gap-2 border',
            activeScenarioId === scenario.id
              ? 'bg-primary/20 border-primary text-main-text shadow-[0_0_15px_rgba(99,102,241,0.3)]'
              : 'bg-surface/60 border-ui-border text-muted-text hover:border-ui-border/80 hover:text-main-text',
          ]"
        >
          <span>{{ scenario.icon }}</span>
          <span>{{ scenario.title }}</span>
        </button>
      </div>

      <!-- Pipeline Visualization Canvas -->
      <UiGlassCard
        class="p-6 md:p-10 border-ui-border/80 relative overflow-hidden"
      >
        <!-- Execution Status Bar -->
        <div
          class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-ui-border/60 font-mono text-xs"
        >
          <div class="flex items-center gap-3">
            <span class="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
            <span class="text-main-text font-bold uppercase"
              >Pipeline State: Active</span
            >
            <span class="text-muted-text"
              >| Scenario: {{ currentScenario.title }}</span
            >
          </div>
          <div class="text-primary-light">
            Latency:
            <span class="font-bold">{{ currentScenario.latency }}ms</span>
          </div>
        </div>

        <!-- Node Flow Canvas Grid -->
        <div
          ref="nodesGridRef"
          class="grid grid-cols-1 md:grid-cols-4 gap-6 relative"
        >
          <!-- Node 1: Event Trigger -->
          <div
            class="node-card p-5 rounded-xl border border-ui-border bg-black/40 space-y-3 relative overflow-hidden"
          >
            <div
              class="flex items-center justify-between text-xs font-mono text-muted-text"
            >
              <span>NODE 01</span>
              <span class="text-primary-light">TRIGGER</span>
            </div>
            <div
              class="text-lg font-bold text-main-text flex items-center gap-2"
            >
              <span>⚡</span> {{ currentScenario.nodes.trigger.label }}
            </div>
            <p class="text-xs text-muted-text leading-relaxed">
              {{ currentScenario.nodes.trigger.desc }}
            </p>
            <div class="pt-2 font-mono text-[11px] text-primary-light">
              Payload: {{ currentScenario.nodes.trigger.payload }}
            </div>
          </div>

          <!-- Node 2: AI Reasoning Agent -->
          <div
            class="node-card p-5 rounded-xl border border-accent/40 bg-accent/5 space-y-3 relative overflow-hidden"
          >
            <div
              class="flex items-center justify-between text-xs font-mono text-accent"
            >
              <span>NODE 02</span>
              <span>AGENT</span>
            </div>
            <div
              class="text-lg font-bold text-main-text flex items-center gap-2"
            >
              <span>🧠</span> {{ currentScenario.nodes.agent.label }}
            </div>
            <p class="text-xs text-muted-text leading-relaxed">
              {{ currentScenario.nodes.agent.desc }}
            </p>
            <div class="pt-2 font-mono text-[11px] text-accent">
              Model: {{ currentScenario.nodes.agent.model }}
            </div>
          </div>

          <!-- Node 3: Tools & Integration -->
          <div
            class="node-card p-5 rounded-xl border border-ui-border bg-black/40 space-y-3 relative overflow-hidden"
          >
            <div
              class="flex items-center justify-between text-xs font-mono text-muted-text"
            >
              <span>NODE 03</span>
              <span class="text-primary-light">TOOLS</span>
            </div>
            <div
              class="text-lg font-bold text-main-text flex items-center gap-2"
            >
              <span>🛠️</span> {{ currentScenario.nodes.tools.label }}
            </div>
            <p class="text-xs text-muted-text leading-relaxed">
              {{ currentScenario.nodes.tools.desc }}
            </p>
            <div class="pt-2 font-mono text-[11px] text-primary-light">
              Action: {{ currentScenario.nodes.tools.action }}
            </div>
          </div>

          <!-- Node 4: Final Action Output -->
          <div
            class="node-card p-5 rounded-xl border border-green-500/40 bg-green-500/5 space-y-3 relative overflow-hidden"
          >
            <div
              class="flex items-center justify-between text-xs font-mono text-green-400"
            >
              <span>NODE 04</span>
              <span>OUTPUT</span>
            </div>
            <div
              class="text-lg font-bold text-main-text flex items-center gap-2"
            >
              <span>🎯</span> {{ currentScenario.nodes.output.label }}
            </div>
            <p class="text-xs text-muted-text leading-relaxed">
              {{ currentScenario.nodes.output.desc }}
            </p>
            <div class="pt-2 font-mono text-[11px] text-green-400">
              Status: {{ currentScenario.nodes.output.status }}
            </div>
          </div>
        </div>
      </UiGlassCard>
    </div>
  </section>
</template>
