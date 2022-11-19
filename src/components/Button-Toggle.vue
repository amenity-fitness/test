<template>
<section class="toggle-container">
  <div
    class="toggle-btn"
    :class="conditionalColor"
    @click="updateValue">
    <label
      for="toggle"
      :class="modifiedSwitch"/>
    <input
      type="checkbox"
      name="toggle"
      :value="conditionalValue">
  </div>
  <p>
    {{ value | toUppercase }}
  </p>
</section>
</template>
<script>
export default {
  props: ['value', 'optA', 'optB'],
  data: () => ({
    modified: null
  }),
  methods: {
    reset() {
      this.modified = null
    },
    updateValue(e) {
      // const { id } = e.target
      const { modified, value } = this
      if ( modified == null || modified == true ) {
        // this.$emit('input', { id, value: !value })
        this.$emit('input', value)
        this.modified = !value
      } else {
        // this.$emit('input', { id, value: !modified })
        this.$emit('input', value)
        this.modified = !this.modified
      }
    }
  },
  computed: {
    metric() {
      // return this.conditionalValue ? 'Metric' : 'Imperial'
      return this.conditionalValue ? this.optA : this.optB
    },
    conditionalColor() {
      const { modified, value } = this
      if ( modified == null ) {
        return value ? 'bg-green-400' : 'bg-blue-400'
      } else {
        return modified ? 'bg-green-400' : 'bg-blue-400'
      }
    },
    conditionalValue() {
      const { modified, value } = this
      if ( modified == null ) {
        return value
      } else {
        return modified
      }
    },
    modifiedSwitch() {
      const { modified, value } = this
      if ( modified == null ) {
        return value ? 'translate-x-full border-green-400' : 'translate-x-0 border-blue-400'
      } else {
        return modified ? 'translate-x-full border-green-400' : 'translate-x-0 border-blue-400'
      }
    }
  },
  filters: {
    toUppercase(val) {
      if (val) {
        return val
          .charAt(0)
          .toUpperCase()
          +
          val
            .slice(1)
      }
    }
  }
}
</script>
<style>
.toggle-container {
  @apply flex items-center space-x-2 space-y-0
}
.toggle-btn {
  @apply relative rounded-full
  w-12 h-6 cursor-pointer 
  transition duration-200 ease-linear
}
.toggle-btn > label {
  @apply absolute left-0 
  bg-foreground border-2
  mb-2 w-6 h-6 rounded-full
  transition transform duration-100 ease-linear
}
.toggle-btn > input {
  @apply appearance-none w-full h-full active:outline-none focus:outline-none
}
</style>