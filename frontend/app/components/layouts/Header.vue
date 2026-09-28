<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";

const { openContactModal, isMobileMenuOpen, toggleMobileMenu } = useUI();
const route = useRoute();
const isHomePage = computed(() => route.path === "/");
const isScrolled = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

// nav links
const landingPageSectionLink = [
  { name: "Services", href: "#services" },
  { name: "Results", href: "#results" },
];

const mainPages = [
  { name: "About", path: "/about" },
  { name: "Docs", path: "/docs" },
];

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <header
    ref="navbarRef"
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
      isScrolled
        ? 'bg-surface/80 backdrop-blur-md border-ui-border py-4 shadow-lg shadow-black/40'
        : 'bg-transparent border-transparent py-6',
    ]"
  >
    <div class="container mx-auto px-6 flex items-center justify-between">
      <!-- Logo -->
      <NuxtLink
        to="/"
        class="text-2xl font-bold tracking-wider text-main-text flex items-center gap-1"
      >
        NEXORA<span class="text-accent">.</span>
      </NuxtLink>

      <!-- Desktop Navigation Links -->
      <nav
        class="hidden md:flex items-center gap-8 text-sm font-medium text-muted-text"
      >
        <a
          v-if="isHomePage"
          v-for="link in landingPageSectionLink"
          :href="link.href"
          class="hover:text-main-text transition-colors"
        >
          {{ link.name }}
        </a>

        <NuxtLink
          v-for="link in mainPages"
          :to="link.path"
          class="hover:text-main-text transition-colors"
        >
          {{ link.name }}
        </NuxtLink>
      </nav>

      <!-- Desktop CTA Button -->
      <div class="hidden md:block">
        <UiButton
          variant="primary"
          class="!h-10 !px-5 !text-sm"
          @click="openContactModal"
        >
          Let's Talk →
        </UiButton>
      </div>

      <!-- Meobile Menu Toggle Button -->
      <UiButton
        @click="toggleMobileMenu"
        class="md:hidden text-main-text p-2 focus:outline-none"
        aria-label="Toggle Navigation Menu"
      >
        <svg
          v-if="!isMobileMenuOpen"
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        <svg
          v-else
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </UiButton>
    </div>

    <!-- Mobile Navigation Overlay -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-x-4"
      enter-to-class="opacity-100 translate-x-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-x-0"
      leave-to-class="opacity-0 -translate-x-4"
    >
      <div
        v-if="isMobileMenuOpen"
        class="md:hidden fixed inset-x-0 top-[90px] bg-surface/95 backdrop-blur-xl border-b border-ui-border p-6 flex flex-col gap-6 shadow-2xl"
      >
        <nav class="flex flex-col gap-4 text-lg font-medium text-muted-text">
          <a
            v-if="isHomePage"
            v-for="link in landingPageSectionLink"
            :href="link.href"
            class="hover:text-main-text transition-colors"
            @click="isMobileMenuOpen = false"
          >
            {{ link.name }}
          </a>

          <NuxtLink
            v-for="link in mainPages"
            :to="link.path"
            class="hover:text-main-text transition-colors"
            @click="isMobileMenuOpen = false"
          >
            {{ link.name }}
          </NuxtLink>
        </nav>
        <div class="pt-4 border-t border-ui-border">
          <UiButton variant="primary" class="w-full" @click="openContactModal">
            Let's Talk →
          </UiButton>
        </div>
      </div>
    </Transition>
  </header>
</template>
