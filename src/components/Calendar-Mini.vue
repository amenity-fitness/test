<template>
<div>
  <section>
    <div class="flex justify-between pb-2 items-center">
      <button class="h-5 w-5 p-0 m-0" @click="$emit('decrement', month)">
        <img :src="require('~/assets/svg/chevron-left.svg')" alt="">
      </button>
      <button class="flex items-center hover:bg-gray-600" @click="selectYear = true">
        <h4 class="pl-2">
          {{ abrMo[month] }} {{ year }}
        </h4>
        <img class="w-5 h-5" :src="require('~/assets/svg/chevron-down.svg')" alt="">
      </button>
      <button class="h-5 w-5 p-0 m-0" @click="$emit('increment', month)">
        <img :src="require('~/assets/svg/chevron-right.svg')" alt="">
      </button>
    </div>
    <div class="space-y-2" :class="!selectMonth && !selectYear ? 'block' : 'hidden'">
      <ul class="space-between w-full border-b">
        <p class="w-full text-center" v-for="(day, i) in abrWeek" :key="i">{{ day }}</p>
      </ul>
      <ul class="flex-wrap">
        <span v-for="(item, i) in placeholderPre" :key="'pre' + i"/>
        <li v-for="(day, i) in totalDays" :class="dynamicClass(day)" :key="'day' + i" @click="$emit('select', {year, month, day })">
          {{ day }}
        </li>
      </ul>
    </div>
    <div :class="selectMonth ? 'block' : 'hidden'">
      <button class="w-[25%]" v-for="(month, i) in abrMo" :key="i" @click="updateMonth(i)">
        {{ month }}
      </button>
    </div>
    <div :class="selectYear ? 'block' : 'hidden'">
      <button v-for="(year, i) in years" :key="i" @click="updateYear(year)">
        {{ year }}
      </button>
    </div>
  </section>
</div>
</template>
<script>
export default {
  props: ['year', 'month', 'date', 'today', 'totalDays', 'placeholderPre', 'placeholderPost'],
  data: () => ({
    abrMo: [
      'JAN',
      'FEB',
      'MAR',
      'APR',
      'MAY',
      'JUN',
      'JUL',
      'AUG',
      'SEP',
      'OCT',
      'NOV',
      'DEC'
    ],
    abrWeek: [
      'Su',
      'Mo',
      'Tu',
      'We',
      'Th',
      'Fr',
      'Sa'
    ],
    selectYear: false,
    selectMonth: false
  }),
  methods: {
    dynamicClass(day) {
      const { year, month } = this,
      isToday = this.isToday(year, month, day),
      selectDate = this.selectDate(year, month, day)
      switch (true) {
        case isToday && selectDate:
          return 'border active'
        case isToday:
          return 'border'
        case selectDate:
          return 'active'
      }
    },
    isToday(year, month, day) {
      const { today } = this,
      isToday = new Date(today).toISOString() == new Date(year, month, day).toISOString()
      return isToday ? true : false
    },
    selectDate(year, month, day) {
      const { date } = this,
      selectDate = new Date(date).toISOString() == new Date(year, month, day).toISOString()
      return selectDate ? true : false
    },
    updateMonth(month) {
      this.selectMonth = false
      this.selectYear = false
      this.$emit('update', { month })
    },
    updateYear(year) {
      this.selectMonth = true
      this.selectYear = false
      this.$emit('update', { year })
    }
  },
  computed: {
    years() {
      let { year } = this,
      years = []
      for (let i = 0; i < 4; i++) {
        years.push(year)
        year++
      }
      return years
    }
  }
}
</script>
<style scoped>
.active {
  @apply box-border bg-cyan-900/50
}
ul {
  @apply flex
}
li,
ul > span {
  @apply w-[14.28%] py-2 rounded-full text-center
}
</style>
