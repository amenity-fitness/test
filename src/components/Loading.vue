<template>
  <div v-if="loading" class="overflow-hidden bg-black/25">
    <span>
      <svg viewBox="0 0 100 100">
        <circle cx="50%" cy="50%" r="50%"/>
      </svg>
    </span>
  </div>
</template>
<script>
export default {
  data: () => ({
    loading: false
  }),
  methods: {
    start() {
      setTimeout(() => this.loading = true, 200)
    },
    finish() {
      setTimeout(() => this.loading = false, 200)
    }
  }
}
</script>
<style scoped>
  @keyframes progress-circular-dash {
    0% {
      stroke-dasharray: 10, 20000;
      stroke-dashoffset: 0px;
    }
    50% {
      stroke-dasharray: 300, 20000;
      stroke-dashoffset: -15px;
    }
    100% {
      stroke-dasharray: 300, 20000;
      stroke-dashoffset: -300px;
    }
  }
  @keyframes progress-circular-rotate {
    0% {
      transform: rotate(0)
    }
    100% {
      transform: rotate(360deg)
    }
  }
  div {
    @apply h-screen fixed w-screen
    flex justify-center items-center
  }
  span {
    @apply h-12 w-12
  }
  svg {
    @apply h-full w-full;
    overflow: visible;
    animation: progress-circular-rotate 1.4s linear infinite;
    transform-origin: center center;
  }
  circle {
    fill: transparent;
    stroke: #F44336;
    stroke-width: 0.5em;
    transform-origin: center center;
    animation: progress-circular-dash 1.4s ease-in-out infinite;
    stroke-dasharray: 180, 20000;
    stroke-dashoffset: 0px;
    stroke-linecap: round;
    transition: all .6s ease-in-out;
  }
</style>