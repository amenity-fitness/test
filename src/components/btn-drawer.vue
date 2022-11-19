<template lang="pug">
button(type="button")
  span(class="sr-only")
    | Open main menu
  div(
    class="w-8"
    @click="$emit('toggle')" :class="state ? 'hidden' : 'block'")
    img(:src="require('~/assets/svg/3-bars.svg')")
  div(
    class="w-8"
    @click="$emit('toggle')" :class="state ? 'block' : 'hidden'")
    img(:src="require('~/assets/svg/3-bars.svg')")
</template>
<script>
export default {
  props: ['state']
}
</script>
<style scoped>
button {
  @apply absolute inset-y-0 left-0 flex items-center px-4
}
</style>