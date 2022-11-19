<template>
<div>
  <form
    class="auth"
    @submit.prevent="submit">
    <h1 class="underline">Sign Up</h1>
    <div>
      <Floating-Input
        v-model="name"
        :data="{
          id: 'name',
          label: 'First Name',
          email: false,
          error: false }"
        />
      <div
        v-for="(input, i) in inputs"
        :key="i">
        <Floating-Input
          v-model="$data[input.id]"
          @clear="clear"
          @error="error"
          :data="input"
          :i="i" />
      </div>
    </div>
    <div>
      <p class="privacy">
        By creating an account you acknowledge and consent to our 
        <nuxt-link class="text-base" to="/privacy-policy" target="_blank">
          Privacy Policy
        </nuxt-link> and
        <nuxt-link class="text-base" to="/terms-of-service" target="_blank">
          Terms of Service
        </nuxt-link>
      </p>
    </div>
    <footer>
      <Button-Action :submit="true" :text="'Create Account'"/>
    </footer>
  </form>
  <div class="pt-4">
    <p class="text-center">
      Have an account?
      <button class="border ml-2 py-2" @click.prevent="$emit('toggle')">
        <a class="text-inherit">Log In</a>
      </button>
    </p>
  </div>
</div>
</template>
<script> 
export default {
  props: ['inputs'],
  data: () => ({
    email: '',
    password: '',
    name: ''
  }),
  methods: {
    clear(i) {
      this.inputs[i].error = false
    },
    error(i) {
      this.inputs[i].error = true
    },
    submit() {
      this.loading = true
      const { email, password, name } = this
      this.$emit('submit', { email, password, name })
      this.loading = false
    }
  }
}
</script>
<style scoped>
.privacy {
  @apply text-sm px-5 italic text-center
}
.logo {
  @apply h-12 flex justify-center
}
</style>