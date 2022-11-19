<template>
<section>
  <img v-if="user.photoUrl" :src="user.photoUrl">
  <img v-else :src="defaultPhoto" class="w-20">
  <h1>{{ user.displayName }}</h1>
  <span>
    <h4>Email</h4>
    <div class="flex space-x-1 items-center">
      <p>
        {{ user.email }}
      </p>
      <div v-if="user.emailVerified" class="h-4 w-4">
        <Verified />
      </div>
    </div>
  </span>
</section>
</template>
<script>
export default {
  props: ['user']
}
</script>
<style scoped>
h1 {
  @apply pb-2
}
h4 {
  @apply text-xs font-semibold
}
p {
  @apply text-lg
}
img {
  @apply py-2
}
</style>