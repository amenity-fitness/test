<template>
<div class="py-3 pl-5">
  <div v-if="!!value">
    <button v-if="!selectLog" @click="$emit('input', null)">Return</button>
    <button v-else @click="clear">Back</button>
    <div v-if="!selectLog">
      <h1>
        {{ name }}
      </h1>
      <p>{{ description }}</p>
      <!-- <h2>Start: {{ new Date(startDate) }}</h2>
      <h2>End: {{ new Date(endDate) }}</h2> -->
      <h3>Frequency: {{ frequency ? getFrequency(frequency) : 'N/A' }}</h3>
      <div class="space-y-2">
        <div>
          <h1>Warm Up</h1>
          <div
            v-for="(exercise, i) in warmUp"
            :key="i">
            <div v-if="!!exercise.circuit">
              <h3>Circuit</h3>
              <div class="space-y-1">
                <div class="pl-4" v-for="(ex, i) in exercise.circuit" :key="i">
                  <Exercise :metric="metric" :exercise="ex" />
                </div>
              </div>
            </div>
            <div v-else>
              <Exercise :metric="metric" :exercise="exercise" />
            </div>
          </div>
        </div>
        <div>
          <h1>Conditioning</h1>
          <div
            v-for="(exercise, i) in conditioning"
            :key="i">
            <div v-if="!!exercise.circuit">
              <h3>Circuit</h3>
              <div class="space-y-1">
                <div class="pl-4" v-for="(ex, i) in exercise.circuit" :key="i">
                  <Exercise :metric="metric" :exercise="ex" />
                </div>
              </div>
            </div>
            <div v-else>
              <Exercise :metric="metric" :exercise="exercise" />
            </div>
          </div>
        </div>
        <div>
          <h1>Cool Down</h1>
          <div
            v-for="(exercise, i) in coolDown"
            :key="i">
            <div v-if="!!exercise.circuit">
              <h3>Circuit</h3>
              <div class="space-y-1">
                <div class="pl-4" v-for="(ex, i) in exercise.circuit" :key="i">
                  <Exercise :metric="metric" :exercise="ex" />
                </div>
              </div>
            </div>
            <div v-else>
              <Exercise :metric="metric" :exercise="exercise" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="logs && logs.length">
      <div v-if="!selectLog">
        <h2>Logs</h2>
      </div>
      <div v-for="(log, i) in logs" :key="i">
        <div v-if="!selectLog" class="flex pl-5 pb-2">
          <p class="grow">{{ log.date | shortDate }}</p>
          <button @click="selectLog = log">View</button>
        </div>
        <div v-else-if="log == selectLog">
          <h2>{{ log.date | shortDate }}</h2>
          <div v-for="(exercise, i) in log.workout" :key="i">
            <div v-if="!!exercise.circuit">
              <h3>Circuit</h3>
              <div v-for="(ex, i) in exercise.circuit" :key="i">
                <Exercise :metric="metric" v-bind="ex" />
              </div>
            </div>
            <div v-else>
              <Exercise :metric="metric" v-bind="exercise" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <footer class="flex flex-row-reverse px-2">
      <button v-if="!selectLog" @click="$emit('input', null)">Return</button>
      <button v-else @click="clear">Back</button>
    </footer> -->

  </div>
  <div v-else class="flex items-center">
    <h1 class="grow">
      {{ name }}
    </h1>
    <button @click="$emit('input', id)">View</button>
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
  props: ['name', 'description', 'conditioning', 'warmUp', 'coolDown', 'start', 'end', 'logs', 'frequency', 'value', 'id', 'metric'],
  methods: {
    clear() {
      this.selectLog = null
    },
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
      if (!date) {
        return
      }
      return new Date(date)
        .toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
    }
  }
}
</script>