<template>
  <div v-if="!trainer" class="h-full flex items-center justify-center">
    <span class="bg-gray-700 p-4 rounded max-w-md space-y-4">
      <h2>
        Which trainer's calendar would you like to view?
      </h2>
      <footer class="flex space-x-2">
        <button class="w-full border" @click="setTrainer('katey')">Katey</button>
        <button class="w-full border" @click="setTrainer('paul')">Paul</button>
      </footer>
    </span>
  </div>
  <div v-else>
    <Dialog
      @refresh="refresh"
      :component="'Scheduling-Window'"
      :buttonless="true"
      :footerless="true"
      :data="dialogData"/>
    <span v-if="!calendar">
      <header>
        <span>
          <Button-Toggle
            v-model="trainer"
            class="pl-3"
            @input="toggleTrainer"/>
          <div>
            <button v-if="!today" @click="decrement">
              <img :src="require('~/assets/svg/chevron-left.svg')" alt="">
            </button>
            <button class="accent" @click="setDate(true)">
              <img :src="require('~/assets/svg/calendar.svg')" alt="">
            </button>
            <button @click="increment">
              <img :src="require('~/assets/svg/chevron-right.svg')" alt="">
            </button>
          </div>
        </span>
        <h2>{{ selectDate || date | day }}</h2>
      </header>
      <Schedule
        v-if="!loading"
        :user="user"
        :today="today"
        :unavailable="unavailable"
        :available="available"
        @openDialog="openDialog" />
    </span>
    <span v-else>
      <Calendar @select="select" :date="date" :month="month" :year="year"/>
      <Calendar @select="select" :date="date" :month="month + 1" :year="year"/>
      <Calendar @select="select" :date="date" :month="month + 2" :year="year"/>
    </span>
  </div>
</template>
<script>
import { mapMutations, mapActions, mapState } from 'vuex'
export default {
  layout: 'app',
  head: () => ({
    title: 'Scheduling'
  }),
  async asyncData({ store, query }) {
    const { trainer } = query,
    data = await store
      .dispatch('scheduling/scheduleInit', {
        trainer
      })
    return data
  },
  async mounted() {
    const { trainer, selectDate } = this
    if (trainer) {
      await this.setAvailable(selectDate)
      this.loading = false
    }
  },
  data: () => ({
    available: [],
    availableOrig: [],
    dialogData: {},
    loading: true,
    sessions: [],
    unavailableAmStart: null,
    unavailableAmEnd: null,
    unavailablePmStart: null,
    unavailablePmEnd: null
  }),
  methods: {
    ...mapMutations(['DIALOG_SET', 'CALENDAR_SET']),
    ...mapActions('scheduling', ['scheduleList']),
    ...mapActions('db', ['dbRead']),
    addSession() {
      if (this.userSession.length) {
        const { uid } = this,
        { start, end, id, sessionStart, productId, productLength, serviceId, trainer } = this.userSession[0],
        dateObj = new Date(sessionStart),
        sessionEnd = new Date(dateObj.setMinutes(dateObj.getMinutes() + productLength))
        if (trainer == this.trainer) {
          this.available.push({
            start,
            end,
            sessionStart,
            id,
            productId,
            productLength,
            serviceId,
            session: true,
            trainer: this.trainer,
          })
          this.addTravel(sessionEnd)
        }
      }
    },
    addTravel(sessionEnd) {
      const { available, unavailable, userSession} = this
      if (available.length >= 1) {
        // manage conflicts before / after + session
        userSession.forEach((session) => {
          this.unavailable.push(
            {
              conflict: true,
              travel: true,
              start: session['start'],
              end: session['sessionStart']
            },
            {
              conflict: true,
              travel: true,
              start: sessionEnd,
              end: session['end']
          })
          this.unavailable.splice(this.unavailable.indexOf(session), 1)
        })
      } else {
        // showing no available, just session
        this.userSession.forEach((session) => {
          this.unavailable.forEach((unavailable, i) => {
            if (!Object.keys(unavailable).includes('id')) {
              const start = new Date(session['start']).setMilliseconds(0)
              const end = new Date(session['end']).setMilliseconds(0)
              const c1 = new Date(start).toISOString() <= unavailable['end']
              const c2 = new Date(end).toISOString() >= unavailable['start']
              // Modifying is not an option
              if (c1 && c2) {
                this.unavailable[this.unavailable.indexOf(session)].start = this.unavailableAmStart
                this.unavailable[this.unavailable.indexOf(session)].end = session['sessionStart']
                this.unavailable.splice(this.unavailable.length - 2, 1)
                this.unavailable.splice(this.unavailable.length - 1, 1)
                this.unavailable.push({
                  conflict: true,
                  start: sessionEnd,
                  end: this.toISO(this.unavailablePmEnd),
                  uid
                })
              }
            }
          })
        })
      }
    },
    checkConflicts() {
      const { available, unavailable } = this
      unavailable.filter(un => Object.keys(un).includes('id'))
        .forEach((session) => {
          available.forEach((slot, i) => {
            if (i == 0) {
              this.compareTimes({
                un: session,
                av: {
                  start: slot['start'],
                  end: slot['end']
                },
                i
              })
            }
          })
        })
    },
    compareTimes({ un, av, i }) {
      const { available, unavailable } = this,
      c1 = un['start'] > av['start'],
      c2 = un['start'] < av['end'],
      c3 = un['end'] > av['start'],
      c4 = un['end'] < av['end'],
      c5 = un['start'] == av['start'],
      c6 = un['end'] == av['end'],
      c7 = un['end'] >= av['end'],
      c8 = un.start < av.start
      switch (true) {
        case c8 && c3:
          if (c4) {
            available[i].start = un.end
          } else {
            available.splice(i, 1)
          }
          break
        case c5 && c7:
          const index = this.available.indexOf(av)
          this.available.splice(index, 1)
          break
        case c5 && c6:
          available.splice(0, 1)
          unavailable.splice(0, 2)
          unavailable[0].start = unavailable[0].end
          break
        case c5:
          if (this.userSession.indexOf(un) == -1) {
            available[i].start = un['end']
            unavailable[unavailable.length - 2].end = un['end']
            unavailable.splice(unavailable.indexOf(un), 1)
          } else {
            available[i].start = un['end']
            unavailable[unavailable.length - 2].end = un['end']
          }
          break
        case c6 && un.uid !== this.uid:
          available[i].end = un['start']
          break
        case c1 && c3:
          if (new Date(un['end']).getHours() < 19 && un.end !== available[i].end && un.end < available[i].end ) {
            available.push({
              start: un['end'],
              end: available[i].end
            })
            available[i].end = un['start']
          }
          if (available[i].end >= un['end'] && available[i].start <= un['start']) {
            available[i].end = un['start']
          } else {
            available[i].end = un['start']
          }
          break
        case c1 && c2:
          available.push({ start: un['end'], end: available[i].end })
          available[i].end = un['start']
          break
        case c3 && c4 && !Object.keys(un).includes('id'):
          available[i].start = un['end']
          unavailable[unavailable.length - 2].end = un['end']
          unavailable.splice(unavailable.indexOf(un), 1)
          break
        case c3 && c4 && Object.keys(un).includes('id'):
          available[i].start = un['end']
      }
    },
    async decrement() {
      const date = this.selectDate,
      dateObj = new Date(date),
      hour = dateObj.getHours(),
      prev = dateObj.setHours(hour - 24)
      this.selectDate = dateObj.toISOString()
    },
    async increment() {
      const date = this.selectDate,
      dateObj = new Date(date),
      hour = dateObj.getHours(),
      next = dateObj.setHours(hour + 24)
      this.selectDate = dateObj.toISOString()
    },
    mergeAvailable() {
      const { available } = this
      available.filter(av => {
        return av.session
      }).forEach((session, i) => {
        let sessionEnd
        const filter = available.filter((comp, i) => {
          sessionEnd = new Date(session.end)
          sessionEnd.setHours(sessionEnd.getHours() - 1)
          return session.id !== comp.id
            && new Date(session.end).toISOString() >= new Date(comp.start).toISOString()
            && new Date(session.end).toISOString() <= new Date(comp.end).toISOString()
        })
        if (filter.length) {
          this.available[available.indexOf(filter[0])].start = session.end
        }
      })
    },
    mergeUnavailable() {
      const { unavailable, unavailableAmStart, unavailablePmEnd } = this
      unavailable.filter(un => Object.keys(un).includes('id'))
        .forEach(session => {
          const compIndex = unavailable.indexOf(session)
          unavailable.filter((un, i) => Object.keys(un).includes('id') && i !== compIndex)
            .forEach(conflict => {
              const sess = unavailable.indexOf(session),
              comp = unavailable.indexOf(conflict),
              c1 = session.end <= conflict.end,
              c2 = session.end >= conflict.start
              if (c1 && c2) {
                this.unavailable[sess].end = conflict.end
                this.unavailable.splice(comp, 1)
              }
            })
      })
      unavailable.filter(un => Object.keys(un).includes('id'))
        .forEach(session => {
          const allDay = unavailable.filter(con => !Object.keys(con).includes('id')
            && session.end <= con.end
            && session.end >= con.start).length,
          amConflict = unavailable.filter(con => {
            return !Object.keys(con).includes('id')
            && !Object.keys(con).includes('travel')
            && session.start <= con.end
            && session.end > con.end
          }),
          pmConflict = unavailable.filter(con => {
            return !Object.keys(con).includes('id')
            && !Object.keys(con).includes('travel')
            && session.end >= con.start
            && session.end < con.end
          })
          switch (true) {
            case allDay:
              console.log('Dont delete me')
              this.unavailable.push({
                conflict: true,
                start: unavailableAmStart,
                end: unavailablePmEnd,
                allDay: true
              })
              break
            case amConflict.length > 0:
              let index = unavailable.indexOf(amConflict[0]),
              sessIndex = unavailable.indexOf(session)
              if (Object.keys(amConflict[0]).includes('allDay')) {
                this.unavailable.splice(sessIndex, 1)
              } else {
                this.unavailable[index].end = session.end
                this.unavailable.splice(sessIndex, 1)
              }
              break
            case pmConflict.length > 0:
              index = unavailable.indexOf(pmConflict[0])
              if (Object.keys(pmConflict[0]).includes('allDay')) {
                this.unavailable.splice(sessIndex, 1)
              } else {
                if (!this.today) {
                  this.unavailable[index].start = session.start
                }
                this.unavailable.splice(sessIndex, 1)
              }
              break
          }
        })
      unavailable.filter(un => !Object.keys(un).includes('id') && !Object.keys(un).includes('travel'))
        .forEach(noKey => {
          const compIndex = unavailable.indexOf(noKey)
          const allDay = unavailable.filter((con, i) => !Object.keys(con).includes('id')
            && !Object.keys(con).includes('travel')
            && i !== compIndex
            && noKey.end <= con.end
            && noKey.end >= con.start)
          if (allDay.length > 0) {
            this.unavailable = []
            this.unavailable.push({
              conflict: true,
              start: unavailableAmStart,
              end: unavailablePmEnd,
              allDay: true
            })
          }
        })
    },
    openDialog(evt) {
      const { available, availableOrig, date, trainer, inventory, cards, unavailable, unavailableOrig, userSession, uid } = this
      this.dialogData = {
        ...evt,
        available,
        availableOrig,
        unavailable,
        unavailableOrig,
        userSession,
        date,
        trainer,
        inventory,
        cards,
        uid,
      }
      this.DIALOG_SET('Scheduling-Window')
    },
    async refresh() {
      this.updateData()
    },
    async setAvailable(date) {
      const tz = 7,
      dateObj = new Date(date),
      startAvailable = new Date(dateObj).setHours(6),
      endAvailable = new Date(dateObj).setHours(19),
      amUnavailableStart = new Date(dateObj).setHours(0),
      amUnavailableEnd = new Date(dateObj).setHours(6),
      pmUnavailableStart = new Date(dateObj).setHours(19),
      pmUnavailableEnd = new Date(dateObj).setHours(24)

      dateObj.setHours(dateObj.getHours() + tz)
      this.unavailableAmStart = new Date(amUnavailableStart).toISOString()
      this.unavailableAmEnd = new Date(amUnavailableEnd).toISOString()
      this.unavailablePmStart = new Date(pmUnavailableStart).toISOString()
      this.unavailablePmEnd = new Date(pmUnavailableEnd).toISOString()

      this.availableOrig.push({
        start: this.toISO(startAvailable),
        end: this.toISO(endAvailable)
      })

      let currentHour,
      session,
      travelStart,
      validChange

      if (this.userSession.length) {
        currentHour = new Date().getHours() + 1
        session = this.userSession[0]
        travelStart = new Date(session.start).getHours()
        validChange = currentHour < travelStart
      }

      if (this.today && !this.userSession.length) {
        this.unavailable.push({
          conflict: true,
          allDay: true,
          start: this.toISO(amUnavailableStart),
          end: this.toISO(pmUnavailableEnd)
        })
      } else {
        this.unavailable.push(
          {
            conflict: true,
            start: this.toISO(amUnavailableStart),
            end: this.toISO(amUnavailableEnd)
          },
          {
            conflict: true,
            start: this.toISO(pmUnavailableStart),
            end: this.toISO(pmUnavailableEnd)
          },
        )
      }
      this.available = []
      switch(true) {
        case this.today && this.userSession.length == 1:
          if ( validChange ) {
            this.available.push({
              start: this.toISO(this.toISO(new Date(dateObj).setHours(currentHour + 2))),
              end: this.toISO(endAvailable)
            })
          } else {
            this.unavailable[this.unavailable.length - 1].start = session.end


          }
          break
        case !this.today:
          this.available.push({
            start: this.toISO(startAvailable),
            end: this.toISO(endAvailable)
          })
      }

      const amUnavailable = this.unavailable[this.unavailable.length - 2]
      if (this.today && amUnavailable) {
        // "Follow" current time for first unavailble end time
        if ( new Date() > new Date(amUnavailable.end)) {
          const date = new Date()
          const hr = date.getHours()
          date.setHours(hr + 2)
          date.setMinutes(0)
          this.unavailable[this.unavailable.length - 2].end = this.toISO(date)
          if (this.available.length) {
            this.available[0].start = this.toISO(date)
          }
        }
      }

      this.checkConflicts()
      this.addSession()
      this.mergeUnavailable()
      this.mergeAvailable()
    },
    async setTrainer(val) {
      this.trainer = val

      const { uid, selectDate, trainer } = this,
      inventory = await this.dbRead({ url: `documents/users/${ uid }/inventory` }),
      { unavailable, unavailableOrig, userSession } = await this.scheduleList({ selectDate, uid, trainer })

      this.inventory = inventory
      this.unavailable = unavailable
      this.unavailableOrig = unavailableOrig
      this.userSession = userSession
      await this.setAvailable(selectDate)
      this.loading = false
    },
    setDate(bool) {
      this.CALENDAR_SET(bool)
    },
    async select(event) {
      const { year, month, day} = event,
      dateObj = new Date(year, month, day),
      hour = dateObj.getHours() + 7

      dateObj.setHours(hour)
      this.selectDate = dateObj.toISOString()
      this.CALENDAR_SET(false)
    },
    toDateString(val) {
      return new Date(val).toISOString().substr(0, 10)
    },
    toggleTrainer() {
      if (this.trainer == 'katey') {
        this.trainer = 'paul'
      } else {
        this.trainer = 'katey'
      }
    },
    toISO(val) {
      const date = new Date(val)
      date.setSeconds(0)
      return date.toISOString().replace(/\.[0-9]{3}/, '')
    },
    async updateData() {
      const { selectDate, trainer, user } = this,
      { unavailable, unavailableOrig, userSession } = await this.scheduleList({
        selectDate,
        trainer,
        uid: user['localId']
      })
      this.unavailableOrig = unavailableOrig
      this.userSession = userSession
      this.unavailable = unavailable
      await this.setAvailable(selectDate)
    },
  },
  computed: {
    ...mapState(['calendar']),
    ...mapState('auth', ['user']),
    today() {
      if ( this.selectDate) {
        return this.date == this.selectDate.substr(0, 10) ? true : false
      } else {
        return true
      }
    },
    year() {
      return new Date(this.date).getFullYear()
    },
    month() {
      return new Date(this.date).getMonth()
    }
  },
  filters: {
    day(val) {
      const str = new Date(val).toUTCString()
      return str.slice(0, -13)
    }
  },
  watch: {
    async trainer(val, oldVal) {
      if (oldVal) {
        if (this.userSession.length) {
          this.available.splice(this.available.indexOf(this.sessions[0]), 1)
        }
        this.unavailable = this.unavailableOrig.filter(doc => doc.trainer == this.trainer)
        await this.updateData()
      }
    },
    async selectDate(val) {
      await this.updateData()
    }
  }
}
</script>

<style scoped>
p {
  @apply text-lg
}

h2 {
  @apply text-2xl font-semibold
}

h3 {
  @apply text-3xl
}

h4 {
  @apply text-lg font-semibold
}

header {
  @apply p-4 pt-20 bg-red-800 relative
}

header > span {
  @apply absolute top-4 right-0 p-1 flex w-full justify-between
}
span > div {
  @apply flex items-center
}

div > button {
  @apply rounded-full h-10 w-10 p-3
}

div > button.accent {
  @apply bg-blue-500 p-2
}
</style>
