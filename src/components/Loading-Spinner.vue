<template>
  <svg id="spin-container" viewBox="0 0 100 100">
    <circle id="spin" cx="50%" cy="50%" r="50%" class="animate-dash" />
  </svg>
</template>
<style>
svg#spin-container {
  @apply h-full w-full animate-spin origin-center overflow-visible;
}
circle#spin {
  @apply fill-transparent stroke-white origin-center transition-all stroke-cyan-400;
  stroke-width: 8px;
  stroke-dasharray: 180, 20000;
  stroke-dashoffset: 0px;
  stroke-linecap: round;
}
</style>