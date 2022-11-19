<template>
<main class="w-full flex flex-col p-2 items-center grow ml-auto mr-auto">
  <Dialog
    ref="dialog"
    :footerless="true"
    :buttonless="true"
    :component="'PASBQ'"
    @submit="updatePASBQ"
  />
  <div v-if="!assessments.length">
    <h1>No Assessments Completed</h1>
  </div>
  <div v-else>
    <h1 class="text-3xl text-bold pt-1 pb-2">Assessment Results</h1>
  </div>
  <div v-if="render" class="bg-sky-100 dark:bg-gray-500 w-full rounded-xl p-2 grow space-y-2">
    <button v-if="selectAssessment" @click="selectAssessment = null">Return</button>
    <div v-for="assessment in assessments" :key="assessment.id">
      <Assessment-Results
        ref="assessment"
        v-if="selectAssessment ? selectAssessment == assessment.id : true"
        v-model="selectAssessment"
        v-bind="assessment" />
    </div>
  </div>
  <button
    v-if="selectAssessment"
    @click="DIALOG_SET('PASBQ')"
    class="fixed right-8 bottom-8 h-12 w-12 p-0 m-0 md:h-14 md:w-14 rounded-full bg-orange-300">
    <img :src="require('~/assets/svg/plus.svg')" alt="">
  </button>
</main>
</template>
<script>
import { mapMutations, mapActions } from 'vuex'
export default {
  layout: 'app',
  head: () => ({
    title: 'Fitness Assessment Results',
  }),
  async asyncData ({ route, store }) {
    const { query } = route,
    { uid } = query,
    { state, dispatch } = store,
    { user } = state,
    { localId } = user,
    res = await dispatch('db/dbRead', { url: `documents/users/${ uid || localId }/assessments` }),
    keys = Object.keys(res),
    vals = Object.values(res),
    assessments = []
    keys.forEach((id, i) => {
      assessments.push({
        id,
        ...vals[i]
      })
    })
    return { assessments, uid: uid || localId }
  },
  data: () => ({
    selectAssessment: false,
    render: true
  }),
  methods: {
    ...mapActions(['handleError', 'handleSuccess']),
    ...mapActions('db', ['dbWrite']),
    ...mapMutations(['DIALOG_SET']),
    async updatePASBQ(pasbq) {
      try {
        const res = await this.dbWrite({
          url: `documents/users/${ this.uid }/assessments/${ this.selectAssessment }`,
          collectionId: 'workouts',
          data: {
            pasbq
          }
        })
        this.$refs.dialog.close()
        const assessment = this.assessments.filter(assessment => assessment.id == this.selectAssessment)[0]
        this.assessments[this.assessments.indexOf(assessment)].pasbq = pasbq

        this.success()
      } catch (err) {
        console.log(err)
        // this.handleError()
      }
    },
    async renderer () {
      this.render = false
      await this.$nextTick();
      this.render = true
      this.handleSuccess({ message: "Success" })
    }
  }
}
</script>