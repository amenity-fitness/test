<template>
  <article>
    <Dialog
      @submit="bookCallback"
      @error="$nuxt.$emit('error', $event)"
      :persistent="true"
      :submit="'Submit'"
      :component="'Request-Callback'"
      :footerless="true"
      :buttonless="true"
      :data="{ conflicts }"/>
    <Hero v-bind="hero"/>
    <Features id="about" :description="amenity.description" :features="features"/>
    <Services id="services" :services="services"/>
    <section id="assessment">
      <div class="card">
        <h2>Fitness Assessment for Canadians</h2>
        <p>Assessing current needs and abilities provides the exercise professional the understanding to create an individualized exercise prescription. Fitness assessment protocol created by the Canadian Society for Exercise Physiology (CSEP) aims to provide more detail about individual muscular endurance, strength, flexibility and balance to compare against Canadians of a similar population. This information is also valid and reliable for when we reassess to track program effectiveness, and re-establish areas of greatest need.</p>
        <footer>
          <nuxt-link to="/fitness-assessment">
            <button>
              Learn More
            </button>
          </nuxt-link>
        </footer>
      </div>
    </section>
    <section id="online">
      <div class="card">
        <h2>Reach Further with Amenity Online</h2>
        <p>Book and reschedule services with real-time availability, view and log workouts prescribed by your trainer and optionally check in remotely with our in-app video calls. Our web services can be accessed on any internet browser via smartphone, laptop or desktop.</p>
        <footer>
          <nuxt-link class="text-inherit self-end" to="/login?register=true" target="_blank">
            <Button-Action
              :text="'Get Started'"/>
          </nuxt-link>
        </footer>
      </div>
    </section>
    <section id="trainers">
      <div class="card">
        <h2>The Bodies Behind Our Business</h2>
        <p>Founders Katey Milton and Paul Elliott blend classic techniques with modern practices in their approach to personal training and exercise prescription. They wish to help Canadians of all ages and abilities realize the benefits of living an active lifestyle through engaging, and suitable physical activity appropriate for the individual.</p>
      </div>
    </section>
    <Bios :profiles="profiles"/>
    <Form
      :cta="cta"
      id="contact"
      @error="$nuxt.$emit('error', $event)"
      @submit="$nuxt.$emit('success', $event)"/>
    <Foot
      @submit="$nuxt.$emit('success', $event)"
      @error="$nuxt.$emit('error', $event)"/>
  </article>
</template>
<script>
import { amenity, fitnessAssessment } from '~/assets/json'
import { mapActions } from 'vuex' 
export default {
  async asyncData({ store }) {
    const conflicts = await store
      .dispatch('scheduling/reqCallback')
    return { 
      conflicts
    }
  },
  head: () => ({
    script: [
      {
        type: 'application/ld+json',
        json: amenity
      },
    ],
    title: 'Vancouver Personal Training',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: amenity.description
      }
    ]
  }),
  data: () => ({
    cta: 'Interested in one of our services, or have a general question? We are excited to hear from you!',
    hero: {
      title: "Amenity helps busy Canadians improve their Health and Wellness",
      subtitle: "Discover how we\'re working to make active living more accessible to everybody",
      // poster: require('~/assets/img/hero-static.png'),
      // src: require('~/assets/webm/hero.webm')
    },
    profiles: [
      {
        url: require('~/assets/img/katey-milton.jpg'),
        firstName: 'Katey',
        familyName: 'Milton',
        shortTitle: 'CPT *D',
        longTitle: 'Certified Personal Trainer of Distinction',
        accreditor: 'National Academy of Sports Medicine'
      },
      {
        url: require('~/assets/img/paul-elliott.jpg'),
        firstName: 'Paul',
        familyName: 'Elliott',
        shortTitle: 'CPT',
        longTitle: 'Certified Personal Trainer',
        accreditor: 'National Strength and Conditioning Association',
        postSecondary: 'Humber College: Fitness & Health Diploma'
      }
    ],
    amenity: amenity,
    assessment: fitnessAssessment,
    title: 'Amenity helps busy Canadians improve their Health and Wellness',
    subtitle: 'Discover how we\'re working to make active living more accessible to everybody',
    features: [
      {
        icon: require('~/assets/svg/adjustments.svg'),
        description: 'Individualized approach to assess, motivate, educate and train'
      },
      {
        icon: require('~/assets/svg/chart-bar.svg'),
        description: 'Safe and effective design of exercise programs regardless of abilities'
      },
      {
        icon: require('~/assets/svg/exclaimation.svg'),
        description: 'Professional handling in response to emergency situations'
      },
      {
        icon: require('~/assets/svg/annotation.svg'),
        description: 'Browser-based web application for activity tracking & communications'
      },
      {
        icon: require('~/assets/svg/video-camera.svg'),
        description: 'Optional remote video check-ins with our Certified Personal Trainers'
      },
      {
        icon: require('~/assets/svg/circle-check.svg'),
        description: 'Realtime availability while making online bookings'
      }
    ],
    services: [
      {
        name: 'Studio Personal Training',
        description: 'Studio Training is based in Vancouver\'s Chinatown offering a professional, clean & bright space with towel service and private showers. Great accessibility via bike lanes and transit along with options for street parking. Convenient entrances for mobility devices.',
        url: '/vancouver-personal-training'
      },
      {
        name: 'Mobile Personal Training',
        description: 'Mobile Training for effective exercise solutions at home or a shared recreational space. Our primary service location is 4 kilometers from Downtown Vancouver, while our secondary service location is 7 kilometers.',
        url: '/mobile-personal-training'
      },
      {
        name: 'Remote Personal Training',
        description: 'Remote Training provides the opportunity to have any questions answered conveniently from our Personal Trainers. Remote sessions allow us to reach clients outside our service area for program design, technical feedback, and general inquiries.',
        url: '/remote-personal-training'
      }
    ]
  }),
  mounted() {
    // const { href } = window.location,
    // { title } = document,
    // name = 'page_view',
    // params = {
    //   page_title: title,
    //   page_location: href
    // }
    // this.analyticsEvent({
    //   name,
    //   params
    // })
  },
  methods: {
    ...mapActions(['analyticsEvent']),
    ...mapActions('scheduling', ['publicWrite']),
    scroll(el) {
      document.getElementById(el).scrollIntoView()
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