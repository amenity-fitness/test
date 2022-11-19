<template>
<main>
  <Snackbar/>
  <transition name="fade" appear mode="out-in">
    <div v-if="!toggleView" :key="0">
      <span class="space-x-2">
        <button :class="!toggleView ? 'bg-primary' : ''" @click="toggle" disabled>User</button>
        <button :class="toggleView ? 'bg-primary' : ''" @click="toggle">Profile</button>
      </span>
      <User :user="user"/>
      <footer>
        <Dialog
          component="Change-Password"
          :text="'Change Password'"
          :data="user"
          @confirm="changePassword({ ...$event, idToken })"
          />
        <Dialog
          component="Update-User"
          :text="'Update User'"
          :accent="true"
          :data="user"
          @confirm="updateProfile({ ...$event, idToken } )"
          />
      </footer>
    </div>
    <div v-else :key="1">
      <span class="space-x-2">
        <button :class="!toggleView ? 'bg-primary' : ''" @click="toggle">User</button>
        <button :class="toggleView ? 'bg-primary' : ''" @click="toggle" disabled>Profile</button>
      </span>
      <Profile v-bind="user"/>
      <footer>
        <Dialog
          component="Update-Profile"
          :text="'Update Profile'"
          :accent="true"
          :data="user.customAttributes"
          @confirm="updateClaims({
            claims: { 
              ...user.customAttributes,
              ...$event
            },
            idToken
          })"
        />
      </footer>
    </div>
  </transition>
</main>
</template>
<script>

import { mapState, mapActions } from 'vuex'
export default {
  layout: 'app',
  head: () => ({
    title: 'Settings'
  }),
  data: () => ({
    toggleView: false
  }),
  methods: {
    ...mapActions('auth', ['updateProfile', 'changePassword', 'updateClaims']),
    ...mapActions('db', ['dbWrite', 'dbRead']),
    toggle() {
      this.toggleView = !this.toggleView
    }
  },
  computed: {
    ...mapState('auth', ['user', 'auth']),
    idToken() {
      return this.auth['idToken']
    },
    defaultPhoto() {
      return require('~/assets/svg/user.svg')
    },
    userId () {
      return this.auth['userId']
    }
  },
}
</script>
<style scoped>
main {
  @apply h-full p-4
  flex items-center justify-center 
}

img {
  @apply mx-auto
}

main > div {
  @apply container mx-auto max-w-md
  p-4 space-y-2
  bg-foreground rounded-xl shadow-xl
}

footer {
  @apply flex justify-end space-x-2 pt-2
}
</style>
