<template>
  <div
    class="min-h-screen bg-bg-dark text-main-text flex flex-col font-sans selection:bg-primary/30 selection:text-white"
  >
    <LayoutsHeader />
    <slot />
    <LayoutsFooter />
  </div>
</template>
