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
      return i % 2 == 0
        ? ''
        : ' sm:text-left flex-row-reverse sm:flex-row'
    }
  }
}
</script>
<style scoped>
p {
  @apply w-full
}
div {
  @apply p-3 space-x-3 grow rounded-lg shadow-md
  flex items-center bg-foremost
}
span {
  @apply p-2 w-11 md:w-12 aspect-square
  bg-primary rounded-full
  flex items-center
}
</style>