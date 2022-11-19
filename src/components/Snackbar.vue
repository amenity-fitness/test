<template>
  <section>
    <transition name="fade">
      <aside :class="selectColor(snackbar.err)" v-show="snackbar.state">
        <span>
          {{ snackbar.message }}
        </span>
        <div v-if="snackbar.deleteAccount">
          <button @click="SNACKBAR_REMOVE">Cancel</button>
          <button
            class="border"
            @click="deleteAccount({ idToken })">Confirm</button>
        </div>
      </aside>
    </transition>
  </section>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState('auth', ['auth']),
    ...mapState(['snackbar']),
    idToken () {
      return this.auth.idToken
    }
  },
  methods: {
    ...mapMutations(['SNACKBAR_REMOVE']),
    ...mapActions(['deleteAccount']),
    selectColor(err) {
      return err ? 'bg-red-700' : 'bg-green-700'
    }
  }
}
</script>

<style scoped>
aside {
  @apply p-1 flex items-center flex-wrap rounded justify-center sm:space-y-2 space-y-0
}
div {
  @apply h-full font-bold flex items-center space-x-1 px-2
}

button {
  @apply font-bold
}

aside > span {
  @apply text-lg flex items-center justify-center text-center w-full h-16 text-white p-2
}
section {
  @apply fixed w-full bottom-0 left-0 z-50 p-2
}
</style>