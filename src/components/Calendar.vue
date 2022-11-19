<template>
<section>
  <h2>{{ months[formatDate.month] }}</h2>
  <ul>
    <span v-for="(item, i) in placeholderPre" :key="'pre' + i"/>
    <li v-for="(day, i) in totalDays" :key="'day' + i">
      <button :class="disabled(day) ? 'text-gray-500' : ''" :disabled="disabled(day)" @click="$emit('select', { ...formatDate, day })">
        {{ day }}
      </button>
    </li>
    <span v-for="(item, i) in placeholderPost" :key="'post' + i"/>
  </ul>
</section>
</template>
<script>
export default {
  props: ['month', 'year', 'date'],
  mounted() {
    const { daysInMonth, dayInWeek, formatDate } = this
    const { month, year } = formatDate
    this.totalDays = daysInMonth(year, month)
    this.placeholderPre = dayInWeek(year, month, 1)
    const day = dayInWeek(year, month, this.totalDays)
    day == 0 ?
      this.placeholderPost = null
      :
      this.placeholderPost = 6 - day
  },
  data: () => ({
    totalDays: null,
    placeholderPre: null,
    placeholderPost: null,
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
    dayInWeek(year, month, day) {
      let val = new Date(year, month, day).getDay()
      return val
    },
    daysInMonth(year, month) {
      month = month + 1
      const day = new Date(year, month, 0).getDate()
      return day
    },
    disabled(day) {
      let { month, year, date } = this
      return new Date(year, month++, day) >= new Date(date) ? false : true
    },
  },
  computed: {
    formatDate() {
      const { month, year } = this
      return month > 11 ?
        {
          month: month - 12,
          year: year + 1
        } :
        {
          month: month,
          year: year
        }
    },
  }
}
</script>
<style scoped>
ul {
  @apply flex flex-wrap
}

li,
ul > span {
  @apply w-[14.28%] text-center pb-3
}

li {
  @apply border-b border-gray-700 my-2
}

h2 {
  @apply px-4 py-2 text-xl md:text-2xl
}

section {
  @apply p-4
}
</style>
