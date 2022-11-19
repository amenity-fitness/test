<template>
  <div>
    <div class="bio-container">
      <div class="md:hidden basis-1"></div>
      <Bio
        class="bio"
        v-for="profile in profiles"
        :key="profile.firstName"
        :data="profile"/>
      <div class="md:hidden basis-1"></div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['profiles']
}
</script>