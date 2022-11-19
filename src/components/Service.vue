<template>
  <div class="card">
    <div v-if="service.name == 'Mobile Personal Training'" class="relative">
      <img :src="require('~/assets/img/3x2.gif')" v-if="service.name == 'Mobile Personal Training'" class="service-photo"/>
      <Map class="absolute top-0 left-0 w-full h-full"/>
      <h2 class="service-label">{{ service.name }}</h2>
    </div>
    <div class="relative space" v-else>
      <img
        v-if="service.name == 'Studio Personal Training'"
        :src="require('~/assets/img/studio.jpg')"
        class="service-photo" alt="">
      <img v-else :src="require('~/assets/img/webcall.png')" class="service-photo" alt="">
      <h2 class="service-label">{{ service.name }}</h2>
    </div>
    <p class="pt-2">{{ service.description }}</p>
    <footer>
      <nuxt-link class="w-fit self-end" :to="service.url">
        <button>
          View Details
        </button>
      </nuxt-link>
    </footer>
  </div>
</template>
<script>
export default {
  props: ['service'],
}
</script>
<style>
.map-container {
  @apply aspect-[3/2] h-full w-full
}
.service-photo {
  @apply aspect-[3/2] w-full flex items-end rounded-lg shadow bg-cover;
}
.service-label {
  @apply bg-black/50 px-2 rounded absolute left-2 bottom-2 md:bottom-6 text-white
}
</style>