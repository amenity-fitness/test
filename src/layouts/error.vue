<template>
  <div>
    <h1 v-if="error.statusCode === 404">Not Found</h1>
    <h1 v-else>An error occurred</h1>
    <p>{{ error.message }}</p>
    <NuxtLink to="/app">
      <h2>Return to Home</h2>
    </NuxtLink>
  </div>
</template>

<script>
  export default {
    props: ['error'],
    layout: 'error'
  }
</script>

<style scoped>
  div {
    @apply text-center grow flex flex-col justify-center
  }
</style>