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
          <p>Administered by a Certified Personal Trainer, we utilize the PATH (Physical Activity Training for Health) assessment protocol developed by CSEP (Canadian Society for Exercise Physiology) to assess physical activity and sedentary behaviour, body composition, aerobic and musculoskeletal fitness, and lifestyle. Assessment results can be used for comparison against Canadians of a similar population, and are used to determine adequate types and intensities for your fitness level. Future re-assessments are able to provide feedback in regards to prior fitness program effectiveness and determine new goals and areas of priority.</p>
        </header>
        <h3>The components of PATH Assessment</h3>
        <section>
          <div class="grid grid-cols-1 sm:grid-cols-2 py-2 gap-2 lg:gap-4">
            <div v-for="(component, i) in componentsHealth" class="rounded-lg shadow text-center p-2 bg-foremost" :key="i">
              {{ component }}
            </div>
          </div>
        </section>
      </div>
    </section>
    <section>
      <div class="card">
        <h3>      
          Why Assess Body Composition?
        </h3>
        <p>
          Assessing body composition as measured by Body Mass Index (BMI) and waist circumference (WC) can be used to identify weight-related health risks. BMI is the most useful tool, to date, of weight-related health risks. WC can be used along with BMI as a tool to measure additional elevations in risk.
        </p>
        <p>
          These risks are categorized using cut-off points identifying the continuous relationship between gradations of BMI and health risks, and between WC and health risks.
        </p>
        <footer>
          <nuxt-link to="/articles/weight-related-health-risk-in-canadians">
            <button>
              Read More On Your Risks
            </button>
          </nuxt-link>
        </footer>
      </div>
    </section>
    <section>
      <div class="card">
        <h3>      
          Why Assess Aerobic Capacity?
        </h3>
        <p>
          Assessing maximal oxygen consumption (Vo2 Max) is defined physiologically as the highest rate of oxygen transport and use that can be achieved at maximal physical exertion. It is the most widely recognized measure of pulmonary fitness, and the best indicator of physical work capacity.
        </p>
        <p>
          Vo2 Max is able to be expressed relative or absolute. The relative expression allows for more equitable comparison between individuals of different body masses.
        </p>
        <p>
          Since Vo2 Max represents an individual’s ability to sustain physical effort over a period of time and ability to respond to emergencies, it is one of the most important determinants of health.
        </p>
      </div>
    </section>
    <section>
      <div class="card">
        <h3>      
          Health Benefit Ratings 
        </h3>
        <p>
          Health benefit ratings (HBR), defined by the CSEP-PATH summarize a client’s assessment results in terms that are easy to understand and remember. They are based on evidence and on data collected from the Canadian public. HBRs help clients understand where they fit on a five-point scale from ‘Excellent’ to ‘Poor’ (representing 20th percentile splits) in comparison to others of a similar population.
        </p>
        <footer>
          <button @click="openOptions('assessment')">
            <a>Explore Options</a>
          </button>
        </footer>
      </div>
    </section>
    <section>
      <div class="card">
        <h3>Currently based in Vancouver's Chinatown for all HBR Ratings</h3>
        <Amenity-Features/>
      </div>
    </section>
    <Form
      :cta="cta"
      @error="$nuxt.$emit('error', $event)"
      @submit="$nuxt.$emit('success', $event)"/>
  </article>
</template>
<script>
import schema from '~/assets/json/assessment.js'
import { mapActions, mapMutations } from 'vuex' 

export default {
  head: () => ({
    script: [
      {
        type: 'application/ld+json',
        json: schema
      }
    ],
    title: 'Fitness Assessment for Canadians',
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
    componentsHealth: [
      'Sedentary Behaviour',
      'Body Composition',
      'Aerobic Capacity',
      'Muscular Strength',
      'Muscular Endurance',
      'Flexibility',
      'Power',
      'Balance & Stability'
    ],
    hero: {
      title: "Fitness Assessment Specifically for Canadians",
      subtitle: "Identify goals and areas of priority for the most effective fitness program",
      // poster: require('~/assets/img/hero-static.png'),
      // src: require('~/assets/webm/hero-loop.webm')
    },
    assessment: [
      {
        name: '90 min. Assessment',
        price: 90,
        duration: 'In-Studio Fitness Assessment'
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