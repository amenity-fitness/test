<template>
  <Exercise-Resistance v-if="exercise.type == 'Resistance'" :metric="metric" v-bind="exercise"/>
  <Exercise-Flexibility v-else-if="exercise.type == 'Flexibility'" :metric="metric" v-bind="exercise"/>
  <Exercise-Cardiovascular v-else-if="exercise.type == 'Cardiovascular'" v-bind="exercise"/>
</template>
<script>
export default {
  props: ['exercise', 'metric'],
  mounted() {
  }
}
</script>