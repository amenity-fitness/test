<template>
<main>
  <div>
    <form @submit.prevent="setPassword">
      <h1>Reset password for {{ email || 'Amenity Fitness' }}</h1>
      <div>
        <Floating-Input
          v-for="(input, i) in inputs"
          v-model="$data[input.id]"
          @clear="clear"
          @error="error"
          :data="input"
          :i="i"
          :key="i" />
      </div>
      <footer>
        <Button-Action :submit="true" :loading="loading" :text="'Reset'"/>
        <!-- <input type="submit"/> -->
      </footer>
    </form>
  </div>
</main>
</template>
<script>
import { mapActions } from 'vuex' 
export default {
  layout: 'login',
  head: () => ({
    title: 'Reset Password'
  }),
  async asyncData({query, store, redirect}) {
    try {
      const { oobCode, apiKey, email } = await store
        .dispatch('auth/confirmResetCode', query)
      return { oobCode, apiKey, email }
    } catch (err) {
      redirect('/login?&redirect=/&status=error&message=invalid-token')
    }
  },
  data: () => ({
    loading: false,
    email: null,
    newPassword: '',
    inputs: [
      {
        id: 'newPassword',
        label: 'New Password',
        error: false,
        password: true
      },
    ]
  }),
  methods: {
    ...mapActions(['handleSuccess', 'handleError']),
    ...mapActions('auth', ['updatePassword']),
    async setPassword() {
      try {
        this.loading = true
        const { newPassword, oobCode, apiKey, email } = this
        await this.updatePassword({ newPassword, oobCode, apiKey, email })
        this.loading = false
      } catch (err) {
        const { data } = err.response,
        { error } = data
        this.handleError(error)
        setTimeout(() => this.loading = false, 2000)
      }
    },
    clear(i) {
      this.inputs[i].error = false
    },
    error(i) {
      this.inputs[i].error = true
    },
  }
}
</script>
<style scoped>

main {
  @apply flex flex-col w-full p-2
}

main > div {
  @apply container mx-auto max-w-md w-full
  p-4 bg-foreground rounded-xl shadow-xl
}

form {
  @apply space-y-4
}

section {
  @apply flex justify-end
}

span {
  @apply space-x-2
}
</style>
