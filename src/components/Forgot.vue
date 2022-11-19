<template>
<form
  class="auth"
  @submit.prevent="$emit('submit', { email })">
  <div>
    <h1>Password Reset</h1>
    <Floating-Input
      v-for="(input, i) in inputs"
      v-model="email"
      @clear="clear"
      @error="error"
      :data="input"
      :key="i"
      :i="i" />
  </div>
  <footer>
    <button @click.stop.prevent="$emit('return')">Return</button>
    <Button-Action :submit="true" :loading="loading" :text="'Reset'"/>
  </footer>
</form>
</template>
<script>
export default {
  props: ['loading'],
  data: () => ({
    email: '',
    inputs: [
      {
        id: 'email',
        label: 'Email',
        error: false,
        email: true
      }
    ]
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