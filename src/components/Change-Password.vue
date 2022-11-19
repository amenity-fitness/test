<template>
  <section>
    <h1>Update Password</h1>
    <div>
      <input
        ref="email"
        id="password"
        placeholder=" "
        :type="!viewPassword ? 'password' : 'text'"
        @input="updateValue($event)">
      <label for="password">New Password</label>
      <span>
        <Password-Toggle 
          v-model="viewPassword"/>
      </span>
    </div>
  </section>
</template>
<script>
export default {
  data: () => ({
    viewPassword: false
  }),
  methods: {
    updateValue(e) {
      const { value, id } = e.target
      this.$emit('input', { id, value })
    },
    clear() {
      this.$refs.email.value = ''
    }
  }
}
</script>
<style scoped>
section {
  @apply pb-2
}
input:not(:placeholder-shown) ~ label,
input:focus-within ~ label {
  @apply transform scale-75 -translate-y-5 left-0
}

input, textarea {
  @apply rounded-none
}
div {
  @apply w-full relative mt-6 pb-2
}

input, textarea {
  @apply block w-full
  appearance-none border-b bg-transparent
  focus:outline-none
}
label {
  @apply absolute top-0 left-1 duration-300 origin-top-left font-medium
}
span {
  @apply absolute right-1 top-0 
}
</style>