<template>
<div >
  <select
    :id="id"
    v-if="object"
    @change="updateValue">
    <option
      :selected="!value"
      :value="null" />
    <!-- <option
      :selected="!value"
      disabled
      value=" " /> -->
      <!-- :selected="value ? opt.name ? `${opt.name.toLowerCase() == value.toLowerCase()}` : `${opt.toLowerCase() == value.toLowerCase()}` : null" -->
    <option
      :selected="value ? opt.id.toLowerCase() == value.toLowerCase() : null"
      v-for="(opt, i) in options"
      :key="i">
      {{ opt.name | cap }}
    </option>
  </select >
  <select
    :id="id"
    v-else
    @change="updateValue">
    <option
      :selected="!value"
      :value="null" />
    <!-- <option
      :selected="!value"
      disabled
      value=" " /> -->
      <!-- :selected="value ? opt.name ? `${opt.name.toLowerCase() == value.toLowerCase()}` : `${opt.toLowerCase() == value.toLowerCase()}` : null" -->
    <option
      :selected="value ? opt.toLowerCase() == value.toLowerCase() : null"
      v-for="(opt, i) in options"
      :key="i">
      {{ opt | cap }}
    </option>
  </select >
  <label :for="id" class="floating-label" :class="value || modified ? 'label-active' : ''">
    {{ label }}
  </label>
</div>

</template>
<script>
export default {
  props: ['value', 'options', 'label', 'object', 'id'],
  data: () => ({
    modified: null
  }),
  methods: {
    updateValue(e) {
      let { value } = e.target
      if (this.object) {
        const id = this.options.filter(opt => opt.name == value)[0].id
        this.$emit('input', { value, id })
      } else {
        this.$emit('input', { value})
      }
      this.modified = value
    }
  },
  filters: {
    cap(val) {
      if (!val) {
        return
      }
      const res = []
      val.split(' ')
        .forEach(v => res.push(v.charAt(0).toUpperCase() + v.substr(1)))
      return res.join(' ')
    }
  }
}
</script>
<style scoped>
select {
  @apply w-full border-0 p-0 focus:outline-none border-0 pl-1 rounded-none bg-transparent dark:text-white;
  -webkit-appearance: none;
}

div {
  @apply w-full relative mt-6
}

select {
  @apply block w-full
  appearance-none border-b bg-transparent
  focus:outline-none
}

select {
  @apply w-full bg-none p-0 focus:outline-none rounded-none;
  -webkit-appearance: none;
}

label {
  @apply absolute top-0 left-1 duration-300 origin-top-left font-medium
}

.label-active,
select:focus-within ~ label {
  @apply transform scale-75 -translate-y-5 left-0
}

option { 
  @apply bg-foreground
}

</style>