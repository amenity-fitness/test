<template>
<div>
  <input
    @click="toggleMenu"
    :value="dateOfBirth || value"
    placeholder=" "
    type="text"
    :id="id"
    @input="handleInput">
  <label :for="id">
    Date Of Birth (yyyy-mm-dd)
  </label>
  <transition name="scale">
    <menu v-if="dateSelect.state">
      <section v-if="!dateSelect.year">
        <div class="bg-gray-800">
          <h3>Birth Year</h3>
          <span class="grid grid-cols-4">
            <span v-for="(year, i) in filteredYears" @click="proceedMenu({ year })" :key="i">{{ year + 1900 }}</span>
          </span>
        </div>
      </section>
      <section v-else-if="!dateSelect.month">
        <div class="bg-gray-800">
          <h3>Birth Month</h3>
          <span class="grid grid-cols-3">
            <span v-for="(month, i) in 12" @click="proceedMenu({ month })" :key="i">{{ months[i] }}</span>
          </span>
        </div>
      </section>
      <section v-else>
        <div class="bg-gray-800">
          <h3>Birth Day</h3>
          <span class="grid grid-cols-6">
            <span v-for="(day, i) in days" @click="toggleMenu(day)" :key="i">{{ day }}</span>
          </span>
        </div>
      </section>
    </menu>
  </transition>
</div>
</template>
<script>
export default {
  props: ['value', 'id'],
  data: () => ({
    dateModel: '',
    dateInput: '',
    currentDate: new Date,
    dateSelect: {
      state: false,
      year: null,
      month: null,
      day: null
    },
    months: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]
  }),
  methods: {
    handleInput(event) {
      this.dateSelect.state = false
      const { value, id } = event.target
      this.dateModel = value
      this.$emit('input', { id, value })
    },
    closeMenu() {
      this.dateSelect.state = false
    },
    toggleMenu(val) {
      const { state, year, month, day } = this.dateSelect
      if (!state) {
        if (year && month && day) {
          this.$emit('input', '')
          this.dateSelect = {
            state: true,
            year: false,
            month: false,
            day: false
          }
        } else {
          this.dateSelect.state = true  
        }
      } else {
        this.dateSelect.state = false
      }
      if (Number.isInteger(val)) {
        this.dateSelect.day = val
      }
    },
    proceedMenu(data) {
      const { year, month } = data
      const menu = document.querySelector('menu')
      menu.scrollTop = 0
      if ( year ) {
        this.dateSelect.year = year + 1900
      }
      if ( month ) {
        this.dateSelect.month = month
      }
    },
  },
  computed: {
    modifiedDate() {
      const { length } = this.dateModel
      switch (true) {
        case length < 4: 
          return this.dateModel
          break
        case length < 7: 
          return this.dateModel.substr(0, 4) + '-' + this.dateModel.substr(5, 2)
          break
        default: 
          return this.dateModel.substr(0, 4) + '-' + this.dateModel.substr(5, 2) + '-' + this.dateModel.substr(8, 2) 
          break
      }
    },
    filteredYears() {
      const years = []
      this.years.forEach(year => {
        if (year <= 110) {
          years.push(year)
        }
      })
      return years
    },
    dateOfBirth() {
      let { year, month, day } = this.dateSelect      
      switch (true) {
        case !year && !month && !day:
          return this.modifiedDate
          break
        case !month && !day:
          return `${year}`
          break
        case !day:
          if ( month < 10) { month = `0${month}`}
          return `${year}-${month}`
          break
        default:
          if ( month < 10) { month = `0${month}`}
          if ( day < 10) { day = `0${day}`}
          this.$emit('input', {
            id: 'birthDate',
            value: `${year}-${month}-${day}`
          })
          return `${year}-${month}-${day}`
          break
      }
    },
    years() {
      let years = []
      for (let i = 0; i <= this.currentDate.getYear(); i++) {
        years.unshift(i)
      }
      return years
    },
    days() {
      const { year, month } = this.dateSelect
      const date = new Date(year, month, 0)
      return date.getDate()
    }
  }
}
</script>
<style scoped>
::-webkit-scrollbar {
  @apply hidden
}

menu {
  scroll-behavior: smooth;
  @apply absolute top-8 w-full p-0 bg-foreground rounded shadow-xl z-30
}
h3 {
  @apply text-center text-white bg-primary m-0 py-4 rounded-t
}

div {
  @apply relative mt-6
}

.grid {
  @apply py-4 overflow-y-scroll max-h-60 
}
span {
  @apply text-center py-3
}

input:not(:placeholder-shown) ~ label {
  @apply transform scale-75 -translate-y-5 left-0
}

input, textarea {
  @apply rounded-none
}
section {
  @apply w-full relative p-2
}

input, textarea {
  @apply block w-full
  appearance-none border-b bg-transparent
  focus:outline-none
}
label {
  @apply absolute top-0 left-1 duration-300 origin-top-left font-medium
}
</style>