<template>
  <li class="basis-full md:basis-[50%]">
    <div class="bg-slate-500 p-2 shadow-lg rounded">
      <h2 v-if="!dnc" :class="color">{{ score | cap }}</h2>
      <p><span class="font-semibold font-md">{{ title }}:</span> {{ result }}</p>
    </div>
  </li>
</template>
<script>
export default {
  props: ['title', 'result', 'score', 'color', 'dnc'],
  filters: {
    cap(val) {
      if (!val) {
        return
      }
      const res = []
      val.split(' ')
        .forEach(v => res.push(v.charAt(0).toUpperCase() + v.substr(1)))
      return res.join(' ')
    }
  }
}
</script>