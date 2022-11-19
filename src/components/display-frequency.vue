<template lang="pug">
div
  ul(class="weekdays")
    li(v-for="day in weekdays")
      | {{ day }}
  ul(id="calendar" class="days")
    li(
      class="placeholder flex"
      v-for="(item, i) in placeholderCells")
    li(
      v-for="(day, i) in days"
      class="flex items-center flex-col relative")
      span(:class="i + 1 == cDay ? 'bg-red-400 text-white' : ''")
        | {{ i + 1 }}
      // Fixed
      div(v-if="workouts.includes(day) && day >= today" class="absolute bottom-4 flex space-x-1")
        div(class="h-1 w-1 rounded-full bg-red-700")
        div(class="h-1 w-1 rounded-full bg-yellow-700")
        div(class="h-1 w-1 rounded-full bg-green-700")
        div(class="h-1 w-1 rounded-full bg-blue-700")
        div(class="h-1 w-1 rounded-full bg-indigo-700")
        div(class="h-1 w-1 rounded-full bg-purple-700")
      // Frequency
      //- div(v-if="workouts[i + 1]" class="absolute bottom-4 flex space-x-1")
      //-   div(v-if="workouts[i + 1].warmups" class="h-1 w-1 rounded-full bg-red-700")
      //-   div(v-if="workouts[i + 1].endurance" class="h-1 w-1 rounded-full bg-yellow-700")
      //-   div(v-if="workouts[i + 1].resistance" class="h-1 w-1 rounded-full bg-green-700")
      //-   div(v-if="workouts[i + 1].flexibility" class="h-1 w-1 rounded-full bg-blue-700")
      //-   div(v-if="workouts[i + 1].leisure" class="h-1 w-1 rounded-full bg-indigo-700")
      //-   div(v-if="workouts[i + 1].sport" class="h-1 w-1 rounded-full bg-purple-700")
</template>
<script>
export default {
  props: [
    'endDate',
    'fixed',
    'frequency',
    'startDate'
  ],
  async mounted() {
    const date = new Date()
    this.cDay = date.getDate()
    this.cMonth = date.getMonth()
    this.cYear = date.getFullYear()
    this.placeholderCells = this.dayInWeek(this.cMonth, this.cYear) + 1
    this.totalDays = this.daysInMonth(this.cMonth, this.cYear)

    for (let i = 0; i < this.totalDays; i++) {
      const format = await this.formattedDate(i + 1)
      const date = new Date(format)
      this.days.push(date)
      if ( date >= this.start && date <= this.end) {
        this.workouts.push(date)
      }
      //- const dow = await date.getDay()
      //- if (date > this.start && date < this.end) {
      //-   if (this.frequency.includes(dow)) {
      //-     this.workouts[i] = {
      //-       warmups: true,
      //-       endurance: true,
      //-       resistance: true,
      //-       flexibility: true,
      //-       sport: true,
      //-       leisure: true
      //-     }
      //-   }
      //- }
    }
    this.filter = this.workouts.filter((element, index) => {
      return index % this.fixed === 0
    })
    let filteredWorkouts = []
    this.workouts.forEach((workout, i) => {
      if (this.filter.includes(workout)) {
        console.log(workout)
        filteredWorkouts.push(workout)
      }
    })
    this.workouts = filteredWorkouts
  },
  data: () => ({
    days: [],
    workouts: [],
    //- workouts: {},
    placeholderCells: null,
    totalDays: null,
    cDay: null,
    cMonth: null,
    cYear: null,
    weekdays: [
      'Su',
      'Mo',
      'Tu',
      'We',
      'Th',
      'Fr',
      'Sa',
    ]
  }),
  methods: {
    dayInWeek (month, year) {
      return new Date(year, month, 1).getDay() - 1
    },
    daysInMonth (month, year) {
      month = month + 1
      return new Date(year, month, 0).getDate()
    },
    formattedDate(day) {
      let month, year
      year = this.cYear
      month = this.cMonth + 1
      month < 10 ? month = `0${month}` : month
      day < 10 ? day = `0${day}` : day
      return `${year}-${month}-${day}`
    }
  },
  computed: {
    end() {
      return new Date(this.endDate).setUTCHours(0,0,0,0)
    },
    start() {
      return new Date(this.startDate).setUTCHours(0,0,0,0)
    },
    today() {
      return new Date().setUTCHours(0,0,0,0)
    }
  }
}
</script>