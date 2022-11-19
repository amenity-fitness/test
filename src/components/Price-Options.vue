<template>
<div class="space-y-4">
  <header class="bg-accent -m-4 rounded-t-lg p-4 mb-0">
    <h1>Service Options</h1>
  </header>
  <div class="grid grid-cols-1 gap-3">
    <div class="p-3 shadow-md rounded-lg bg-foremost" v-for="i in offer" :key="i.special">
      <h2>{{ i.duration }}</h2>
      <h3>{{ i.name }}: ${{ i.price }} CAD ea.</h3>
      <h3 v-if="i.special">12 Sessions: ${{ i.special / 12 }} CAD ea. (${{ i.price * 12 * 0.05 }} Savings)</h3>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: ['id', 'offer']
}
</script>