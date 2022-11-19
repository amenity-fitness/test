<template>
<div>
  <transition name="fade">
    <div v-show="state" id="drawer-overlay" @click="handleClose" class="w-full h-full fixed bg-black/50 z-20"/>
  </transition>
  <transition
    enter-active-class="transition ease-in duration-450"
    leave-active-class="transition ease-out duration-400"
    enter-class="transform -translate-x-full"
    enter-to-class="transform translate-x-0"
    leave-class="transform translate-x-0"
    leave-to-class="transform -translate-x-full">
    <div v-show="state"
      id="drawer">
      <div class="relative h-full w-full flex flex-col justify-between">
        <div>
          <h3>Directory</h3>
          <button class="h-10 w-10 absolute -top-2 right-0 p-0" @click="$emit('close')">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="rotate-45 h-full w-full" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
            <!-- <img style="color: white" :src="require('assets/svg/plus.svg')" class="rotate-45 h-full w-full" alt=""> -->
          </button>
          <Drawer-Navigation class="pt-6" @close="$emit('close')" :route="route"/>
        </div>
        <footer>
          <div class="z-30 flex items-center w-full space-x-2">
            <nuxt-link to="/login" class="text-primary w-full">
              <button class="border shadow-md w-full">
                Login
              </button>
            </nuxt-link>
            <a href="/login?register=true" target="_blank" class="w-full text-primary">
              <button class="bg-green-500/50 w-full shadow-md">
                Sign Up
              </button>
            </a>
          </div>
        </footer>
      </div>
    </div>
  </transition>
</div>
</template>
<script>
export default {
  props: ['state', 'route'],
  methods: {
    handleClose(e) {
      const { id } = e.target
      id == 'drawer-overlay'
        ? this.$emit('close')
        : ''
    }
  },
  watch: {
    state(val) {
      if (!!val) {
        document.getElementById('drawer').click()
      }
    }
  }
}
</script>
<style >
#drawer {
  @apply p-4 rounded-r-xl max-w-xs sm:max-w-sm
  h-full fixed bg-foremost top-0 w-full left-0 z-30 shadow-xl
}

#drawer > section {
  @apply flex flex-col items-start py-2 space-y-3
}
</style>