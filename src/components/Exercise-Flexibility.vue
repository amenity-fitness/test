<template>
  <div>
    <h2>{{ unilateral ? 'Unilateral' : '' }} {{ name }}</h2>
    {{ `${sets} sets` }} × {{ timed ? `${duration} secs` : `${reps} reps` }} @ {{ load ? `${load} ${ metric ? 'kgs' : 'lbs'}` : 'Bodyweight' }}
    <!-- {{ `${sets} sets` }} × {{ timed ? `${duration} secs` : `${reps} reps` }} @ {{ bodyweight ? 'Bodyweight' : `${load} ${ metric ? 'kgs' : 'lbs'}` || '' }} -->
  </div>
</template>
<script>
export default {
  props: ['duration', 'load', 'name', 'reps', 'sets', 'timed', 'type', 'unilateral', 'metric']
}
</script>