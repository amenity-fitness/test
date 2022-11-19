<template>
  <section>
    <h1>Update Profile</h1>
    <span class="absolute -top-2 right-0">
      <Button-Toggle :value="metric" @input="updateValue"/>
    </span>
    <!-- <p v-if="admin">You're an admin</p> -->
    <div class="grid gap-2 grid-cols-2">
      <Input-Height :metric="conditionalValue" :value="height" @input="$emit('input', { ...$event })"/>
      <Input-Weight :metric="conditionalValue" :value="weight" @input="$emit('input', { ...$event })"/>
      <Select-DOB :value="birthDate" @input="$emit('input', { ...$event })"/>
      <Select-Gender :value="gender" @input="$emit('input', { ...$event })"/>
    </div>
  </section>
</template>
<script>
export default {
  props: ['admin', 'height', 'weight', 'birthDate', 'gender', 'metric'],
  data: () => ({
    modified: null
  }),
  methods: {
    updateValue(event) {
      const { id, value } = event
      this.$emit('input', { id, value })
      if ( id == 'metric' ) {
        this.modified = value
      }
    },
    clear() {}
  },
  computed: {
    conditionalValue () {
      if ( this.modified == null ) {
        return this.metric
      } else {
        return this.modified       
      }
    }
  }
}
</script>
<style scoped>
section {
  @apply pb-2 relative
}
h1 {
  @apply pb-2
}
</style>