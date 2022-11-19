<template>
  <div
    :class="benefits(data.i)">
    <span>
      <img :src="data.icon">
    </span>
    <p>
      {{ data.description }}
    </p>
  </div>
</template>
<script>
export default {
  props: ['data'],
  methods: {
    benefits(i) {
      const benefits = ''
      const features = 'text-right sm:text-left flex-row-reverse sm:flex-row'
      return i > 2 ? features : benefits
    }
  }
}
</script>
<style scoped>
p {
  @apply w-full mx-2
}
div {
  @apply py-2 grow
  flex items-center
}
span {
  @apply p-2 h-10 w-10 aspect-square
  bg-primary rounded-full
  flex items-center
}
</style>