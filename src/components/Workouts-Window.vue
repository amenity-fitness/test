<template>
<div class="max-h-80 overflow-y-scroll">
  <div v-if="!selectLog">
    <h1>
      {{ name }}
    </h1>
    <p>{{ description }}</p>
    <!-- <h2>Start: {{ new Date(startDate) }}</h2>
    <h2>End: {{ new Date(endDate) }}</h2> -->
    <h3>Frequency: {{ getFrequency(frequency) }}</h3>
    <div 
      v-for="(exercise, i) in exercises"
      :key="i">
      <div v-if="!!exercise.superset">
        <h3>Circuit</h3>
        <div v-for="(ex, i) in exercise.superset" :key="i">
          <Exercise v-bind="ex" />
        </div>
      </div>
      <div v-else>
        <Exercise v-bind="exercise" />
      </div>
    </div>
  </div>
  <div v-if="logs.length">
    <div v-if="!selectLog">
      <hr class="py-4">
      <h2>Logs</h2>
    </div>
    <div v-for="(log, i) in logs" :key="i">
      <div v-if="!selectLog" class="flex">
        <p class="pl-5 grow">{{ log.date | shortDate }}</p>
        <button @click="selectLog = log">View</button>
      </div>
      <div v-else-if="log == selectLog">
        <div v-for="(exercise, i) in log.exercises" :key="i">
          <div v-if="!!exercise.superset">
            <h3>Circuit</h3>
            <div v-for="(ex, i) in exercise.superset" :key="i">
              <Exercise v-bind="ex" />
            </div>
          </div>
          <div v-else>
            <Exercise v-bind="exercise" />
          </div>
        </div>
        <button @click="selectLog = null">Clear</button>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  data: () => ({
    selectLog: null,
    days: [
      'Sun',
      'Mon',
      'Tues',
      'Wed',
      'Thurs',
      'Fri',
      'Sat'
    ]
  }),
  props: ['name', 'description', 'exercises', 'startDate', 'endDate', 'logs', 'frequency'],
  methods: {
    getFrequency(frequency) {
      const { days } = this
      let arr = []
      frequency
        .forEach(fr => {
          arr.push(days[fr])
        })
      return arr.join(', ')
    }
  },
  filters: {
    shortDate(date) {
      return new Date(date)
        .toISOString().split('T')[0]
    }
  }
}
</script>