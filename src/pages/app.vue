<template>
<section>
  <div v-for="tile in filteredTiles" :key="tile.id">
    <div class="tile">
      <div class="bg-gray-900 pl-5 pt-4 pb-20 rounded-lg">
        <h1>{{ tile.text }}</h1>
      </div>
      <footer>
        <button>
          <Nuxt-Link :to="`/${tile.id}`" v-html="`View ${tile.text}`"/>
        </button>
      </footer>
    </div>
  </div>
</section>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  layout: 'app',
  head: () => ({
    title: 'Dashboard',
  }),
  data: () => ({
    tiles: [
      {
        id: 'clients',
        text: 'Clients',
        admin: true
      },
      {
        id: 'client-assessment',
        text: 'Client Assessment',
        admin: true
      },
      {
        id: 'pantry',
        text: 'Pantry',
        admin: false
      },
      {
        id: 'workouts',
        text: 'Workouts'
      },
      {
        id: 'assessment-results',
        text: 'Assessment Results'
      },
      {
        id: 'scheduling',
        text: 'Scheduling'
      }
    ]
  }),
  computed: {
    ...mapGetters('auth', ['admin']),
    filteredTiles() {
      return this.tiles.filter(tile => {
        return !tile.admin || this.admin
      })
    }
  }
}
</script>
<style scoped>
h2 {
  @apply text-xl
}
section {
  @apply p-4 space-y-0 gap-4
  container mx-auto grid 
  grid-cols-1 sm:grid-cols-2
}
footer {
  @apply flex justify-end
}
.tile {
  @apply p-2
  bg-foreground space-y-2
  rounded-lg shadow-xl
}
</style>