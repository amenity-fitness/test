<template>
  <div>
    <h2>{{ equipment }} {{ name }}</h2>
    {{ `${sets} sets` }} × {{ timed ? `${duration} secs` : `${reps} reps` }} @ {{ load ? `${load} ${ metric ? 'kgs' : 'lbs'}` : 'Bodyweight' }}
    <!-- {{ `${sets} sets` }} × {{ timed ? `${duration} secs` : `${reps} reps` }} @ {{ bodyweight ? 'Bodyweight' : `${load} ${ metric ? 'kgs' : 'lbs'}` || '' }} -->
    <br>
    Tempo: {{ tempo ? tempo : 'N/A' }}
    <br>
    Rest: {{ rest ? `${rest} mins` : 'N/A' }}
  </div>
</template>
<script>
export default {
  props: ['metric', 'name', 'equipment', 'group', 'load', 'position', 'timed', 'duration', 'reps', 'rest', 'sets', 'tempo', 'bodyweight']
}
</script>