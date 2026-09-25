<script setup lang="ts">
useSeoMeta({
  title: "Privacy Policy | NEXORA.AI",
  description:
    "Privacy Policy and data governance framework for NEXORA AI autonomous infrastructure.",
});

const lastUpdated = "September 24, 2026";
</script>

<template>
  <div
    class="min-h-screen bg-[#070b14] text-white mt-10 py-16 px-6 relative overflow-hidden"
  >
    <!-- Ambient Background Glow -->
    <div
      class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-primary/10 blur-[120px] pointer-events-none -z-10"
    />

    <div class="max-w-4xl mx-auto space-y-10">
      <!-- Top Navigation / Breadcrumb -->
      <div
        class="flex items-center justify-between border-b border-white/10 pb-6"
      >
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-white transition-colors"
        >
          <span>←</span> Back to Home
        </NuxtLink>
        <span class="text-xs font-mono text-gray-500">
          LAST REVISION: {{ lastUpdated }}
        </span>
      </div>

      <!-- Page Header -->
      <div class="space-y-3">
        <span
          class="inline-block px-3 py-1 rounded-full text-xs font-mono font-semibold bg-primary/10 text-primary border border-primary/20"
        >
          LEGAL GOVERNANCE
        </span>
        <h1
          class="text-3xl md:text-4xl font-bold font-mono tracking-tight text-white"
        >
          Privacy Policy
        </h1>
        <p class="text-gray-400 text-sm leading-relaxed max-w-2xl">
          How NEXORA.AI processes, secures, and isolates enterprise telemetry
          and agent orchestration data across global nodes.
        </p>
      </div>

      <!-- Content Sections -->
      <div
        class="space-y-8 text-sm text-gray-300 leading-relaxed border-t border-white/10 pt-8"
      >
        <section class="space-y-3">
          <h2
            class="text-lg font-mono font-bold text-white flex items-center gap-2"
          >
            <span class="text-primary">01.</span> Data Isolation & Architecture
          </h2>
          <p>
            NEXORA.AI operates under a zero-retention capability framework for
            agent execution workloads. All data ingested during autonomous agent
            pipelines is processed in isolated ephemeral runtime environments
            and is never used to train global foundation models without explicit
            enterprise consent.
          </p>
        </section>

        <section class="space-y-3">
          <h2
            class="text-lg font-mono font-bold text-white flex items-center gap-2"
          >
            <span class="text-primary">02.</span> Information We Collect
          </h2>
          <p>
            We collect only the technical telemetry strictly necessary to
            maintain system stability and SLA performance:
          </p>
          <ul
            class="list-disc list-inside space-y-1.5 text-gray-400 pl-2 font-mono text-xs"
          >
            <li>Authentication metrics and API access tokens</li>
            <li>
              Node execution status and latency metrics (e.g., pipeline
              execution times)
            </li>
            <li>
              Error logs and stack traces generated during runtime agent
              workflows
            </li>
            <li>Billing metadata and enterprise account contact records</li>
          </ul>
        </section>

        <section class="space-y-3">
          <h2
            class="text-lg font-mono font-bold text-white flex items-center gap-2"
          >
            <span class="text-primary">03.</span> Security Standards &
            Encryption
          </h2>
          <p>
            All payload data in transit across our node infrastructure is
            encrypted using TLS 1.3 with AES-256 GCM encryption at rest.
            Enterprise infrastructure deployments offer dedicated KMS key
            management options for isolated data sovereignty.
          </p>
        </section>

        <section class="space-y-3">
          <h2
            class="text-lg font-mono font-bold text-white flex items-center gap-2"
          >
            <span class="text-primary">04.</span> Compliance & Third-Party
            Sharing
          </h2>
          <p>
            We do not sell, rent, or monetize your system metadata or agent
            logs. Information is only shared with essential infrastructure
            providers (such as cloud hardware centers and security auditors)
            under strict non-disclosure and SOC2 Type II compliance standards.
          </p>
        </section>

        <section class="space-y-3">
          <h2
            class="text-lg font-mono font-bold text-white flex items-center gap-2"
          >
            <span class="text-primary">05.</span> Contact Data Officer
          </h2>
          <p>
            For privacy audits, GDPR data subject requests, or security
            inquiries, contact our Data Security Team at:
          </p>
        </section>
      </div>
    </div>
  </div>
</template>
