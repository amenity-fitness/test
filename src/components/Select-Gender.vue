<template>
  <div>
    <Floating-Select
      :value="value"
      :options="genderChoices"
      :label="'Gender'"
      @input="$emit('input', { ...$event })"
      />
  </div>
</template>
<script>
export default {
  props: ['value'],
  data: () => ({
    genderChoices: [
      'X',
      'Female',
      'Male'
    ],
  })
}
</script>