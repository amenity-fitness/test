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
          <h3>Studio Personal Training</h3>
          <p>Our studio personal training services provide the ability to exercise privately in a bright, clean, open space without interruptions or the need to share equipment.</p>
        </header>
        <h3>Based in Vancouver's Chinatown for private, partner, and group personal training</h3>
        <Amenity-Features/>
      </div>
    </section>
    <section>
      <h1 class="title">Services</h1>
      <div class="card">
        <h3>Private Personal Training</h3>
        <p>
          Our private personal training offers clients our undivided attention as we go through a personalized warmup, conditioning and cooldown. A one-on-one session provides our clients a greater opportunity to ask questions and receive technical feedback on exercise technique in a private and professional setting. The most effective fitness program will come after an initial fitness assessment where we are able to identify goals and areas of priority.
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
          Our partner personal training offers clients the attention of a trainer as we go through a personalized warmup, conditioning and cooldown, so matching fitness levels will not be necessary. A partner session provides our clients a more cost-effective option while allowing for questions and feedback on exercise technique in a private and professional setting. For each idividual, the most effective fitness program will come after an initial fitness assessment where we are able to identify goals and areas of priority.
        </p>
        <footer>
          <button @click="openOptions('partner')">
            <a>Explore Options</a>
          </button>
        </footer>
      </div>
      <div class="card">
        <h3>Group Personal Training</h3>
        <p>
          Our group personal training offers 3-12 clients the attention of a trainer as we go through a general warmup, conditioning and cooldown with variations to each movement provided for different levels of ability. A group session allows our clients the most cost-effective option in a private and social setting.
        </p>
        <footer>
          <button @click="openOptions('group')">
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
import schema from '~/assets/json/studio.js'
import { mapActions, mapMutations } from 'vuex' 

export default {
  head: () => ({
    script: [
      {
        type: 'application/ld+json',
        json: schema
      }
    ],
    title: 'Vancouver Personal Training: Chinatown',
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
      title: "Vancouver Personal Training: Chinatown",
      subtitle: "Private fitness studio for functional exercise solutions",
      poster: require('~/assets/img/studio.jpg')
      // src: require('~/assets/webm/hero-loop.webm')
    },
    private: [
      {
        name: '1-on-1 Training',
        price: 90,
        duration: '60 min. Session',
        special: 1026
      }
    ],
    partner: [
      {
        name: 'Partner Training',
        price: 50,
        duration: '60 min. Session',
        special: 570
      }
    ],
    group: [
      {
        name: 'Group Training',
        price: 40,
        duration: '60 min. Session',
        special: 456
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