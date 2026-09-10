<template>
  <button
    :class="[
      'inline-flex items-center justify-center font-semibold text-[15px] h-[52px] px-6 rounded-md transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none',
      variant === 'primary' ? 'bg-primary-gradient text-white hover:brightness-110 hover:-translate-y-[2px] shadow-lg shadow-primary/20' : '',
      variant === 'secondary' ? 'bg-transparent border border-ui-border text-mainText hover:bg-surface-light hover:border-white/20' : ''
    ]"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps({
  variant: {
    type: String as () => 'primary' | 'secondary',
    default: 'primary'
  }
})
</script>
