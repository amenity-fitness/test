<template>
  <div>
    <h2>{{ mode }}</h2>
    Method: {{ method }}
    <br>
    {{ duration }} minutes @ {{ intensity }}% HRR/Vo2
    <span v-if="interval">
      <br>
      Work:Rest
      <br>
      {{ durationWork }} minutes : {{ durationRest }} minutes
    </span>
  </div>
</template>
<script>
export default {
  props: ['duration', 'durationRest', 'durationWork', 'intensity', 'mode', 'method'],
  computed: {
    interval() {
      const { method } = this
      return method == 'Pace/Tempo'
        || method == 'Long Slow Distance'
        || method == 'Fartlek'
        ? false : true
    }
  }
}
</script>