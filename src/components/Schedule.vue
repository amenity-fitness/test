<template>
<main>
  <h4>Select from an available timeslot</h4>
  <transition-group appear class="space-y-2" name="fade">
    <div
      v-for="(item, i) in filteredAvailable"
      :key="`conflict-${i}`"
      v-on="openDialog(item)"
      :class="bgColor(item)">
      <h4>{{ itemMessage(item) }} {{ item.session && item.trainer ? `with ${item['trainer'].charAt(0).toUpperCase() + item['trainer'].slice(1)}` : '' }}</h4>
      <!-- {{ item }} -->
      <!-- {{ item.id || 'No Key' }} -->
      <p>{{ sessionStart(item) || item.start | hr }} - {{ sessionEnd(item) || item.end | hr }}</p>
    </div>
  </transition-group>
</main>
</template>
<script>
export default {
  props: ['unavailable', 'available', 'today', 'user'],
  methods: {
    bgColor(item) {
      switch(true) {
        case item.travel:
          return 'bg-orange-500/50'
        case item.session:
          return 'bg-yellow-500/50'
        case item.conflict:
          return 'bg-red-500/50'
        default:
          return 'bg-green-500/50'
      }
    },
    itemMessage(item) {
      switch(true) {
        case item.travel:
          return 'Travel Time'
        case item.allDay:
          return 'Unavailable: All Day'
        case item.session:
          return 'Session'
        case item.conflict:
          return 'Unavailable'
        default:
          return 'Available'
      }
    },
    openDialog(item) {
      const currentHr = new Date().getHours(),
      comp = new Date(item['sessionStart']),
      compHr = comp.getHours() - 2,
      c1 = currentHr >= compHr && this.today,
      c2 = c1 && item['session'],
      c3 = c1 && !item['conflict']

      switch (true) {
        case item['conflict']:
          return { click: () => null }
        case c2 || c3:
          return { click: () => this.$emit('openDialog', { ...item, lateCancel: true }) }
        default:
          return { click: () => this.$emit('openDialog', { ...item }) }
      }
    },
    sessionEnd({session, sessionStart, conflict, productLength, uid}) {
      if (uid == this.user['uid']) {
        const date = new Date(sessionStart)
        switch (true) {
          case session:
            return date.setMinutes(date.getMinutes() + productLength)
          case sessionStart && conflict:
            return sessionStart
        }
      }
    },
    sessionStart({ conflict, sessionStart }) {
      if (conflict) {
        return false
      }
      return sessionStart
    }
  },
  computed: {
    filteredAvailable() {
      const res = this.filteredEnd.sort((a, b) => {
        let da = new Date(a.start),
            db = new Date(b.start)
        return da - db
      })
      return res
    },
    filteredEnd() {
      const res = this.unavailable.concat(this.available).sort((a, b) => {
        let da = new Date(a.end),
            db = new Date(b.end)
        return da - db
      })
      return res
    }
  },
  filters: {
    hr(val) {
      const hr = new Date(val).getHours(),
      min = new Date(val).getMinutes()
      return `${hr}:${min == 0 ? '00' : min}`
    }
  }
}
</script>
<style scoped>
h4 {
  @apply pb-2
}
div {
  @apply p-2 rounded transition-all
}
main {
  @apply p-4
}
</style>
