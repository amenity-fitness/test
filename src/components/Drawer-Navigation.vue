<template>
  <nav class="drawer-nav">
    <div v-for="(link, i) in routes" :key="i">
      <div @click="$emit('close')">
        <nuxt-link
          class="text-primary"
          :to="link.to == route ? '' : link.to"
          no-prefetch>
          {{ link.name }}
        </nuxt-link>
      </div>
      <span v-if="link.to == route && link.subdirectory" class="subdirectory">
        <a
          class="text-primary" 
          v-for="sub in link.subdirectory"
          :href="'#' + sub.hash"
          @click="$emit('close')"
          :key="link.name + '-' + sub.name"># {{ sub.name }}</a>
      </span>
    </div>
  </nav>
</template>
<script>
export default {
  props: ['route'],
  data: () => ({
    routes: [
      {
        to: '/',
        name: 'Home',
        subdirectory: [
          {
            name: 'About',
            hash: 'about'
          },
          {
            name: 'Services',
            hash: 'services',
          },
          {
            name: 'Fitness Assessment',
            hash: 'assessment',
          },
          {
            name: 'Amenity Online',
            hash: 'online',
          },
          {
            name: 'Trainers',
            hash: 'trainers',
          },
          {
            name: 'Contact',
            hash: 'contact'
          }
        ]
      },
      {
        to: '/vancouver-personal-training',
        name: 'Studio Training Services'
      },
      {
        to: '/mobile-personal-training',
        name: 'Mobile Training Services'
      },
      {
        to: '/remote-personal-training',
        name: 'Remote Training Services'
      },
      {
        to: '/fitness-assessment',
        name: 'Fitness Assessment'
      },
    ]
  }),
  props: ['route'],
  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>
<style>
  .drawer-nav {
    @apply flex flex-col text-lg
  }

  .subdirectory {
    @apply p-2 mt-2 space-y-2 pl-4 rounded-lg shadow-inner flex flex-col bg-black/20
  }
</style>