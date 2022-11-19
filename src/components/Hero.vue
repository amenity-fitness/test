<template>
<header>
  <section>
    <div v-if="src">
      <video
        autoplay="true"
        loop="true"
        muted="true"
        playsinline="true"
        :poster="poster"
        preload=""
        :src="src"/>
    </div>
    <div v-else-if="poster">
      <img class="rounded-xl shadow-md" :src="poster" alt="">
    </div>
    <div>
      <!-- <Hero-Image/> -->
      <span>
        <h1 class="title">{{ title }}</h1>
        <h3 class="subtitle">{{ subtitle }}</h3>
      </span>
    </div>
  </section>
</header>
</template>

<script>
export default {
  props: ['title', 'subtitle', 'poster', 'src']
}
</script>

<style scoped>
div {
  @apply w-full flex flex-col
  justify-center items-center text-center space-y-4
}
section {
  @apply mx-auto p-8 space-x-0 sm:space-x-4
  sm:flex
}
span {
  @apply relative w-full space-y-2
}
</style>