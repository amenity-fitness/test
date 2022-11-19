<template>
  <div class="p-2 space-y-4 mx-auto max-w-xl">
    <div v-if="init !== 'yes'">
      <div class="space-y-1">
        <h1>Abilities For Active Living Questionnaire</h1>
        <p class="text-sm font-medium">Virtually anyone can participate in a physical activity, fitness and lifestyle assessment, and achieve health and fitness benefits with coaching support from a qualified exercise professional. Individuals with disabilities (i.e., physical or mental differences in function that affect their abilities to perform specific tasks and actions) are more likely to encounter environmental barriers in their pursuit of a physically active lifestyle. Please help us to help you achieve your health and fitness goals by reviewing and completing this form. Contact us in advance if you feel there are specific accommodations we can make so that your initial meeting with us can be a complete success.</p>
      </div>
      <div class="space-y-2">
        <h4 class="font-semibold">Do you have a physical limitation or disability that may affect how you engage in physical activity or exercise?</h4>
        <div class="flex justify-around">
          <div>
            <input
              class="m-2"
              :checked="res[0] == 'yes'"
              @input="init = $event.target.id"
              type="radio"
              :id="'yes'"
              name="question">
            <label :for="'yes'">Yes</label>
          </div>
          <div>
            <input
              class="m-2"
              :checked="res[0] == 'no'"
              @input="init = $event.target.id"
              type="radio"
              :id="'no'"
              name="question">
            <label :for="'no'">No</label>
          </div>
        </div>
      </div>
    </div>
    <div class="space-y-3" v-else>
      <button @click="init = null" class="text-cyan-100">Return</button>
      <p class="text-sm">If you answered ‘Yes’, please expand on the nature of the disability by checking the items below that best describe your situation. This information will help the qualified exercise professional consider specific accommodations that may be appropriate to ensure you can successfully undertake a physical activity, fitness and lifestyle assessment and explore physical activity and exercise options that are most appropriate for you.</p>
      <div class="p-2 rounded bg-gray-600">
        <div v-for="(q, i) in questions" :key="i">
          <div class="flex space-x-2 p-2">
            <div>
              <input
                :checked="res[i] == true"
                value="true"
                @click="handleClick($event, i)"
                class="mr-2"
                type="checkbox"
                :id="i">
            </div>
            <label class="ml-0 shrink" :for="i">{{ q }}</label>
          </div>
          <floating-input v-if="i == 11 | i == 13" :data="{}" class="basis-full pb-2"/>
        </div>
      </div>
      <div>
        <p class="text-sm">We invite you to consider and describe how you currently manage activities of daily living, so the qualified exercise professional can consider how these strategies and techniques may be used in the context of helping you pursue a more active lifestyle. You can write your thoughts here and/or discuss them at the first consultation meeting.</p>
        <floating-input v-model="multi" :data="{ multi: true }"/>
      </div>
    </div>
    <footer class="flex flex-row-reverse">
      <button :disabled="!init" @click="submit">Submit</button>
    </footer>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  layout: 'app',
  head: () => ({
    title: 'Abilities for Active Living',
  }),
  asyncData({store}) {
    const { state} = store,
    { user } = state,
    { localId } = user
    return { uid: localId }
  },
  data: () => ({
    multi: '',
    init: null,
    res: [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false
    ],
    counter: 0,
    questions: [
      'I have trouble moving from place to place (e.g., walking or running) or moving my legs',
      'I have trouble picking up objects or moving my hands or arms',
      'I am not strong enough to do physical activity',
      'I cannot move for long periods of time',
      'I cannot move or stretch my joints',
      'I have trouble cooperating, talking or being active with others',
      'I have trouble controlling my emotions and reactions to others',
      'I have trouble performing physical activity the way others do',
      'I have a vision impairment. I may require printed information in alternative format',
      'I have a hearing impairment. I read lips or use sign language',
      'I have a verbal impairment',
      'I have another sensory input impairment. Please specify: ',
      'I have trouble understanding or remembering instructions',
      'Other issues not covered here. Please specify:'
    ]
  }),
  methods: {
    ...mapActions('db', ['dbWrite']),
    handleClick($event) {
      this.res.splice($event.target.id, 1, $event.target.checked)
    },
    submit() {
      const {res, questions} = this
      let aalq = [
        { reponse: this.multi }
      ]
      res.forEach((r, i) => {
        if (r) {
          aalq.push({ reponse: questions[i] })
        } else {
          aalq.push({ reponse: null })
        }
      })
      this.dbWrite({
        url: `documents/users/${ this.uid }`,
        collectionId: 'users',
        data: {
          aalq
        }
      })
    }
  },
  computed: {
    conditionalInput() {
      this.res.forEach((r, i) => {
        if (r == true) {
          return i == 11 || i == 13 ? true : false
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style scoped>
button:disabled {
  @apply text-gray-500
}
label {
  @apply italic
}
</style>