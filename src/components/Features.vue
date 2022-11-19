<template>
  <section>
    <div class="card">
      <header class="-mx-4 -mt-4">
        <h2>Vancouver Personal Training</h2>
        <p>{{ description }}</p>
      </header>
      <div class="space-y-3">
        <h2 class="pt-2">Benefits of Personal Training with Amenity</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 py-2 gap-3 md:gap-4">
          <Feature :key="i" v-for="(feature, i) in features" :data="{
            i,
            ...feature
          }"/>
        </div>
        <p class="italic">Additionally, we're striving to improve the accessibility of our services as we meet the needs of all ages, levels of ability, health conditions, or disabilities</p>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  props: ['features', 'description']
}
</script>