<template>
  <article class="pb-4">
    <Dialog
      @submit="bookCallback"
      @close="id = null"
      :submit="id ? null : 'Submit'"
      :component="id ? 'Price-Options' : 'Request-Callback'"
      @error="$nuxt.$emit('error', $event)"
      :footerless="id ? false : true"
      :buttonless="true"
      :data="{ conflicts, id, offer }"/>

    <Hero v-bind="hero"/>
    <section>
      <div class="card">
        <header class="-m-4 mb-0">
          <h3>Benefits of Remote Video Calls</h3>
        </header>
        <section>
          <div class="grid grid-cols-1 sm:grid-cols-2 py-2 gap-2 lg:gap-4">
            <div v-for="(component, i) in remoteBenefits" class="rounded-lg shadow text-center p-2 bg-foremost" :key="i">
              {{ component }}
            </div>
          </div>
        </section>
      </div>
    </section>
    <section>
      <h1 class="title">Services</h1>
      <div class="card">
        <h3>1-on-1 Remote Personal Training</h3>
        <p>
          Our Online Personal Training session provides our clients the ability to discuss the details of a personalized exercise prescription. Our undivided attention allows for a greater opportunity to ask questions and receive feedback (including exercise technique you have pre-recorded) over a web-based video call. If there are geographical constraints and we are unable to perform the protocol for determining all of the Health Benefit Ratings, we have additional tools that can assist in individualizing the exercise prescription, including: areas of behaviour change in physical activity and sedentary behaviour, relapse planning, and nationally recognized resources on nutritious foods and food preparation skills.
        </p>
        <footer>
          <button @click="openOptions('remote')">
            <a>Explore Options</a>
          </button>
        </footer>
      </div>
    </section>
    <section>
      <div class="card">
        <p>
          Through remote personal training sessions, you can gain access to tools and information about topics like:
        </p>
        <div class="grid grid-cols-1 py-2 pl-8 pr-8 gap-2 lg:gap-4">
          <div v-for="(component, i) in remoteBenefits2" class="rounded-lg shadow text-center p-2 bg-foremost" :key="i">
            {{ component }}
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="card">
        <h3>      
          Fitness Assessment for Canadians
        </h3>
        <p>
          The most effective fitness program will come after an initial fitness assessment where we are able to identify goals and areas of priority. Amenity is currently based in Vancouver's Chinatown for the full assessment and HBR ratings.
        </p>
        <footer>
          <nuxt-link  to="/fitness-assessment">
            <button>
              Learn More
            </button>
          </nuxt-link>
        </footer>
      </div>
    </section>
    <Form
      :cta="cta"
      @error="$nuxt.$emit('error', $event)"
      @submit="$nuxt.$emit('success', $event)"/>
  </article>
</template>
<script>
import schema from '~/assets/json/remote.js'
import { mapActions, mapMutations } from 'vuex' 

export default {
  head: () => ({
    script: [
      {
        type: 'application/ld+json',
        json: schema
      }
    ],
    title: 'Remote Personal Training for Canadians',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: schema.description
      }
    ]
  }),
  async asyncData({ store }) {
    const conflicts = await store
      .dispatch('scheduling/reqCallback')
    return { 
      conflicts
    }
  },
  data: () => ({
    cta: 'Interested in one of our services, or have a general question? We are excited to hear from you!',
    id: null,
    offer: null,
    remoteBenefits: [
      'Opportunity to ask questions',
      'Our undivided attention',
      'Discuss the details of a personalized program',
      'Gain an understanding of more technical exercises'
    ],
    remoteBenefits2: [
      'Behaviour change',
      'Relapse plan',
      'Canada\’s Food Guide'
    ],
    hero: {
      title: "Remote Personal Training for Canadians",
      subtitle: "In-app video calls for fitness program design and guidance",
      // poster: require('~/assets/img/hero-static.png'),
      // src: require('~/assets/webm/hero-loop.webm')
    },
    remote: [
      {
        name: 'Online Check-in',
        price: 60,
        duration: '30 min. Session',
        special: 684
      }
    ]
  }),
  methods: {
    ...mapMutations(['DIALOG_SET']),
    ...mapActions(['handleSuccess', 'handleError']),
    ...mapActions('scheduling', ['publicWrite']),
    openOptions(id) {
      this.id = id
      this.DIALOG_SET('Price-Options')
      this.offer = this[id]
    },
    async bookCallback(data) {
      try {
        const callback = true,
        { status } = await this.publicWrite({
          ...data,
          callback
        })
        if (status == 200) this.$nuxt.$emit('success', { message: 'Success' }) 
      } catch (error) {
        this.$nuxt.$emit('error', error)
      }
    }
  }
}
</script>