<template>
  <div>
    <h4 class="flex">
      <span
        class="grow">Result: {{ calculateBMI }}</span>
      <Button-Toggle
        class="grow"
        @input="metric = !metric"
        :value="metric ? 'Metric': 'Imperial'"/>
    </h4>
    <div class="flex space-x-4">
      <Floating-Input
        v-for="(input, i) in filteredInputs" :key="i"
        v-model="$data[input.id]"
        class="mb-2 grow"
        :data="input"/>
    </div>
  </div>
</template>
<script>
export default {
  props: [],
  data: () => ({
    metric: true,
    weight: '',
    height: '',
    inputs: [
      {
        label: 'Height (cm)',
        id: 'height',
        metric: true,
        error: false
      },
      {
        label: 'Weight (kg)',
        id: 'weight',
        metric: true,
        error: false
      },
      {
        label: 'Height (in)',
        id: 'height',
        metric: false,
        error: false
      },
      {
        label: 'Weight (lbs)',
        id: 'weight',
        metric: false,
        error: false
      },
    ]
  }),
  computed: {
    calculateBMI() {
      let { metric, weight, height } = this,
      res

      height = height / 100
      if (!weight || !height || weight.length < 2) return
      if (metric) {
        res = weight / ( height * height )
        return `${ res.toFixed(1) } BMI`
      } else {
        res = ( weight * 703 ) / ( height * height )
        return `${ res.toFixed(1) } BMI`
      }
    },
    filteredInputs() {
      return this.metric
        ? this.inputs.filter(i => i.metric)
        : this.inputs.filter(i => !i.metric)
    }
  }
}
</script>