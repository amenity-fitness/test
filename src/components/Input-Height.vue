<template>
  <div>
    <input
      id="height"
      :value="value"
      placeholder=" "
      type="number"
      @input="updateValue">
    <label for="height">Height {{ metric ? '(cm)' : '(inches)'}}</label>
  </div>
</template>
<script>
export default {
  props: ['value', 'metric'],
  methods: {
    updateValue(e) {
      const { id, value } = e.target
      this.modified = value
      this.$emit('input', { id, value })
    }
  }
}
</script>
<style scoped>
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
</style>