<script setup lang="ts">
defineProps(["error"]);
const emit = defineEmits(["clear"]);
</script>

<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen text-center p-6"
  >
    <h1 class="text-8xl font-bold text-primary">404</h1>
    <h2 class="text-2xl font-semibold mt-4">Node Not Found</h2>
    <p class="text-muted-text mt-2">There is not find the page!</p>
    <button
      @click="emit('clear')"
      class="mt-6 px-6 py-2 bg-primary text-white rounded-lg"
    >
      Return To Home Page
    </button>
  </div>
</template>
