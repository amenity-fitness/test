<template>
  <button
    :class="conditionalClass"
    :disabled="loading || disabled"
    @click="$emit('click')"
    :type="submit ? 'submit' : false">
    {{ text }}
    <div
      v-if="loading"
      class="absolute top-0 left-0 w-full h-full flex items-center justify-center">
      <span class="h-4 w-4">
        <svg viewBox="0 0 100 100">
          <circle cx="50%" cy="50%" r="50%" class="animate-dash" />
        </svg>
      </span>
    </div>
  </button>
</template>
<script>
export default {
  props: ['loading', 'text', 'disabled', 'minimal', 'submit'],
  computed: {
    conditionalClass() {
      const { loading, minimal } = this
      switch (true) {
        case loading && minimal:
          return 'loading'
        case minimal:
          return 'text-red-400'
        default:
          return 'bg-green-500/50'
      }
    }
  }
}
</script>
<style scoped>
button[disabled] {
  @apply bg-gray-500 text-gray-700 relative;
}
button[disabled].loading {
  @apply text-gray-500;
}
svg {
  @apply h-full w-full animate-spin;
  overflow: visible;
  transform-origin: center center;
}
circle {
  @apply fill-transparent stroke-white origin-center transition-all;
  stroke-width: 0.5rem;
  stroke-dasharray: 180, 20000;
  stroke-dashoffset: 0px;
  stroke-linecap: round;
}
</style>