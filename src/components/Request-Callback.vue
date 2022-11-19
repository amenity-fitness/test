<template>
  <div>
    <div>
      <h2>Request A Callback</h2>
      <p>Speak with one of our trainers directly by providing your contact information and when you will be available</p>
    </div>
    <div v-if="!proceed">
      <div class="flex items-center space-between p-4 pb-0">
        <button :disabled="index <= 1" @click="index--">
          <img class="h-4 w-4 invert dark:invert-0" :class="index <= 1 ? 'opacity-50' : ''" :src="require('~/assets/svg/chevron-left.svg')" alt="">
        </button>
        <h3 class="grow text-center">
          {{ newDate | filteredDate(days, months) }}
        </h3>
        <button :disabled="index > 7" @click="index++">
          <img class="h-4 w-4 invert dark:invert-0" :class="index > 7 ? 'opacity-50' : ''" :src="require('~/assets/svg/chevron-right.svg')" alt="">
        </button>
      </div>
      <div class="p-2 mt-4 shadow-inner bg-slate-800/20 rounded-md h-40 overflow-y-scroll grid grid-cols-4">
        <button v-for="(time, i) in availableTimes" :key="i" class="text-center"
          @click="selectTime = time"
          :disabled="checkConflicts(time, filteredTimes)"
          :class="selectTime == time ? 'bg-blue-500 font-semibold text-white shadow-md' : ''"
          >
            {{ time | filteredTime }}
        </button>
      </div>
      <div class="pt-3 pl-2">
        <p class="text-sm">Note: Times are listed in Pacific Daylight Time</p>
      </div>
    </div>
    <div v-else>
      <div
        v-for="(input, i) in inputs"
        :key="i">
        <Floating-Input
          v-model="$data[input.id]"
          @clear="clear"
          @error="error"
          :data="input"
          :i="i" />
      </div>
    </div>
    <footer>
      <div v-if="!proceed">
        <button @click="$emit('close')">Cancel</button>
        <button class="bg-accent shadow-md" @click="proceed = !proceed">Proceed</button>
      </div>
      <div v-else>
        <button @click="proceed = !proceed">Return</button>
        <!-- <button class="bg-accent shadow-md" @click="submitForm">Submit</button> -->
        <Button-Action :submit="true" :loading="loading" @click="submitForm" :text="'Submit'"/>
      </div>
    </footer>
  </div>
</template>
<script>
export default {
  props: [ 'conflicts' ],
  mounted() {
    this.setAvailable(this.newDate)
  },
  data: () => ({
    loading: false,
    proceed: false,
    index: 1,
    inputs: [
      {
       label: 'First Name',
       id: 'name',
       error: false
      },
      {
        label: 'Phone Number',
        id: 'phone',
        error: false
      },
      {
       label: 'Email Address',
       id: 'email',
       email: true,
       error: false
      },
    ],
    days: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ],
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
    name: '',
    phone: '',
    email: '',
    selectTime: null,
    filteredTimes: [],
    unavailableAmStart: null,
    unavailableAmEnd: null,
    unavailablePmStart: null,
    unavailablePmEnd: null,
    availableTimes: [],
    unavailable: []
  }),
  methods: {
    validateEmail(email) {
      return String(email)
        .toLowerCase()
        .match(
          /^\S+@\S+\.\S+$/
        )
    },
    async setAvailable(date) {
      const dateObj = new Date(date),
      startAvailable = new Date(dateObj).setHours(6),
      endAvailable = new Date(dateObj).setHours(19),

      amUnavailableStart = new Date(dateObj).setHours(0),
      amUnavailableEnd = new Date(dateObj).setHours(6),
      pmUnavailableStart = new Date(dateObj).setHours(19),
      pmUnavailableEnd = new Date(dateObj).setHours(24)

      this.availableTimes.push({
        start: new Date(startAvailable),
        end: new Date(endAvailable)
      })

      this.unavailable.push(
        {
          conflict: true,
          start: new Date(amUnavailableStart),
          end: new Date(amUnavailableEnd)
        },
        {
          conflict: true,
          start: new Date(pmUnavailableStart),
          end: new Date(pmUnavailableEnd)
        },
      )
      this.availableTimes = this.setTimes(startAvailable, endAvailable)
      this.filteredTimes = this.availableTimes
        .filter((time) => {
          let kateyConflict,
          paulConflict
          const { katey, paul } = this.conflicts
          katey.forEach(conflict => {
            const isoTime = time.toISOString(),
            isoConflict = new Date(conflict.start).toISOString(),
            comp = isoTime >= isoConflict
            kateyConflict = comp
          })
          paul.forEach(conflict => {
            const isoTime = time.toISOString(),
            isoConflict = new Date(conflict.start).toISOString(),
            comp = isoTime >= isoConflict
            paulConflict = comp
          })
          return !kateyConflict || !paulConflict ? true : false
        })
    },
    setTimes(start, end, trainer) {
      const available = [],
      initialTime = new Date(start),
      endTime = new Date(end),
      mins = endTime.getMinutes(),
      func = () => initialTime.setMinutes(initialTime.getMinutes() + 15)
      for (let i = 0; initialTime < endTime; func() ) {
        switch (true) {
          default:
            const date = new Date(initialTime)
            available.push(date)
        }
      }
      return available
    },
    async submit() {
      const { email, message } = this
      switch(true) {
        case !email:
          this.$emit('error', {
            message: 'Please include an email'
          })
          break
      }      
    },
    submitForm() {
      try {
        const { name, phone, email, selectTime } = this
        this.loading = true
        switch (true) {
          case !selectTime:
            this.proceed = false
            throw {
              message: 'Please select a time'
            }
          case !name:
            throw {
              message: 'Please include a first name'
            }
          case !phone:
            throw {
              message: 'Please include a phone number'
            }
          case !email:
            throw {
              message: 'Please include an email'
            }
          case !this.validateEmail(email):
            throw {
              message: 'Please include a valid email'
            }
          default:
            this.reset()
            this.$emit('submit', { name, phone, email, selectTime })
            this.$emit('close')
        }
      } catch(error) {
        this.$emit('error', error)
        setTimeout(() => this.loading = false, 2000)
      }
    },
    reset() {
      this.loading = false
      this.proceed = false
      this.index = 1
      this.selectTime = null
      this.name = null
      this.email = null
      this.phone = null
    },
    checkConflicts(val, conflicts) {
      return conflicts.includes(val)
        ? false
        : true
    },
    clear(i) {
      this.inputs[i].error = false
    },
    error(i) {
      this.inputs[i].error = true
    }
  },
  computed: {
    newDate() {
      const date = new Date().setHours(new Date().getHours() + ( 24 * this.index )),
      newDate = new Date(date)
      newDate.setMinutes(0)
      newDate.setSeconds(0)
      newDate.setMilliseconds(0)
      return newDate
    },
    formValidation() {
      const { name, email, phone, selectTime } = this,
      condition = !!name && !!phone && !!email && !!selectTime
      return condition
        ? false
        : true
    }
  },
  filters: {
    filteredTime(val) {
      const date = new Date(val),
      hours = date.getHours(),
      minutes = date.getMinutes()

      return `${ hours }:${ minutes == 0 ? minutes + '0' : minutes }`
    },
    filteredDate(val, days, months) {
      const date = new Date(val),
      day = date.getDay(),
      dateInt = date.getDate(),
      month = date.getMonth(),
      year = date.getYear()
      return `${ days[day] } ${ months[month] } ${ dateInt }, ${ year + 1900 }`
    }
  }
}
</script>
