<template>
<div @click="handleClick">
  <div v-if="finalize">
    <h1 class="pb-1">Create A Workout</h1>
    <Floating-Input class="grow" :data="{ id: 'dea', label: 'Workout Name' }" v-model="name"/>
    <Date-Select v-model="selectDate" :i="0" :label="'Start Date'" :date="date" @select="select" :open="open" @open="openMenu(0)"/>
    <Date-Select v-model="selectDate2" :i="1" :label="'End Date'" :date="date" @select="select" :open="open2" @open="openMenu(1)"/>
  
    <footer>
      <button @click="finalize = false">Return</button>
      <Button-Action :loading="loading" @click="submit" :text="'Submit'"/>
    </footer>
  </div>
  <div v-else-if="!addExercise">
    <h1 class="pb-1">Create A Workout</h1>
    <div class="max-h-[80%] overflow-y-scroll bg-gray-800 -mx-3 p-2">
      <h2>Warm Up</h2>
      <Exercises :data="warmUp" :metric="metric" @remove="warmUp.splice($event, 1)" />
      <h2>Conditioning</h2>
      <Exercises :data="conditioning" :metric="metric" @remove="conditioning.splice($event, 1)" />
      <h2>Cool Down</h2>
      <Exercises :data="coolDown" :metric="metric" @remove="coolDown.splice($event, 1)" />
    </div>
    <footer>
      <button @click="addExercise = true">Add Exercise</button>
      <button v-if="!finalize" @click="finalize = true">Next</button>
    </footer>
  </div>
  <div v-else>
    <h1>Add An Exercise</h1>
    <div v-if="hash == 0 || !hash">
      <Floating-Select
        @input="stage = $event.value"
        :options="stages"
        :label="'Stage'"
        :key="4"
      />
      <Floating-Select
        @input="type = $event.value"
        :options="exerciseType"
        :label="'Exercise Type'"
        :key="1"
      />
    </div>
    <div v-if="hash == 1 && type == 'Cardiovascular'">
      <Floating-Select
        @input="mode = $event.value"
        :options="modes"
        :label="'Training Mode'"
        :key="2"
      />
      <Floating-Select
        @input="method = $event.value"
        :options="methods"
        :label="'Training Method'"
        :key="0"
      />
      <Floating-Input class="grow" :data="{ id: 'de', label: 'Intensity (HRR/Vo2)', number: true }" v-model="intensity"/>
      <div>
        <div v-if="interval.includes(method)" class="flex">
          <Floating-Input class="grow" :data="{ id: 'ab', label: 'Work Duration (mins)', number: true }" v-model="durationWork"/>
          <Floating-Input class="grow" :data="{ id: 'bc', label: 'Rest Duration (mins)', number: true }" v-model="durationRest"/>
        </div>
        <div v-else>
          <Floating-Input class="grow" :data="{ id: 'cd', label: 'Duration (mins)', number: true }" v-model="duration"/>
        </div>
      </div>
    </div>
    <div v-else-if="hash == 1 && type == 'Resistance'">
      <Floating-Select
        :value="category"
        @input="category = $event.value"
        :options="categories"
        :label="'Category'"
        :key="11"
      />
      <Floating-Select
        :value="position"
        @input="position = $event.value"
        :options="positions"
        :label="'Position'"
        :key="22"
      />
      <Floating-Select
        :value="equipment"
        @input="equipment = $event.value"
        :options="equipments"
        :label="'Equipment'"
        :key="33"
      />
      <Floating-Input :data="{ id: 'jk', label: 'Exercise Name' }" v-model="name"/>
      <div class="flex justify-around pt-2">
        <Button-Toggle
          :value="timed ? 'Timed': 'Repetitions'"
          @input="timed = !timed"
        />
        <Button-Toggle
          :value="unilateral ? 'Unilateral': 'Bilateral'"
          @input="unilateral = !unilateral"
        />
      </div>
    </div>
    <div v-else-if="hash == 2 && type == 'Resistance'">
      <Floating-Input v-if="timed" :data="{ id: 'kl', label: 'Duration (sec)', number: true }" v-model="duration"/>
      <Floating-Input v-else :data="{ id: 'lmx', label: 'Repetitions', number: true }" v-model="reps"/>
      <div class="flex" v-if="!timed">
        <Floating-Input @focus="activeInput = $event" @next="next" :data="{ id: 'tempo', label: 'Ecc', number: true }" v-model="tempo.ecc"/>
        <Floating-Input @focus="activeInput = $event" @next="next" :data="{ id: 'tempo', label: 'Ammor.', number: true }" v-model="tempo.amm"/>
        <Floating-Input @focus="activeInput = $event" @next="next" :data="{ id: 'tempo', label: 'Conc.', number: true }" v-model="tempo.con"/>
        <Floating-Input :data="{ id: 'tempo', label: 'Pause', number: true }" v-model="tempo.pau"/>
      </div>
      <Floating-Input :data="{ id: 'lmb', label: 'Sets', number: true }" v-model="sets"/>
      <Floating-Input :data="{ id: 'mn', label: metric ? 'Load (kg)' : 'Load (lbs)' }" v-model="load"/>
      <Floating-Input :data="{ id: 'lma', label: 'Rest (min)', number: true }" v-model="rest"/>
    </div>
    <div v-else-if="hash == 1 && type == 'Flexibility'">
      <div class="flex justify-around pt-2">
        <Button-Toggle
          :value="timed ? 'Timed': 'Repetitions'"
          @input="timed = !timed"
        />
        <Button-Toggle
          :value="unilateral ? 'Unilateral': 'Bilateral'"
          @input="unilateral = !unilateral"
        />
      </div>
      <Floating-Input :data="{ id: 'ef', label: 'Exercise Name' }" v-model="name"/>
      <Floating-Input :data="{ id: 'gh', label: 'Sets', number: true }" v-model="sets"/>
      <Floating-Input v-if="timed" :data="{ id: 'fgg', label: 'Duration (sec)', number: true }" v-model="duration"/>
      <Floating-Input v-else :data="{ id: 'fgh', label: 'Repetitions', number: true }" v-model="reps"/>
      <Floating-Input :data="{ id: 'hj', label: 'Load' }" v-model="load"/>
    </div>
    <footer>
      <button
        class="grow text-left"
        v-if="hash == 1 && type !== 'Resistance'"
        @click="addCircuit(type)">
        Add to circuit
      </button>
      <button
        class="grow text-left"
        v-else-if="hash == 2"
        @click="addCircuit(type)">
        Add to circuit
      </button>
      <button v-if="!addExercise && hash == 0 || !addExercise && !hash" @click="$emit('close')">
        Cancel
      </button>
      <button v-else @click="decrement">
        Back
      </button>
      <Button-Action
        v-if="hash == 2 || type == 'Flexibility' && hash == 1 || type == 'Cardiovascular' && hash == 1"
        @click="proceed()"
        :text="'Add'"
      />
      <button
        v-else-if="hash <= 1 || !hash"
        @click="proceed()"
        class="bg-green-500/50">
        Next
      </button>
    </footer>
  </div>
</div>
</template>
<script>
export default {
  props: ['metric', 'loading'],
  data: () => ({
    activeInput: null,
    tempo: {
      ecc: null,
      amm: null,
      con: null,
      pau: null
    },
    addExercise: false,
    category: null,
    categories: [
      'Lower',
      'Plyometric',
      'Pull',
      'Push',
      'Trunk',
      'Dynamic'
    ],
    circuit: [],
    conditioning: [],
    coolDown: [],
    duration: null,
    durationRest: null,
    durationTotal: null,
    durationWork: null,
    equipment: null,
    equipments: [
      'Angled Barbell',
      'Band',
      'Barbell',
      'Cable',
      'Dowel Bar',
      'Dumbbell',
      'Hex (Trap) Bar',
      'Kettlebell',
      'Machine',
      'Medicine Ball',
      'Suspension'
    ],
    exerciseType: [
      'Cardiovascular',
      'Resistance',
      'Flexibility'
    ],
    finalize: false,
    hash: 0,
    intensity: null,
    interval: [
      'Interval',
      'Fartlek',
      'Repetition'
    ],
    load: null,
    mode: null,
    modes: [
      'Walking',
      'Running',
      'Treadmill',
      'Indoor Cycling',
      'Outdoor Cycling',
      'Rowing',
      'Eliptical/Arc',
      'Step Machine',
      'Skipping',
    ],
    name: null,
    open: false,
    open2: false,
    position: null,
    positions: [
      'Athletic Stance',
      'Half-Kneeling',
      'Incline',
      'Kneeling',
      'Low Kneeling',
      'Prone',
      'Quadruped',
      'Seated',
      'Side Lying',
      'Standing',
      'Supine'
    ],
    reps: null,
    rest: null,
    selectDate: null,
    selectDate2: null,
    sets: null,
    stage: null,
    stages: [
      'Warm Up',
      'Conditioning',
      'Cool Down',
    ],
    method: null,
    methods: [
      'Pace/Tempo',
      'Long Slow Distance',
      'Interval',
      'Fartlek',
      'Repetition'
    ],
    timed: false,
    type: null,
    unilateral: false,
    warmUp: []
  }),
  computed: {
    date() {
      const date = new Date()
      date.setMinutes(0)
      date.setHours(0)
      date.setSeconds(0)
      date.setMilliseconds(0)
      return date
    },
    tempoFinal() {
      const { tempo } = this,
      { ecc, amm, con, pau } = tempo
      if (!ecc || !amm || !con || !pau) {
        return null
      } else {
        return `${ ecc }-${ amm }-${ con }-${ pau }`
      }
    }
  },
  methods: {
    addCircuit(type) {
      const { duration, category, position, equipment, name, timed, unilateral, reps, sets, load, rest, mode, method, intensity } = this
      switch(true) {
        case type == 'Cardiovascular':
          this.circuit
            .push({
              type,
              mode,
              method,
              intensity,
              duration,
              durationWork,
              durationRest
            })
          break
        case type == 'Resistance':
          this.circuit
            .push({
              type,
              category,
              position,
              equipment,
              duration,
              name,
              timed,
              unilateral,
              reps,
              sets,
              load,
              rest
            })
          break
        case type == 'Flexibility':
          this.circuit
            .push({
              type,
              name,
              timed,
              unilateral,
              duration,
              sets,
              reps,
              load
            })
          break
      }
      this.reset()
      this.setHash(1)
    },
    decrement() {
      if (!this.hash || this.hash == 0) {
        this.addExercise = false
      } else {
        this.hash--
        this.setHash(this.hash)
      }
    },
    handleClick(evt) {
      if (this.open) {
        let parent = document.querySelector('#calendar0')
        if (!parent.contains(evt.target)) {
          this.open = false
        }
      } else if (this.open2) {
        parent = document.querySelector('#calendar1')
        if (!parent.contains(evt.target)) {
          this.open2 = false
        }
      }
    },
    next() {
      const e = this.activeInput,
      next = e.parentElement.nextElementSibling
      next.querySelector('input').focus()
    },
    openMenu(val) {
      if (val == 0) {
        this.open2 = false
        this.open = true
      } else {
        this.open = false
        this.open2 = true
      }
    },
    proceed() {
      let { tempoFinal, type, circuit, hash, setHash, category, position, equipment, name, timed, unilateral, reps, sets, load, rest, duration, stage, mode, method, durationWork, durationRest, intensity } = this
      stage = stage.charAt(0).toLowerCase() + stage.substr(1).split(' ').join('')
      switch(true) {
        case hash == 1 && type == 'Cardiovascular':
          if (circuit.length) {
            this.circuit
              .push({
                type,
                mode,
                method,
                intensity,
                duration,
                durationWork,
                durationRest
              })
            this[stage].push({ circuit })
            this.reset()
            this.circuit = []
            this.setHash(0)
            this.addExercise = false
          } else {
            this[stage].push({
              type,
              mode,
              method,
              intensity,
              duration,
              durationWork,
              durationRest
            })
            this.reset()
            this.setHash(0)
            this.addExercise = false
          }
          break
        case hash == 1 && type == 'Flexibility':
          if (circuit.length) {
            this[stage]
              .push({
                type,
                name,
                timed,
                unilateral,
                duration,
                sets,
                reps,
                load
              })
            this[stage]
              .push({ circuit })
            this.reset()
            this.circuit = []
            this.setHash(0)
            this.addExercise = false
          } else {
            this[stage]
              .push({
                type,
                name,
                timed,
                unilateral,
                duration,
                sets,
                reps,
                load
              })
            this.reset()
            this.setHash(0)
            this.addExercise = false
          }
          break
        case hash == 2:
          const tempo = tempoFinal
          if (circuit.length) {
            this.circuit
              .push({
                type,
                category,
                position,
                equipment,
                duration,
                name,
                tempo,
                timed,
                unilateral,
                reps,
                sets,
                load,
                rest
              })
            this[stage]
              .push({ circuit })
            this.reset()
            this.circuit = []
            this.setHash(0)
            this.addExercise = false
          } else {
            this[stage]
              .push({
                type,
                category,
                position,
                duration,
                equipment,
                name,
                tempo,
                timed,
                unilateral,
                reps,
                sets,
                load,
                rest
              })
            this.reset()
            this.setHash(0)
            this.addExercise = false
          }
          break
        default:
          hash++
          setHash(hash)
      }
    },
    reset() {

      this.tempo = {
        ecc: null,
        amm: null,
        con: null,
        pau: null
      },
      this.finalize = false
      this.selectDate = null
      this.selectDate2 = null
      this.intensity = null
      this.category = null
      this.duration = null
      this.position = null
      this.equipment = null
      this.name = null
      this.timed = null
      this.unilateral = null
      this.reps = null
      this.sets = null
      this.load = null
      this.rest = null
    },
    resetExercises() {
      this.warmUp = []
      this.conditioning = []
      this.coolDown = []
    },
    select($event) {
      this.open = false
      this.open2 = false
    },
    setHash(val) {
      if (val) {
        window.location.hash = val
      } else {
        window.location.hash = '0'
        window.history.replaceState("", "", window.location.pathname)
      }
    },
    shortDate(date) {
      return new Date(date)
        .toLocaleDateString('en-CA', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
    },
    submit() {
      const { warmUp, conditioning, coolDown, name, date, selectDate, selectDate2, shortDate } = this
      this.$emit('submit', {
        warmUp,
        conditioning,
        coolDown,
        name,
        start: selectDate ? shortDate(selectDate) : shortDate(date),
        end: selectDate2 ? shortDate(selectDate2) : null
      })
    }
  },
  watch: {
    $route({ hash }) {
      this.hash = hash.split('#')[1]
    },
  },
  filters: {
    exName(ex) {
      if (!ex) {
        return
      }
      let { unilateral, name, mode, method, equipment, position } = ex
      unilateral = unilateral ? 'Unilateral' : false
      switch (true) {
        case ex.type == 'Flexibility':
          switch(true) {
            case !!unilateral:
              return `${unilateral} ${name}`
            default:
              return `${name}`
          }
        case ex.type == 'Cardiovascular':
          return `${method} ${mode}`
        case ex.type == 'Resistance':
          switch(true) {
            case !!unilateral && !!equipment && !!position:
              return `${unilateral} ${position} ${equipment} ${name}`
            case !!equipment && !!position:
              return `${position} ${equipment} ${name}`
            case !!unilateral && !!equipment:
              return `${equipment} ${name}`
            case !!equipment:
              return `${equipment} ${name}`
            case !!unilateral && !!position:
              return `${position} ${name}`
            case !!position:
              return `${position} ${name}`
            default:
              return name
          }
      }
    },
    exParams(ex, metric) {
      if (!ex) {
        return
      }
      const { timed, sets, duration, intensity, reps, rest, load, durationWork, durationRest} = ex
      switch (true) {
        case ex.type == 'Flexibility':
          switch (true) {
            case !!load:
              return `${ sets } sets × ${ timed ? `${ duration } sec.` : `${ reps } reps`} @ ${ metric ? `${load} kg` : `${load} lbs` }`
            default:
              return `${ sets } sets × ${ timed ? `${ duration } sec.` : `${ reps } reps`}`
          }
        case ex.type == 'Cardiovascular':
          switch(true) {
            case !!durationWork && !!durationRest:
              return `${duration} mins @ ${intensity} HRR, ${durationWork} Work:${durationRest} Rest`
            default:
              return `${duration} mins @ ${intensity} HRR`
          }
        case ex.type == 'Resistance':
          return `${ sets } sets × ${ timed ? `${timed} sec` : `${reps} reps` } @ ${ metric ? `${load} kg` : `${load} lbs` }, ${ rest } min. rest`
      }
      
    }
  }
}
</script>
<style scoped>
footer {
  @apply flex flex-row justify-end pt-4 space-x-4
}
hr {
  @apply opacity-50 my-1
}
::-webkit-scrollbar {
  @apply w-0
}
p {
  @apply text-sm
}
</style>