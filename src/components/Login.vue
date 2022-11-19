<template>
<form
  class="auth"
  @submit.prevent="$emit('submit', { email, password })">
  <h1 class="underline">Log in</h1>
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
  <div class="text-center">
    <button @click.prevent="$emit('forgot')">
      <a class="italic">Forgot your password?</a>
    </button>
  </div>
  <footer>
    <button @click.prevent="$emit('toggle')">Sign Up</button>
    <Button-Action :submit="true" :loading="loading" :text="'Log In'"/>
  </footer>
</form>
</template>
<script>
export default {
  props: ['inputs', 'loading'],
  data: () => ({
    email: '',
    password: ''
  }),
  methods: {
    clear(i) {
      this.inputs[i].error = false
    },
    error(i) {
      this.inputs[i].error = true
    },
  }
}
</script>