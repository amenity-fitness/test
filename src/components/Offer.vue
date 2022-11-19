<template>
<li>
  <strong>{{ data.name }}</strong> <br>
  {{ data.duration }} <br>
  {{ data.price }}
</li>
</template>
<script>
export default {
  props: ['data']
}
</script>
<style scoped>
li {
  @apply text-center text-sm px-2
}
</style>