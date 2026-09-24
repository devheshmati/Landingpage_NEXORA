<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps({
  error: Object as () => NuxtError,
});

const handleClearError = () => {
  clearError({ redirect: "/" });
};
</script>

<template>
  <div class="bg-[#090d16] min-h-screen text-white">
    <Error404
      v-if="props.error?.statusCode === 404"
      :error="props.error"
      @clear="handleClearError"
    />

    <Error500
      v-else-if="props.error?.statusCode === 500"
      :error="props.error"
      @clear="handleClearError"
    />

    <ErrorGeneric v-else :error="props.error" @clear="handleClearError" />
  </div>
</template>
