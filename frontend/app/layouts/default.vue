<script setup lang="ts">
import { watch } from "vue";

const route = useRoute();

const isContactModalOpen = useState("contactModal", () => false);
const isMobileNavOpen = useState("mobileNav", () => false);
</script>

<template>
  <div
    class="min-h-screen bg-bg-dark text-main-text flex flex-col font-sans selection:bg-primary/30 selection:text-white"
  >
    <LayoutsHeader />
    <slot />
    <LayoutsFooter />

    <!-- contact modal is access in hole sections -->
    <ContactModal />
  </div>
</template>
