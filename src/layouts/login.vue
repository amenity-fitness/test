<template>
  <main>
    <Snackbar/>
    <Reload-Dialog/>
    <nuxt/>
  </main>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  mounted() {
    setTimeout(() => this.SNACKBAR_REMOVE, 3000)
  },
  computed: {
    ...mapMutations(['SNACKBAR_REMOVE'])
  }
}
</script>
<style scoped>
main {
  @apply min-h-screen flex items-center justify-center p-2
}
</style>