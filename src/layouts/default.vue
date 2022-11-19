<template>
  <main>
    <Reload-Dialog/>
    <Drawer :route="$route.path" :state="drawerState" @close="drawerState = false"/>
    <Toolbar @toggleDrawer="drawerState = !drawerState" />
    <Snackbar/>
    <nuxt/>
  </main>
</template>
<script>
import { mapMutations, mapActions } from 'vuex'
export default {
  data: () => ({
    drawerState: false,
  }),
  created() {
    this.$nuxt.$on('success', ({ message }) => {
      const alt = 'Success'
      this.handleSuccess({
        message: message || alt
      })
    })
    this.$nuxt.$on('error', ({ message }) => {
      const alt = 'An Error has occoured'
      this.handleError({
        message: message || alt
      })
    })
  },
  mounted() {
    setTimeout(() => this.SNACKBAR_REMOVE, 3000)
  },
  methods: {
    ...mapActions(['handleSuccess', 'handleError']),
    ...mapMutations(['SNACKBAR_REMOVE']),
  }
}
</script>
<style scoped>
main {
  @apply flex flex-col min-h-screen
}
</style>
