<template>
<main class="w-full flex flex-col p-2 items-center grow ml-auto mr-auto">
  <Dialog
    ref="dialog"
    :footerless="true"
    :buttonless="true"
    :persistent="true"
    :component="dialogComponent"
    :data="selectWorkout ? { selectWorkout, workout: workouts.filter(workout => workout.id == selectWorkout)[0], metric } : { metric, loading }"
    @submit="submit"
  />
  <div v-if="!workouts.length">
    <h1>No workouts</h1>
  </div>
  <div v-else>
    <h1 class="text-3xl text-bold pt-1 pb-2">Workouts</h1>
  </div>
  <div class="bg-sky-100 dark:bg-gray-500 w-full rounded-xl p-2 grow space-y-2">
    <div v-for="workout in workouts" :key="workout.id">
      <Workout
        ref="workout"
        class="bg-red-50 dark:bg-gray-600 rounded-lg shadow-lg"
        v-if="selectWorkout ? selectWorkout == workout.id : true"
        v-model="selectWorkout" v-bind="workout"
        :metric="metric" />
    </div>
  </div>
  <button 
    v-if="admin"
    @click="selectWorkout ? openDialog('Workout-Log-Window') : openDialog('Workout-Add-Window')"
    class="fixed right-8 bottom-8 h-12 w-12 p-0 m-0 md:h-14 md:w-14 rounded-full bg-orange-300">
    <img :src="require('~/assets/svg/plus.svg')" alt="">
  </button>
</main>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex' 
export default {
  layout: 'app',
  head: () => ({
    title: 'Workout Tracking'
  }),
  async asyncData({route, store}) {
    const { query } = route,
    { uid } = query
    const { state, dispatch } = store,
    { user } = state,
    { localId } = user
    let workouts = await dispatch('workouts/getWorkouts', { uid: uid || localId })
    workouts = workouts
      .filter(workout => workout.id !== 'custom')
    return { workouts, uid: uid || localId }
  },
  data: () => ({
    dialogComponent: false,
    loading: false,
    workouts: null,
    selectWorkout: null
  }),
  computed: {
    ...mapGetters('auth', ['admin', 'metric']),
    dialogChild() {
      return this.$refs['dialog']['$children'][0] || null
    },
    dialog() {
      return this.$refs['dialog'] || null
    },
  },
  methods: {
    ...mapMutations(['DIALOG_SET']),
    ...mapActions(['handleSuccess']),
    ...mapActions('db', ['dbCreate', 'dbWrite']),
    ...mapActions('workouts', ['getWorkouts']),
    openDialog(component) {
      this.dialogComponent = component
      this.DIALOG_SET(component)
    },
    async submit($event) {
      try {
        this.loading = true
        const { uid } = this,
        data = $event
        let item
        if (this.selectWorkout) {
          item = await this.dbWrite({
            url: `documents/users/${ this.uid }/workouts/${ this.selectWorkout }`,
            collectionId: 'workouts',
            data
          })
          const workout = this.workouts.filter(workout => workout.id == this.selectWorkout)[0]
          this.workouts[this.workouts.indexOf(workout)]['logs'] = item['logs']
          this.$refs['workout'][0].clear()
          if (this.dialogChild) {
            this.dialogChild.reset()
            this.dialogChild.resetEx()
            this.dialog.close()
          }
        } else {
          item = await this.dbCreate({
            url: `documents/users/${ uid }/workouts`,
            collectionId: 'workouts',
            parent: `projects/amenity-fitness/databases/(default)/documents/users/${ uid }`,
            data
          })
          this.workouts.push({ ...item })
          if (this.dialogChild) {
            this.dialogChild.resetExercises()
            this.dialogChild.reset()
            this.dialog.close()
          }
        }
        this.loading = false
        this.handleSuccess({ message: 'Success' })
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
<style scoped>
h1 {
  @apply text-transparent bg-clip-text
  bg-gradient-to-t dark:from-orange-200 dark:to-sky-300
  from-teal-200 to-sky-600
}
</style>