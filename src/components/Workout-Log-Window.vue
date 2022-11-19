<template>
<div v-if="selectWorkout">
  <!-- <p>{{ prevLogs }}</p> -->
  <!-- <p v-for="(ex, i) in circuit" :key="i">
    {{ ex }}
  </p> -->
  <!-- <p v-for="(log, i) in logs" :key="i">
    {{ log }}
  </p> -->
  <!-- i {{ index }}
  ex {{ exercise}}
  circuit: {{ circuit.length }}
  logs: {{ logs.length }} -->
  <div>
    <Floating-Select
      :value="category || category == '' ? category : current.category"
      @input="category = $event.value"
      :options="categories"
      :label="'Category'"
      :key="11"
    />
    <Floating-Select
      :value="position || position == '' ? position : current.position"
      @input="position = $event.value"
      :options="positions"
      :label="'Position'"
      :key="22"
    />
    <Floating-Select
      :value="equipment || equipment == '' ? equipment : current.equipment"
      @input="equipment = $event.value"
      :options="equipments"
      :label="'Equipment'"
      :key="33"
    />
    <Floating-Input
      :data="{ id: 'jk', label: 'Exercise Name' }"
      :value="name || name == '' ? name : current.name"
      @input="name = $event"
      />
    <div class="flex justify-around pt-2">
      <Button-Toggle
        ref="toggle-btn"
        :value="timed == null ? `${current.timed ? 'Timed': 'Repetitions'}` : `${timed ? 'Timed': 'Repetitions'}`"
        @input="timed == null ? timed = !current.timed : timed = !timed"
      />
      <Button-Toggle
        :value="unilateral == null ? `${current.unilateral ? 'Unilateral': 'Bilateral'}` : `${unilateral ? 'Unilateral': 'Bilateral'}`"
        @input="unilateral == null ? unilateral = !current.unilateral : unilateral = !unilateral"
      />
    </div>
    <Floating-Input
      v-if="timed == null ? current.timed : timed"
      :data="{ id: 'kl', label: 'Duration (sec)', number: true }"
      :value="duration || duration == '' ? duration : current.duration"
      @input="duration = $event"
      />
    <Floating-Input 
      v-else
      :data="{ id: 'lmx', label: 'Repetitions', number: true }"
      :value="reps || reps == '' ? reps : current.reps"
      @input="reps = $event"
    />
    <Floating-Input
      :data="{ id: 'lmb', label: 'Sets', number: true }"
      :value="sets || sets == '' ? sets : current.sets"
      @input="sets = $event"
    />
    <Floating-Input
      :data="{ id: 'mn', label: metric ? 'Load (kg)' : 'Load (lbs)' }"
      :value="load || load == '' ? load : current.load"
      @input="load = $event"
    />
    <Floating-Input
      :data="{ id: 'lma', label: 'Rest (min)', number: true }"
      @input="rest = $event"
      :value="rest || rest == '' ? rest : current.rest"
    />
  </div>
  <button @click="decrement">Decrement</button>
  <button @click="increment">
    Increment
  </button>
</div>
</template>

<script>
export default {
  props: ['workout', 'metric', 'selectWorkout'],
  data: () => ({
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
    duration: null,
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
    exercise: 0,
    index: 0,
    load: null,
    logs: [],
    name: null,
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
    sets: null,
    unilateral: null,
    timed: null
  }),
  methods: {
    addCircuit(splice) {
      const { current, exercise, category, position, equipment, name, reps, sets, load, rest } = this
      if ( splice ) {
        this.circuit
          .splice(exercise, 1, this.ex)
          // .splice(exercise, 1, {
          //   category: category || category == '' ? category : current.category,
          //   position: position || position == '' ? position : current.position,
          //   equipment: equipment || equipment == '' ? equipment : current.equipment,
          //   name: name || name == '' ? name : current.name,
          //   reps: reps || reps == '' ? reps : current.reps,
          //   sets: sets || sets == '' ? sets : current.sets,
          //   load: load || load == '' ? load : current.load,
          //   rest: rest || rest == '' ? rest : current.rest
          // })
      } else {
        this.circuit
          .push(this.ex)
          // .push({
          //   category: category || category == '' ? category : current.category,
          //   position: position || position == '' ? position : current.position,
          //   equipment: equipment || equipment == '' ? equipment : current.equipment,
          //   name: name || name == '' ? name : current.name,
          //   reps: reps || reps == '' ? reps : current.reps,
          //   sets: sets || sets == '' ? sets : current.sets,
          //   load: load || load == '' ? load : current.load,
          //   rest: rest || rest == '' ? rest : current.rest
          // })
      }
    },
    addLog(splice) {
      const { current, category, position, equipment, name, reps, sets, load, rest } = this
      if (splice) {
        if (this.logs[this.index].circuit) {
          this.logs[this.index].circuit.splice(this.exercise, 1, this.ex)
          // this.logs[this.index].circuit.splice(this.exercise, 1, {
          //   category: category || category == '' ? category : current.category,
          //   position: position || position == '' ? position : current.position,
          //   equipment: equipment || equipment == '' ? equipment : current.equipment,
          //   name: name || name == '' ? name : current.name,
          //   reps: reps || reps == '' ? reps : current.reps,
          //   sets: sets || sets == '' ? sets : current.sets,
          //   load: load || load == '' ? load : current.load,
          //   rest: rest || rest == '' ? rest : current.rest
          // })
        } else {
          this.logs.splice(this.index, 1, this.ex)
          // this.logs.splice(this.index, 1, {
          //   category: category || category == '' ? category : current.category,
          //   position: position || position == '' ? position : current.position,
          //   equipment: equipment || equipment == '' ? equipment : current.equipment,
          //   name: name || name == '' ? name : current.name,
          //   reps: reps || reps == '' ? reps : current.reps,
          //   sets: sets || sets == '' ? sets : current.sets,
          //   load: load || load == '' ? load : current.load,
          //   rest: rest || rest == '' ? rest : current.rest
          // })
        }
      } else {
        this.logs
          .push(this.ex)
          // .push({
          //   category: category || category == '' ? category : current.category,
          //   position: position || position == '' ? position : current.position,
          //   equipment: equipment || equipment == '' ? equipment : current.equipment,
          //   name: name || name == '' ? name : current.name,
          //   reps: reps || reps == '' ? reps : current.reps,
          //   sets: sets || sets == '' ? sets : current.sets,
          //   load: load || load == '' ? load : current.load,
          //   rest: rest || rest == '' ? rest : current.rest
          // })
      }
    },
    decrement() {
      const { conditioning, index, exercise } = this,
      c0 = !!conditioning[index].circuit,
      condition = c0 && conditioning[index].circuit.length - 1 <= exercise,
      condition2 = index == conditioning.length - 1

      switch(true) {
        case exercise == 0 && index == 0:
          console.log(9)
          break
        case condition && condition2:
          console.log(8)
          if (this.circuit[this.exercise]) {
            this.addCircuit(true)
          } else {
            this.addCircuit()
          }
          this.exercise--
          break
        case condition2 && !c0:
          console.log(7)
          if (this.logs[this.index]) {
            this.addLog(true)
          } else {
            this.addLog()
          }
          this.index--
          break
        case c0 && this.exercise == 0:
          console.log(6)
          this.addCircuit(true)
          if (this.logs[this.index]) {
            this.logs.splice(this.index, 1, {
              circuit: this.circuit
            })
          } else {
            this.logs.push({
              circuit: this.circuit
            })
          }
          this.index--
          if (!!conditioning[this.index].circuit) {
            this.circuit = this.logs[this.index].circuit
            this.exercise = conditioning[this.index].circuit.length - 1
          } else {
            this.circuit = []
            this.exercise = 0
          }
          // this.circuit = []
          break
        default:
          // console.log(this.circuit)
          // console.log('ex', this.exercise)

          switch(true) {
            case this.logs[this.index]:
              console.log(5,1)
              this.circuit
                .splice(
                  this.exercise - 1,
                  1,
                  this.logs[this.index].circuit[this.exercise - 1])
              break
            // case this.circuit.length && this.circuit[this.exercise].length:
            case this.circuit.length && this.circuit[this.exercise.length]:
              console.log(5,2)
              this.addCircuit(true)
              break
            case c0:
              console.log(5,3)
              this.addCircuit()
              break
          }
          if (this.circuit.length) {
            this.exercise--
          } else {
            this.index--
          }
      }
      this.reset()
    },
    async increment() {
      const { conditioning, index, exercise } = this,
      c0 = !!conditioning[index].circuit,
      condition = c0 && conditioning[index].circuit.length - 1 <= exercise,
      condition1 = c0 && !conditioning[index].circuit.length - 1 <= exercise,
      condition2 = index == conditioning.length - 1
      switch (true) {
        case condition && condition2:
          console.log(1)
          // this.addCircuit()
          this.addCircuit(true)
          if (this.logs[this.index]) {
            this.logs
              .splice(this.index, 1, { circuit: this.circuit })
          } else {
            this.logs
              .push({ circuit: this.circuit })
          }
          this.circuit = []
          console.log('end')
          // console.log(this.logs)
          this.$emit('submit', {
            logs: [
              {
                date: new Date().toISOString(),
                workout: this.logs
              }
            ]
          })
          break
        case condition2 && !c0:
          console.log(2)
          if (this.logs[this.index]) {
            this.addLog(true)
          } else {
            this.addLog()
          }
          console.log('end')
          if (this.workout['logs']) {
            this.$emit('submit', {
              logs: [
                ...this.workout['logs'],
                {
                  date: new Date().toISOString(),
                  workout: this.logs
                }
              ]
            })
          } else {
            this.$emit('submit', {
              logs: [
                {
                  date: new Date().toISOString(),
                  workout: this.logs
                }
              ]
            })
          }
          break
        case condition:
          console.log(3)
          if (!!this.circuit[this.exercise]) {
            console.log(123)

            // if (this.logs[this.index]) {
            //   this.addCircuit(true)
            // } else {
            this.addCircuit(true)
            // }
          } else {
            if (this.logs[this.index]) {
              console.log(323)
              this.addCircuit(true)
              this.addLog(true)

            } else {
              console.log(234)
              this.addCircuit()
              this.logs.push({ circuit: this.circuit })
            }
          }
          this.circuit = []
          this.index++
          this.exercise = 0
          break
        case c0 && condition1:
          console.log(4)
          if (this.logs[this.index]
            && this.exercise < this.logs[this.index].circuit.length - 1) {
            console.log(111)
            this.addCircuit(true)
          }
          else if (!!this.circuit[this.exercise]) {
            console.log(222)
            this.addCircuit(true)
          } else {
            console.log(333)
            await this.addCircuit()
          }

          this.exercise++
          break
        default:
          console.log(5)
          if (this.logs[this.index]) {
            this.addLog(true)
          } else {
            this.addLog()
          }
          if (!!this.conditioning[this.index].circuit) {
            this.exercise++
          } else {
            this.index++
          }
      }
      this.reset()
    },
    reset() {
      this.$refs['toggle-btn'].reset()
      this.category = null
      this.position = null
      this.equipment = null
      this.name = null
      this.timed = null
      this.unilateral = null
      this.duration = null
      this.reps = null
      this.sets = null
      this.load = null
      this.rest = null
    },
    resetEx() {
      this.exercise = 0
      this.index = 0
    }
  },
  computed: {

    conditioning() {
      return this.workout['conditioning']
    },
    current() {
      const { conditioning, index, exercise, logs } = this,
      c0 = this.logs.length > 0 && !!this.logs[this.index],
      c1 = c0 ? !!this.logs[this.index].circuit : null
      // c2 = c0 && this.logs[this.index].circuit[this.exercise]

      switch(true) {
        case this.circuit.length > 0 && !!this.circuit[this.exercise]:
          console.log('A')
          return this.circuit[this.exercise]
        case c0 && c1:
          console.log('B')
          if (this.logs[this.index].circuit[this.exercise]) {
            return this.logs[this.index].circuit[this.exercise]
          } else {
            return conditioning[index].circuit[exercise]
          }
        case c0:
          console.log('C')
          return this.logs[this.index]
        case !!conditioning[index].circuit:
          console.log('D')
          return conditioning[index].circuit[exercise]
        default:
          console.log('E')
          return conditioning[index]
      }
    },
    ex() {
      const { current, category, position, equipment, name, reps, sets, load, rest, duration, unilateral, timed } = this
      return {
        category: category || category == '' ? category : current.category,
        position: position || position == '' ? position : current.position,
        equipment: equipment || equipment == '' ? equipment : current.equipment,
        duration: duration || duration == '' ? duration : current.duration,
        unilateral: unilateral || unilateral == '' ? unilateral : current.unilateral,
        timed: timed || timed == '' ? timed : current.timed,
        name: name || name == '' ? name : current.name,
        reps: reps || reps == '' ? reps : current.reps,
        sets: sets || sets == '' ? sets : current.sets,
        load: load || load == '' ? load : current.load,
        rest: rest || rest == '' ? rest : current.rest
      }
    }
  },
  watch: {
    circuit(val) {
      // console.log(val)
    },
    logs(val) {
      // console.log(val)
    }
  }
}
</script>