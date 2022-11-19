<template>
  <main>
    <!-- <Reload-Dialog/> -->
    <Drawer :route="$route.path" class="lg:hidden" :state="drawerState" @close="drawerState = false"/>
    <Snackbar/>
    <!-- <div :class="drawerState ? 'blur-md' : ''" class="transition"> -->
    <div>
      <Toolbar ref="toolbar" :app="true" @toggleDrawer="drawerState = !drawerState" @signOut="signOut"/>
      <div @click="handle" class="lg:hidden">
        <nuxt class="grow"/>
      </div>
      <div class="hidden lg:flex">
        <Drawer :class="drawerState ? 'basis-80' : 'basis-0'" class="transition-all hidden lg:block" :state="drawerState" @close="drawerState = false"/>
        <nuxt class="grow"/>
      </div>
    </div>
  </main>
</template>
<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'
export default {
  middleware: ['protected'],
  mounted() {
    setTimeout(() => this.SNACKBAR_REMOVE, 3000)
    setInterval(() => {
      this.now = new Date().getTime() / 1000
      if (!this.validToken) {
        const { refresh_token } = window.localStorage
        const redirect = this.$route.path
        this.refreshToken({ refresh_token, redirect })
        // this.redirect('/login?status=error&message=token_expired')
      }
    }, 60 * 1000)
  },
  data: () => ({
    drawerState: false,
    now: new Date().getTime() / 1000
  }),
  methods: {
    ...mapActions('auth', ['signOut', 'refreshToken']),
    ...mapMutations(['SNACKBAR_REMOVE']),
    handle() {
      const { drawerState } = this
      const { profileState, toggleProfile } = this.$refs.toolbar
      if (profileState) {
        toggleProfile()
      }
      if (drawerState) {
        this.drawerState = false
      }
    }
  },
  computed: {
    ...mapGetters('auth', ['lastRefresh']),
    validToken() {
      let time = new Date(this.lastRefresh).getTime() / 1000
      const exp = time += 3600
      return exp > this.now
    }
  }
}
</script>
<style scoped>
main {
  @apply flex flex-col md:h-screen
}
main > button {
  @apply p-4 absolute left-0 top-12
}
</style>
