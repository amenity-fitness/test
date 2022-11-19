<template>
  <div class="relative">
    <button class="absolute bg-gray-600/50 m-2 rounded-full p-0 -top-8 -right-8" @click="closeWindow">
      <img src="~/assets/svg/plus.svg" class="rotate-45 h-8 w-8 fill-white">
    </button>
    <section v-if="updateReceipt">
      <h2>Confirm Updated Booking</h2>
      <h6>{{ time | finalDate }}</h6>
      <div class="bg-black/10 p-4">
        <h3>{{ userSession[0].serviceId | capitalize }} {{ userSession[0].productLength + '-minute' }} {{ userSession[0].productId | capitalize }} Training with {{ trainer | capitalize }}</h3>
      </div>
      <footer>
        <button @click="receipt = false">
          Return
        </button>
        <button @click="sessionUpdate(time)" class="bg-green-500/50">
          Confirm
        </button>
      </footer>
    </section>
    <section v-else-if="existingSession">
      You have already booked a session on this day
      {{ trainer !== userSession[0].trainer ? `with ${ capitalizeFn(userSession[0].trainer) }` : '' }}
    </section>
    <section v-else-if="session">
      <div v-if="confirm">
        <h2>
          {{ sessionStart | finalDate }}
        </h2>
        <h3>
          Are you positive you would like to cancel? Your session will be credited back to you if you confirm.
        </h3>
      </div>
      <div v-else>
        <div v-if="!modify">
          <h2>
            {{ sessionStart | finalDate }}
          </h2>
          <h3>
            Trainer: {{ trainer | capitalize }}
          </h3>
          <p v-if="lateCancel" class="text-center mt-2 -mb-2">
            A session within 2 hours can only be cancelled, not modified
          </p>
        </div>
        <div v-else>
          <h2>Select A New Time</h2>
          <span class="grid grid-cols-2 max-h-72 gap-2 p-2 overflow-y-scroll bg-gray-800">
            <button v-for="(item, i) in filteredAvailable" :key="i" class="bg-green-500/50" :disabled="isSession(item)" @click="receipt = true; time = item">
              {{ item | hr }}
            </button>
          </span>
        </div>
      </div>
      <footer>
        <button
          v-if="!modify"
          :disabled="lateCancel && !confirm"
          class="border"
          v-on="confirm ? { click: conditionalPrevious } : { click: modifyTime }">
          {{ confirm ? 'No, Return' : 'Modify Time' }}
        </button>
        <button v-else @click="modify = false">Return</button>
        <button
          v-if="!modify"
          class="bg-red-500/50"
          @click="conditionalProceed">
          {{ confirm ? 'Yes, Confirm' : 'Cancel Session' }}
        </button>
      </footer>
    </section>
    <section v-else-if="hash == 4">
      <h2>Confirm Booking</h2>
      <h6>{{ time | finalDate }}</h6>
      <div class="bg-black/10 p-4">
        <h3>{{ service | capitalize }} {{ product['name'] }} with {{ trainer | capitalize }}</h3>
      </div>
      <h6 v-if="qty > 1" class="text-center">
        + {{ qty - 1 }} {{ service | capitalize }} {{ product['name'] }}
      </h6>
      <span v-if="receipt">
        <hr>
        <h6>Total: {{ total }} CAD</h6>
        <h6>{{ selectCard | formatCard }}</h6>
      </span>
      <footer>
        <button @click="conditionalPrevious">Return</button>
        <Button-Action @click="conditionalProceed" :loading="loading" :text="conditionalText"/>
      </footer>
    </section>
    <section v-else-if="hash == 3">
      <span class="space-y-4" v-if="payment">
        <span v-if="!newCard && cards.length">
          <h2>Select A Card</h2>
          <div id="cards" v-for="(card, i) in cards" :key="i" class="flex items-center">
            <label for="" name="card">{{ card | formatCard }}<br>{{ card | formatExpiry }}
            </label>
            <button @click="removeCard(card)">Delete</button>
            <div class="grow"></div>
            <input v-model="selectCard" type="radio" id="card" :value="card">
          </div>
          <button @click="newCard = true">Add new card</button>
        </span>
        <span v-else>
          <h2>Provide A Payment Source</h2>
          <span class="flex flex-wrap justify-between">
            <p>Please provide a valid credit card, and choose if you would like to save for future payments</p>
            <Floating-Input
              v-for="(input, i) in inputs" :key="i"
              v-model="card[input.id]"
              class="mb-2"
              :class="i == 0 ? 'w-full' : 'w-[33%]'"
              :data="input"
              @focus="activeInput = $event"
              @next="next"/>
          </span>
          <div class="flex items-center space-x-2 pt-2">
            <input type="checkbox" v-model="attach">
            <label>Save card for future use?</label>
          </div>
        </span>
      </span>
      <h3 v-else-if="!consent">To proceed you must have purchased a {{ service | capitalize }} {{ product['name'] }} session, would you like to proceed to pay by credit card?</h3>
      <span class="space-y-4" v-else>
        <h3>How many {{ product['duration'] + ' Minute' }} {{ product['id'] | capitalize }} {{ service | capitalize }}?</h3>
        <span id="qty" class="flex items-center justify-center">
          <button :disabled="qty == 0" @click="qty--">
            <img class="w-8" src="~/assets/svg/minus.svg" alt="">
          </button>
          <h2>{{ qty }}</h2>
          <button @click="qty++">
            <img class="w-8" src="~/assets/svg/plus.svg" alt="">
          </button>
        </span>
        <h6>Volume discounts occur above 6 (10%), and 12 (15%) sessions</h6>
        <h5>Total: {{ total }} CAD</h5>
      </span>
      <footer>
        <button @click="conditionalPrevious">Return</button>
        <Button-Action @click="conditionalProceed" v-if="newCard" :disabled="valid" :loading="loading" :text="'Continue'"/>
        <button v-else class="bg-green-500/50" @click="conditionalProceed" v-html="conditionalText"/>
      </footer>
    </section>
    <section v-else-if="hash == 2">
      <h2>{{ availableBookings.length ? 'Select A Time' : 'Sorry, Not Enough Time Available' }}</h2>
      <span v-if="availableBookings.length" class="grid grid-cols-2 max-h-72 gap-2 p-2 overflow-y-scroll bg-gray-800">
        <button v-for="(item, i) in availableBookings" :key="i" @click="selectTime(item)" class="bg-green-500/50">
          {{ item | hr }}
        </button>
      </span>
      <footer>
        <button @click="selectProduct(null)">Return</button>
      </footer>
    </section>
    <section v-else-if="hash == 1">
      <span v-for="(product, key, i) in products" :key="i">
        <div v-if="service == key" class="space-y-4">
          <h2>{{ service | capitalize }} products</h2>
          <ul>
            <li v-for="(offer, i) in products[service]" :key="i">
              <span>
                <h3>
                  {{ offer.name }}
                </h3>
                <p>
                  {{ offer.description }}
                </p>
              </span>
              <button @click="selectProduct(offer)">
                Select
              </button>
            </li>
            <footer>
              <button @click="setService(null)">
                Return
              </button>
            </footer>
          </ul>
        </div>
      </span>
    </section>
    <section v-else-if="hash == 0">
      <h2>Select a service</h2>
      <ul>
        <li v-for="(serv, key, i) in services" :key="i">
          <span>
            <h3>{{ key | capitalize }}</h3>
            <p>{{ serv.description }}</p>
          </span>
          <button @click="setService(key)">
            View
          </button>
        </li>
      </ul>
    </section>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  props: [
    'available',
    'availableOrig',
    'cards',
    'start',
    'end',
    'id',
    'inventory',
    'lateCancel',
    'persistent',
    'productId',
    'productLength',
    'serviceId',
    'session',
    'sessionStart',
    'trainer',
    'uid',
    'unavailable',
    'unavailableOrig',
    'userSession'
  ],
  data: () => ({
    activeInput: null,
    attach: false,
    availableBookings: [],
    card: {},
    confirm: false,
    consent: false,
    hash: 0,
    inputs: [
      {
        id: 'number',
        label: 'Card Number',
        error: false
      },
      {
        id: 'exp_month',
        label: 'Exp. Month',
        error: false
      },
      {
        id: 'exp_year',
        label: 'Exp. Year',
        error: false
      },
      {
        id: 'cvc',
        label: '3-digit CVC',
        error: false
      }
    ],
    loading: false,
    modify: false,
    newCard: false,
    number: null,
    payment: false,
    product: null,
    products: {
      mobile: [
        {
          name: '60-minute Private Training',
          description: 'Just you and your trainer',
          id: 'private',
          duration: 60,
          rate: 150,
        },
        {
          name: '60-minute Partner Training',
          description: 'You, your best mate and your trainer',
          id: 'partner',
          duration: 60,
          rate: 75
        },
        {
          name: '90-minute Private Training',
          description: 'Just you and your trainer',
          id: 'private',
          duration: 90,
          rate: 180
        },
        {
          name: '90-minute Partner Training',
          description: 'You, your best mate and your trainer',
          id: 'partner',
          duration: 90,
          rate: 90
        },
      ],
      studio: [
        {
          name: '60-minute Private Training',
          description: 'Just you and your trainer',
          id: 'private',
          duration: 60,
          rate: 90
        },
        {
          name: '60-minute Partner Training',
          description: 'You, your best mate and your trainer',
          id: 'partner',
          duration: 60,
          rate: 45
        },
        {
          name: '45-minute Group Training',
          description: 'You, 2 or more of your best mates and your trainer',
          id: 'group',
          duration: 45,
          rate: 30
        }
      ],
      remote: [
        {
          name: '30-minute Private Check-in',
          description: 'Get your answers and updates to your long-term program',
          id: 'private',
          duration: 30,
          rate: 60
        }
      ]
    },
    qty: 1,
    receipt: false,
    selectCard: null,
    service: null,
    services: {
      mobile: {
        description: 'Have us meet you in you at home or in a shared fitness space'
      },
      studio: {
        description: 'Meet up with us at our primary service location @ Gore & Union st.'
      },
      remote: {
        description: 'Recieve a check-in with one of our trainers to ask questions and recieve program updates'
      }
    },
    time: false,
  }),
  methods: {
    ...mapActions('db', ['dbCreate', 'dbWrite']),
    ...mapActions('scheduling', ['sessionAdd', 'sessionRemove']),
    ...mapActions('billing', ['chargeCreate']),
    capitalizeFn(val) {
      return val.substr(0, 1).toUpperCase() + val.slice(1)
    },
    async cardAdd() {
      const { attach, card } = this,
      res = await this.$store.dispatch('billing/cardToken', {
        attach,
        card
      })
      if ( res.card ) {
        if (attach) {
          this.cards.push(res.card)
        }
        this.setHash(4)
        this.payment = false
        this.newCard = false
        this.card = {}
        this.selectCard = res
        this.receipt = true
      }
      this.loading = false
    },
    closeWindow() {
      this.$emit('close')
      this.setHash(0)
      setTimeout(async () => {
        this.confirm = false
        this.product = null
        this.service = null
        this.time = null
        this.receipt = false
        this.loading = false
        this.qty = 1
        this.availableBookings = []
        this.modify = false
      }, 1000)
    },
    conditionalPrevious() {
      const { session, confirm, receipt, newCard, consent, payment, hash } = this
      const { time, inventory, service, product } = this
      switch(true) {
        case hash == 4:
          if (this.hasSession) {
            this.setHash(2)
          } else {
            this.setHash(3)
          }
          break
        case session && confirm:
          this.confirm = false
          break
        case time && inventory[service][product.id][product.duration] >= 1:
          this.time = false
        case receipt:
          this.receipt = false
          break
        case newCard:
          this.newCard = false
          break
        case payment:
          this.payment = false
          break
        case consent:
          this.time = false
          this.product = null
          this.consent = false
          this.qty = 1
          break
        case !consent:
          this.time = false
          this.product = null
          break
      }
    },
    async conditionalProceed() {
      const { cards, consent, payment, newCard, session, confirm, time, inventory, service, receipt, product } = this
      switch(true) {
        case newCard || payment && !cards.length:
          this.loading = true
          this.cardAdd()
          break
        case session && !confirm:
          this.confirm = true
          break
        case session && confirm:
          this.sessionCancel()
          break
        case time && inventory[service][product['id']][product['duration']] >= 1:
          this.loading = true
          this.sessionBook()
          break
        case receipt:
          this.loading = true
          this.handlePurchase()
          break
        case payment && cards.length && !newCard:
          this.setHash(4)
          this.receipt = true
          break
        case !consent:
          this.consent = true
          break
        case consent:
          this.payment = true
      }
    },
    async handlePurchase() {
      const { service, product, qty, selectCard } = this,
      charge = await this.chargeCreate({
        card: selectCard,
        total: product['rate'] * qty
      }),
      { status } = charge['data']
      if ( status == 'succeeded' ) {
        this.setInventory({ service, product, qty })
        await this.sessionBook()
      }
    },
    isSession(item) {
      const one = new Date(item)
      one.setMilliseconds(0)
      const two = new Date(this.userSession[0].sessionStart)
      two.setMilliseconds(0)
      const c = new Date(item).toUTCString() == new Date(this.userSession[0].sessionStart).toUTCString()
      return c ? true : false
    },
    next() {
      const e = this.activeInput,
      next = e.parentElement.nextSibling
      next.querySelector('input').focus()
    },
    async removeCard(card) {
      const success = await this.$store.dispatch('billing/cardDelete', card)
      if ( success ) {
        this.cards.splice(this.cards.indexOf(card), 1)
        this.cards.length < 1 ? this.newCard = true : null
      }
    },
    modifyTime() {
      this.modify = true
    },
    selectProduct(val) {
      if (!val) {
        this.setHash(1)
      } else {
        this.setHash(2)
      }
      this.product = val
    },
    selectTime(item) {
      const { inventory, service, product } = this
      if (inventory[service][product.id][product.duration] >= 1) {
        this.setHash(4)
      } else {
        this.setHash(3)
      }
      this.time = item
    },
    async sessionBook() {
      try {
        const { trainer, product, service, time, user, inventory } = this,
        { qty } = await this.sessionAdd({ user, product, service, time, trainer, inventory })
        // if (qty) {
          this.setInventory({ service, product, qty })
          this.windowReset()
        // }
      } catch (err) {
        console.log(err)
      }
    },
    async sessionCancel() {
      const { id, inventory, productId, productLength, serviceId, user } = this,
      product = {
        id: productId,
        duration: productLength
      },
      service = serviceId,
      { qty } = await this.sessionRemove({ id, inventory, product, service, user })
      if ( qty ) {
        this.setInventory({ service, product, qty })
        this.windowReset()
      }
    },
    async sessionUpdate(time) {
      const sessionStart = new Date(time),
      mins = sessionStart.getMinutes(),
      end = new Date(new Date(time).setMinutes(mins + 60 + this.productLength)),
      start = new Date(new Date(time).setMinutes(mins - 60)),
      data = {
        start,
        end,
        sessionStart
      }
      await this.dbWrite({
        url: `documents/schedule/${ this.id }`,
        collectionId: 'schedule',
        data
      })
      this.windowReset()
    },
    setInventory({service, product, qty}) {
      this.inventory[service][product.id][product.duration] = qty
    },
    setHash(val) {
      window.location.hash = val
    },
    setService(val) {
      if (!val) {
        this.setHash(0)
      } else {
        this.setHash(1)
      }
      this.service = val
    },
    setTimes(start, end, duration, conflict, modify) {
      const available = [],
      initialTime = new Date(start),
      endTime = new Date(end),
      mins = endTime.getMinutes(),
      func = () => initialTime.setMinutes(initialTime.getMinutes() + 30)
      if (conflict) {
        // Required to show last half hour in 90 min
        if (duration == 30) {
          endTime.setMinutes(mins - duration)
        } else {
          endTime.setMinutes(mins - 60)
        }
      }
      for (let i = 0; initialTime.toISOString() <= endTime.toISOString(); func() ) {
      // for (let i = 0; initialTime.toISOString() < endTime.toISOString(); func() ) {
        const c1 = duration == 90 && initialTime.getHours() <= endTime.getHours(),
        // c7, filter last time 
        c7 = duration == 90 && initialTime.toISOString() == endTime.toISOString(),
        c2 = initialTime.getHours() == endTime.getHours() && initialTime.getMinutes() == 30,
        c3 = duration == 30,
        c4 = duration !== 90,
        c5 = c2 || c3,
        c6 = !conflict && mins !== 30,
        c0 = initialTime.toISOString() == endTime.toISOString() && initialTime.getMinutes() !== 30,
        z = initialTime.getHours() == endTime.getHours() && initialTime.getMinutes() == 30 && duration == 60
        switch (true) {
          
          case c7:
            
            // console.log(initialTime, endTime)
          // Too soon for 90 min session
            break
          case c0:
            // console.log('00')
            available.push(new Date(initialTime).toISOString())
            break
          case c1:
            // console.log(0)
            available.push(new Date(initialTime).toISOString())
            break
          case c5 && c6:
            // console.log(1)
            available.push(new Date(initialTime).toISOString())
            break
          case c3:
            // console.log(2)
            available.push(new Date(initialTime).toISOString())
            break
          case !c4 && initialTime.getTime() < endTime.setMinutes(endTime.getMinutes() - duration):
            // console.log(initialTime, new Date(endTime.setMinutes(endTime.getMinutes() - duration)))
            // console.log(3)
            available.push(new Date(initialTime).toISOString())
            break
          case c4:
            available.push(new Date(initialTime).toISOString())
            // console.log(4)
            break
          default:
            available.push(new Date(initialTime).toISOString())
            // console.log('dick')
        }

        // if (duration == 90 && initialTime.getHours() < 18) {
        //   console.log(initialTime)
        // }

        // if (initialTime.getHours() == endTime.getHours() && initialTime.getMinutes() == 30 || duration == 30) { 
        //   if (!conflict && mins !== 30) {
        //     available.push(new Date(initialTime).toISOString())
        //   } else if (duration == 30) {
        //     available.push(new Date(initialTime).toISOString())
        //   } else if (!conflict && duration == 90) {
        //     available.push(new Date(initialTime).toISOString())
        //   }
        // } else {
        //   available.push(new Date(initialTime).toISOString())
        // }
      }
      
      return available
    },
    async windowReset() {
      this.$emit('close')
      this.$emit('refresh')
      this.setHash(0)
      setTimeout(async () => {
        this.confirm = false
        this.product = null
        this.service = null
        this.time = null
        this.receipt = false
        this.loading = false
        this.qty = 1
        this.availableBookings = []
        this.modify = false
      }, 1000)
    }
  },
  filters: {
    capitalize(val) {
      if (val) {
        return val.substr(0, 1).toUpperCase() + val.slice(1)
      }
    },
    finalDate(val) {
      const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ]
      const months = [
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
      const d = new Date(val)
      let time = d.toLocaleTimeString()
      if ( time.charAt(0) <= 9 ) {
        time = `0${ time }`
      }
      let day = d.getDate(),
      st = [ 1, 21, 31 ],
      nd = [ 2, 22 ],
      rd = [ 3, 23, 33 ]
      switch(true) {
        case st.includes(day):
          day = `${day}st`
          break
        case nd.includes(day):
          day = `${day}nd`
          break
        case rd.includes(day):
          day = `${day}rd`
          break
        default:
          day = `${day}th`
      }
      return `${ days[d.getDay()] } ${ months[d.getMonth()] } ${ day } at ${ time.substr(time.length - 11, 5) } ${ time.substr(time.length - 2, 2) }`
    },
    formatCard(card) {
      return `CC: ${ card.brand } **** ${ card.last4 }`
    },
    formatExpiry(card) {
      return `Expiry: ${ card.exp_month >= 10 ? card.exp_month : '0' + card.exp_month } ${ card.exp_year }`
    },
    hr(val) {
      const date = new Date(val)
      const hr = date.getHours()
      const min = date.getMinutes()
      return `${hr}:${min == 0 ? '00' : min }`
    },
  },
  computed: {
    ...mapState(['user']),
    conditionalText() {
      const { receipt, time, inventory, consent, service, product } = this
      switch (true) {
        case receipt:
          return 'Pay'
        case time && inventory[service][product['id']][product['duration']] >= 1:
          return 'Confirm'
        case !consent:
          return 'Continue'
        default:
          return 'Next'
      }
    },
    existingSession() {
      const { userSession, session } = this
      return userSession && userSession.length && !session ? true : false
    },
    filteredAvailable() {
      const res = (this.availableBookings).sort((a, b) => {
        let da = new Date(a),
            db = new Date(b)
        return da - db
      }),
      sorted = [...new Set(res)],
      filtered = sorted.filter((item, pos) => {
        return sorted.indexOf(item) == pos
      })

      return filtered
    },
    hasSession() {
      const { inventory, service, product } = this
      return inventory[service][product.id][product.duration] >= 1 ? true : false
    },
    total() {
      const { product, qty } = this
      switch(true) {
        case qty >= 12:
          return `$${ (product['rate'] * 0.85) * qty }`
        case qty >= 6:
          return `$${ (product['rate'] * 0.9) * qty }`
        default:
          return `$${ product['rate'] * qty }`
      }
    },
    updateReceipt() {
      const { receipt, userSession } = this
      return receipt && userSession.length ? true : false
    },
    valid() {
      const { number, exp_month, exp_year, cvc } = this.card
      switch(true) {
        case !number || !exp_month || !exp_year || !cvc:
          return true
        default:
          return false
      }
    }
  },
  watch: {
    $route({ hash }) {
      this.hash = hash.split('#')[1]
    },
    async product(val) {
      if (val) {
        let { end, start, product } = this
        const available = [],
        modify = false,
        res = await this.setTimes(start, end, product.duration, true, modify)
        // console.log(new Date(start), new Date(end))
        res.forEach((time, i) => {
          available.push(time)
        })
        this.availableBookings = available
      }
    },
    cards() {
      this.selectCard = this.cards[0]
    },
    async modify(val) {
      if (val) {
        const available = [],
        unavailable = this.unavailableOrig.filter(f => {
          return f.uid == this.uid
        })
        // Show times from available slots
        await this.available.forEach(async (avail, i) => {
          let { end, start, session } = avail,
          conflicts = this.unavailable.filter(time => {
            return new Date(time.start).toISOString() <= end && new Date(time.end).toISOString() >= end && !time.travel
          })
          // console.log(conflicts)
          if (!session) {
            const modify = true,
            res = await this.setTimes(start, end, this.productLength, conflicts.length ? true : false, modify)
            res.forEach((time, i) => {
              available.push(time)
            })
          }
        })
        // Show times from session
        await unavailable.filter(un => {
          return un['conflict'] == true
        })
          .forEach(async (avail, i) => {
            let { start, end, productLength } = avail
            this.unavailable.filter(un => {
              return !Object.keys(un).includes('travel') && un.uid !== this.uid
            }).forEach(un => {
              // if (un.end > start && !un.travel && un.key) {
              if (un.end > start && un.start < start) {
                start = un.end
              }
            })
            const nStart = new Date(start),
            startHrs = nStart.getHours()
            nStart.setHours(6)
            nStart.setMinutes(0)

            const isoStart = new Date(nStart).toISOString(),
            nEnd = new Date(end),
            endHrs = nEnd.getHours(),
            endMins = nEnd.getMinutes()
            nEnd.setHours(19)
            nEnd.setMinutes(0)
            
            const isoEnd = new Date(nEnd).toISOString(),
            sessionEnd = new Date(end).setHours(endHrs - 1),
            conflicts = this.unavailable.filter(un => {
              if (endHrs >= 19 ) {     
                // console.log(new Date(un.start))         
                return un
              } else {
                // return new Date(un.start).toISOString() == new Date(sessionEnd).toISOString() && un.travel
                if (new Date(un.start).toISOString() == new Date(sessionEnd).toISOString() && !un.travel) {
                  //
                  end = new Date(sessionEnd).toISOString()
                }
                // return new Date(un.start).toISOString() == new Date(sessionEnd).toISOString() && un.travel
                const c1 = new Date(un.start).toISOString() == new Date(sessionEnd).toISOString() && !un.travel,
                c2 = new Date(un.start).toISOString() == new Date(end).toISOString()
                return c1 || c2
                // return new Date(un.start).toISOString() == new Date(sessionEnd).toISOString()
              }
            })
            // console.log(conflicts)
            const conflict1 = this.unavailable.filter(un => {
              conflicts.forEach((conflict, i) => {
                const c1 = new Date(un.start).toISOString() == new Date(conflict.end).toISOString()
                // c2 = !Object.keys(conflict).includes('travel')
                // if (c1 && c2) {
                if (c1) {
                  // console.log(new Date(conflict.start))
                  // console.log(123)
                  conflicts.splice(i, 1)
                }
              })
            }),
            conflict2 = this.available
              .filter(av => {
              const avStart = new Date(av['start']).getTime(),
              avEnd = new Date(av['end']).getTime(),
              avDuration = (avEnd - avStart) / 1000 / 60
              conflicts.forEach((conflict, i) => {
                const c1 = new Date(conflict.end).getTime() == avStart,
                c2 = avDuration <= 60,
                c3 = productLength == 90,
                // c4 = !Object.keys(conflict).includes('key')
                // c4 = Object.keys(conflict).includes('key')
                c4 = Object.keys(conflict).includes('travel')
                if (c1 && c2 && c3 && c4) {
                  console.log(new Date(conflict.start))
                  conflicts.splice(i, 1)
                  end = avEnd
                }
              })
            }),
            conflict3 = this.available.filter(av => {
              const avStart = new Date(av['start']).getTime(),
              avEnd = new Date(av['end']).getTime(),
              avDuration = (avEnd - avStart) / 1000 / 60
              // if ( avDuration == 30 && productLength == 60) {
              if ( new Date(av.start).toISOString() == end && avDuration == 30 && productLength == 60) {
                conflicts.push(av)
                end = new Date(av['end']).toISOString()
              }
            }),
            travel = this.unavailable.filter(un => un.travel),
            conflicts4 = travel.forEach(tr => {
              this.unavailable.forEach(un => {
                if (!Object.keys(un).includes('travel')) {
                  const c1 = new Date(un.start).toISOString() < new Date(tr.end).toISOString()
                  const c2 = new Date(un.start).toISOString() > new Date(tr.start).toISOString()
                  if (c1 && c2) {
                    conflicts.push(un)
                    end = new Date(un.start).toISOString()
                  }
                }
              })
            }),
            conflictX = travel.filter(tr => {
              const res = this.available.filter(av => {
                return new Date(tr.end).toISOString() == new Date(av.start).toISOString()
              })
              if (res.length) {
                conflicts.push(res[0])
                // console.log(new Date(res[0].end))
                end = new Date(res[0].end).toISOString()
              }
              return res.length
            }),
            conflictY = this.unavailable.filter(un => un.key).forEach(un => {
              const startObj = new Date(start),
              sessionStart = startObj.setHours(startObj.getHours() + 1),
              final = new Date(sessionStart).toISOString()
              if (un.end == final) {
                start = final
              }
            }),
            c2 = endHrs > 19 || endHrs == 19 && endMins == 30 ? isoEnd : end, 
            c1 = startHrs < 6 ? isoStart : start,
            // res = await this.setTimes(c1, c2, productLength, conflicts.length ? false : true)
            modify = true,
            res = await this.setTimes(c1, c2, productLength, conflicts.length ? true : false, modify)
            // console.log(new Date(c1), new Date(c2))
            // console.log(conflicts)
            res.forEach((time) => {
              available.push(time)
            })
          })

        this.availableBookings = available
      }
    }
  }
}
</script>
<style scoped>
button[disabled] {
  @apply bg-gray-500 text-gray-700 border-none
}
footer {
  @apply flex justify-end pt-2 space-x-4
}
h2 {
  @apply text-xl
}
h3 {
  @apply text-lg
}
h5 {
  @apply p-2 rounded
}
input[type="checkbox"] {
  @apply h-4 w-4 inline
}
input[type="radio"] {
  @apply scale-150
}
li {
  @apply flex space-x-4
}
li > span {
  @apply grow
}
li > button {
  @apply px-1 text-red-400
}
p {
  @apply text-xs pb-2
}
section {
  @apply space-y-4
}

::-webkit-scrollbar {
  @apply hidden
}

ul {
  @apply space-y-2 
}
#cards,
#qty {
  @apply space-x-4 bg-black/10 p-4
}
#cards > button {
  @apply text-red-500
}
#qty > button {
  @apply p-0 m-0 bg-green-500/50 rounded-full
}
</style>
