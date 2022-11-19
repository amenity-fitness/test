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
        <h3>Mobile Personal Training</h3>
        <p>Our mobile services are for those who are unable to travel to see us in studio due to constraints, such as mobility or time.</p>
        
        <!-- We aim to provide the same level of attention when getting started while doing our best to preserve the reliability of the assessment protocol.</p> -->
      </header>
      <h3>Serving Vancouver for private and partner mobile personal training</h3>
      <div class="relative">
        <img :src="require('~/assets/img/Transparent.gif')" class="aspect-[3/2]"/>
        <Map class="absolute top-0 left-0 w-full h-full"/>
      </div>
      <h4>
        Primary Service Area: 4 kilometers
        <br>
        Secondary Service Area: 7 kilometers
      </h4>
      <p class="text-sm">Note: A $50 CAD travel fee is added to services located in our secondary area</p>
    </div>
  </section>
  <section>
    <h1 class="title">Services</h1>
    <div class="card">
      <h3>Private Personal Training</h3>
      <p>
        Our private personal training offers clients our undivided attention as we go through a personalized warmup, conditioning and cooldown. A one-on-one session provides our clients a greater opportunity to ask questions and receive technical feedback on exercise technique in the convenience of your home or shared fitness space.
      </p>
      <footer>
        <button @click="openOptions('private')">
          <a>Explore Options</a>
        </button>
      </footer>
    </div>
    <div class="card">
      <h3>Partner Personal Training</h3>
      <p>
        Our partner personal training offers clients the attention of a trainer as we go through a personalized warmup, conditioning and cooldown, so matching fitness levels will not be necessary. A partner session provides our clients a more cost-effective option while allowing for questions and feedback on exercise technique in the convenience of your home or shared fitness space. For each idividual, the most effective fitness program will come after an initial fitness assessment where we are able to identify goals and areas of priority.
      </p>
      <footer>
        <button @click="openOptions('partner')">
          <a>Explore Options</a>
        </button>
      </footer>
    </div>
  </section>
  <section>
    <div class="card">
      <h3>      
        Fitness Assessment for Canadians
      </h3>
      <p>
        The most effective fitness program will come after an initial fitness assessment where we are able to identify goals and areas of priority.
      </p>
      <footer>
        <nuxt-link to="/fitness-assessment">
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
import schema from '~/assets/json/mobile.js'
import { mapActions, mapMutations } from 'vuex' 

export default {
  head: () => ({
    script: [
      {
        type: 'application/ld+json',
        json: schema
      }
    ],
    title: 'In-Home & Mobile Personal Training Vancouver',
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
    hero: {
      title: "In-Home & Mobile Personal Training for Canadians",
      subtitle: "Effective exercise solutions at home or in a shared recreational space - No equipment necessary",
      // poster: require('~/assets/img/hero-static.png'),
      // src: require('~/assets/webm/hero-loop.webm')
    },
    private: [
      {
        name: '1-on-1 Training',
        price: 150,
        duration: '60 min. Session',
        special: 1710
      },
      {
        name: '1-on-1 Training',
        price: 180,
        duration: '90 min. Session',
        special: 2052
      }
    ],
    partner: [
      {
        name: 'Partner Training',
        price: 75,
        duration: '60 min. Session',
        special: 855
      },
      {
        name: 'Partner Training',
        price: 90,
        duration: '90 min. Session',
        special: 1026
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