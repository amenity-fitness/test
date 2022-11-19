<template>
<div id="toolbar">
  <header ref="header">
    <div v-if="calendar">
      <img :src="require('~/assets/svg/chevron-left.svg')" class="h-6 w-6" @click="CALENDAR_SET(false)">
    </div>
    <div v-else-if="defaultLayout" class="absolute z-30 h-full -m-2 left-6 flex items-center">
      <span>
        <span class="sr-only">
          Open main menu
        </span>
        <div class="cursor-pointer flex items-center" :class="drawerState ? 'hidden' : 'block'">
          <button class="p-0 w-6 m-0 h-full" @click="$emit('toggleDrawer')">
            <img class="h-full" :src="require('~/assets/svg/3-bars.svg')"/>
          </button>
        </div>
      </span> 
    </div>
    <span v-if="!app" class="w-full flex justify-center">
      <nuxt-link to="/">
        <Logo class="px-4"/>
      </nuxt-link>
    </span>
    <nuxt-link v-else to="/app" class="mx-auto">
      <Logo/>
    </nuxt-link>
    
    <div v-if="app" class="absolute right-4 grow flex flex-row-reverse">
      <span @click="toggleProfile">
        <span class="sr-only">
          | Open user menu
        </span>
        <div class="h-full w-10">
          <img :src="require('~/assets/svg/profile.svg')" alt="">
        </div>
        <div class="relative">
          <menu v-if="profileState">
            <nuxt-link v-if="$route.path !== '/settings'" to="/settings">
              <div class="menu-item" role="menuitem">Settings</div>
            </nuxt-link>
            <div @click="$emit('signOut')" class="menu-item" role="menuitem">Sign Out</div>
          </menu>
        </div>
      </span>
      <!-- <btn-profile ref="profile" @toggle="toggleProfile" :state="profileState"/> -->
      <!-- <button @click="$emit('signOut')">Sign Out</button> -->
    </div>
  </header>
  <ul v-if="calendar">
    <p v-for="(day, i) in abrWeekdays" :key="i">{{ day }}</p>
  </ul>
</div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
export default {
  props: ['app'],
  data: () => ({
    drawerState: false,
    profileState: false,
    abrWeekdays: [
      'Su',
      'Mo',
      'Tu',
      'We',
      'Th',
      'Fr',
      'Sa'
    ],
  }),
  mounted() {
    if (this.app || window.scrollY !== 0) {
      const header = this.$refs.header
      header.classList.add('active')
    }
    window.onscroll = (e) => this.handleScroll()
  },
  computed: {
    ...mapState(['calendar']),
    defaultLayout() {
      const { layoutName } = this.$nuxt
      return layoutName == 'default' ? true : false
    }
  },
  methods: {
    ...mapMutations(['CALENDAR_SET']),
    async logOut() {
      this.authLogOut()
    },
    handleScroll() {
      const { app } = this
      const header = this.$refs.header
      const scrollY = window.scrollY
      if (scrollY <= 0 && !app) {
        header.classList.remove('active')
      } else {
        header.classList.add('active') 
      }
    },
    toggleProfile() {
      this.profileState = !this.profileState
    }
  }
}
</script>
<style scoped>
  a {
    @apply font-normal
  }
  menu {
    @apply absolute top-0 right-0 w-48 p-1 bg-white rounded shadow z-30
    dark:bg-gray-700
  }
  .menu-item {
    @apply block px-4 py-2 text-sm hover:bg-gray-100
    dark:text-gray-200 dark:hover:bg-gray-600
  }
  .active {
    @apply shadow-xl bg-cyan-600/50 transition-colors duration-500 backdrop-filter backdrop-blur-md
  }
/* 
  button {
    @apply absolute inset-y-0 right-0 flex items-center px-4 self-end
  } */
  div#toolbar {
    @apply w-full sticky top-0 z-10
  }
  header {
    @apply h-14 flex justify-between py-2 px-4
  }
  ul {
    @apply py-1
    flex flex-wrap bg-gray-900/50 backdrop-filter backdrop-blur-md
  }
  ul > p {
    @apply grow text-center
  }

</style>