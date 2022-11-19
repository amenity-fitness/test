<template>
<div :id="'calendar' + i">
  <input
    readonly
    @click="$emit('open')"
    placeholder=" "
    type="text"
    :value="conditionalValue">
  <label>
    {{ label }}
  </label>
  <transition name="scale">
    <menu v-if="open">
      <Calendar-Mini
        @update="updateDate"
        @select="select"
        @increment="increment"
        @decrement="decrement"
        :month="month"
        :year="year"
        :date="updatedDate ? updatedDate : date"
        :today="date"
        :totalDays="totalDays"
        :placeholderPre="placeholderPre"
        :placeholderPost="placeholderPost"
      />
    </menu>
  </transition>
</div>
</template>
<script>
export default {
  props: ['value', 'open', 'date', 'label', 'noPlaceholder', 'i'],
  data: () => ({
    month: null,
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
    ],
    placeholderPre: null,
    placeholderPost: null,
    totalDays: null,
    updatedDate: null,
    year: null,
  }),
  mounted() {
    const { date } = this
    const year = date.getFullYear(),
    month = date.getMonth()
    this.month = month
    this.year = year
  },
  methods: {
    decrement(month) {
      if (month == 0) {
        this.year--
        this.month = 11
      } else {
        this.month--
      }
    },
    increment(month) {
      if (month == 11) {
        this.year++
        this.month = 0
      } else {
        this.month++
      }
    },
    select($event) {
      const { year, month, day } = $event,
      mod = this.shortDate(new Date(year, month, day))
      this.updatedDate = mod
      this.$emit('input', mod)
      this.$emit('select', mod)
    },
    shortDate(date) {
      if (!date) {
        return ''
      } else {
        return new Date(date)
          .toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })
      }
    },
    updateDate(evt) {
      const key = Object.keys(evt)[0]
      this[key] = evt[key]
    }
  },
  computed: {
    conditionalValue() {
      const { value, updatedDate, shortDate, date, noPlaceholder } = this
      return noPlaceholder && !updatedDate
        ? ''
        : updatedDate ? shortDate(updatedDate) : shortDate(date)
    },
  },
  watch: {
    value(val) {
      if (!val) {
        this.updatedDate = null
      }
    },
    month() {
      const { date, year, month, totalDays } = this,
      day = date.getDate()

      this.totalDays = new Date(year, month + 1, 0).getDate()
      this.placeholderPre = new Date(year, month, 1).getDay()
      
      const endDay = new Date(year, month, totalDays).getDay()
      endDay == 0
        ? this.placeholderPost = null
        : this.placeholderPost = 6 - day
    } 
  }
}
</script>
<style scoped>

menu {
  @apply fixed top-[15%] left-0 m-2 md:absolute p-4 md:top-1 bg-gray-500 rounded shadow-xl z-30
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
  @apply rounded-none w-full
}
section {
  @apply w-full relative
}

input, textarea {
  @apply block
  appearance-none border-b bg-transparent
  focus:outline-none
}
label {
  @apply absolute top-0 left-1 duration-300 origin-top-left font-medium
}
</style>