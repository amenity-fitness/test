<template>
  <div class="grow flex flex-col justify-center items-center p-2">
    <div class="w-full max-w-2xl">
      <!-- <div v-if="hash == i"> -->
      <div>
        <h1>Client Information</h1>
        <div class="bg-white dark:bg-gray-600 rounded-lg p-4">
          <div class="flex flex-col">
            <Floating-Select
              @input="selectClient = $event.id"
              :options="clientsFormatted"
              :object="true"
              :label="'Clients'"
              :key="22"
            />
            <Floating-Select
              @input="selectRoute = $event.id"
              :object="true"
              :options="routes"
              :label="'Route'"
              :key="123"
            />
          </div>
          <footer class="flex flex-row-reverse pt-4">
            <button :disabled="!selectRoute || !selectClient">
              <nuxt-link :to="`${selectRoute}?uid=${selectClient}`">
                Next
              </nuxt-link>
            </button>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  layout: 'app',
  head: () => ({
    title: 'Admin Clients',
  }),
  middleware: ['auth'],
  data: () => ({
    selectClient: null,
    selectRoute: null,
    routes: [
      {
        id: '/workouts',
        name: 'Workouts'
      },
      {
        id: '/client-assessment',
        name: 'Client Assessment'
      },
      {
        id: '/assessment-results',
        name: 'Assessment Results'
      },
    ]
  }),
  async asyncData ({ store }) {
    const { state, dispatch } = store,
    { user } = state,
    { localId } = user,
    clients = await dispatch('db/dbRead', { url: `documents/users` })
    return { clients }
  },
  computed: {
    clientsFormatted() {
      const keys = Object.keys(this.clients)
      const vals = Object.values(this.clients)
      let clients = []
      keys
        .forEach((key, i) => {
          clients.push({
            id: key,
            name: vals[i].name
          })
        })
      return clients
    }
  }
}
</script>
<style scoped>
button:disabled {
  @apply text-gray-400
}
</style>