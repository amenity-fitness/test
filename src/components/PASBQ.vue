<template>
<div>
  <div v-show="hash < 2">
    <h2>Aerobic Physical Activity</h2>
    <div v-show="hash == 0">
      <p>Frequency: In a typical week, how many days do you do moderate- intensity (like brisk walking) to vigorous-intensity (like running) aerobic physical activity ?</p>
      <Floating-Input v-model="frequency" :data="{ label: 'Days/Week', id: 'frequency' }"/>
    </div>
    <div v-show="hash == 1">
      <p>Time or Duration: On average for days that you do at least moderate-intensity aerobic physical activity (as specified above), how many minutes do you do?</p>
      <Floating-Input v-model="time" :data="{ label: 'Minutes/Day', id: 'time'}"/>
    </div>
  </div>
  <div v-show="hash == 2">
    <h2>Muscle Strengthening Physical Activity</h2>
    <div>
      <p>In a typical week, how many times do you do muscle strengthening activities (such as resistance training or very heavy gardening)?</p>
      <Floating-Input v-model="strengthPA" :data="{ label: 'Times/Week', id: 'strengthPA'}"/>
    </div>
  </div>
  <div v-show="hash == 3">
    <h2>Percieved Aerobic Fitness</h2>
    <p>In general, would you say that your aerobic fitness (ability to walk/run distances) is:</p>
    <div class="flex justify-between py-2">
      <div v-for="(p, i) in percieved" :key="i">
        <input @input="percievedAF = $event.target.id" type="radio" :id="p" name="percieved">
        <label :for="p">{{ p }}</label>
      </div>
    </div>
  </div>
  <div v-show="hash >= 4">
    <h2>Sedentary Behiour</h2>
    <div v-show="hash == 4">      
      <p>On a typical day, how many hours do you spend in continuous sitting: at work, in meetings, volunteer commitments and commuting (i.e., by motorized transport)?</p>
      <div class="flex justify-around py-2 flex-wrap">
        <div class="basis-[50%]" v-for="(p, i) in sedentaryList" :key="i">
          <input @input="sedentaryA = $event.target.id" type="radio" :id="p.id" name="sedentaryOccup">
          <label :for="p.id">{{ p.name }}</label>
        </div>
      </div>
    </div>
    <div v-show="hash == 5">
      <p>On a typical day, how many hours do you watch television, use a computer, read, and spend sitting quietly during your leisure time?</p>
      <div class="flex justify-around py-2 flex-wrap">
        <div class="basis-[50%]" v-for="(p, i) in sedentaryList" :key="i">
          <input @input="sedentaryB = $event.target.id" type="radio" :id="1 + p.id" name="sedentaryLeisure">
          <label :for="1 + p.id">{{ p.name  }}</label>
        </div>
      </div>
    </div>
    <div v-show="hash == 6">
      <p>When sitting for prolonged periods (one hour or more), at what interval would you typically take a break to stand and move around for two minutes?</p>
      <div class="flex justify-around py-2 flex-wrap">
        <div class="basis-[50%]" v-for="(p, i) in sedentaryBreaks" :key="i">
          <input @input="sedentaryBreak = $event.target.id" type="radio" :id="p" name="sedentaryBreaks">
          <label :for="p">{{ p }}</label>
        </div>
      </div>
    </div>
  </div>
  <footer class="pt-4 flex flex-row-reverse">
    <button v-if="hash == 6" @click="$emit('submit', { ...PASBQ })">Submit</button>
    <button v-else @click="increment">Next</button>
    <button v-if="hash > 0" @click="decrement">Back</button>
  </footer>
</div>
</template>
<script>
export default {
  data: () => ({
    frequency: null,
    time: null,
    percieved: [
      'Excellent',
      'Very Good',
      'Good',
      'Fair',
      'Poor'
    ],
    sedentaryList: [
      {
        id: 0,
        name: 'None'
      },
      {
        id: 0.5,
        name: '< 1 hour'
      },
      {
        id: 1.5,
        name: '1 to < 2'
      },
      {
        id: 2.5,
        name: '2 to < 3'
      },
      {
        id: 3.5,
        name: '3 to < 4'
      },
      {
        id: 4.5,
        name: '4 to < 5'
      },
      {
        id: 5.5,
        name: '5 to < 6'
      },
      {
        id: 6.5,
        name: '> 6',
      },
    ],
    sedentaryBreaks: [
      '< 10 minutes',
      '10 to < 20 minutes',
      '20 to < 30 minutes',
      '30 to < 45 minutes',
      '45 to < 1 hour',
      '1 to < 1.5 hours',
      '1.5 to < 2 hours',
      '> 2 hours',
    ],
    strengthPA: null,
    sedentaryA: null,
    sedentaryB: null,
    sedentaryBreak: null,
    percievedAF: null,
    hash: 0
  }),
  methods: {
    decrement() {
      if (!this.hash || this.hash == 0) {
      } else {
        this.hash--
        this.setHash(this.hash)
      }
    },
    increment() {
      this.hash++
      this.setHash(this.hash)
    },
    setHash(val) {
      if (val) {
        window.location.hash = val
      } else {
        window.location.hash = '0'
        window.history.replaceState("", "", window.location.pathname)
      }
    },
  },
  computed: {
    aerobicPA() {
      const {frequency, time} = this
      return frequency * time
    },
    sedentary() {
      const { sedentaryA, sedentaryB} = this
      return parseFloat(sedentaryA) + parseFloat(sedentaryB)
    },
    PASBQ() {
      const { aerobicPA, percievedAF, sedentary, strengthPA } = this
      return {
        aerobicPA,
        percievedAF,
        sedentary,
        strengthPA
      }
    }
  }
}
</script>