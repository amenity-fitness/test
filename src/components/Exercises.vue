<template>
<div v-if="data.length">
  <div v-for="(exercise, i) in data" :key="i + 'warmupz'">
    <div class="flex" v-if="!!exercise.circuit">
      <div class="grow">
        <div class="pl-4">Circuit</div>
        <div class="pl-8" v-for="(ex, n) in exercise.circuit" :key="n + 'warmup'">
          <p>
            {{ ex | exName }}
          </p>
          <p>
            {{ ex | exParams(metric) }}
          </p>
          <p>
            {{ ex.rest ? `${ex.rest} min. Rest` : null }}
          </p>
          <hr class="mr-8" v-if="i !== exercise.circuit.length - 1 || i !== data.length - 1">
        </div>
      </div>
      <button class="text-red-500" @click="$emit('remove', i)">Delete</button>
    </div>
    <div class="pl-4 flex" v-else>
      <div class="grow">
        <p>
          {{ exercise | exName }}
        </p>
        <p>
          {{ exercise | exParams(metric) }}
        </p>
        <p>
          {{ exercise.rest ? `${exercise.rest} min. Rest` : null }}
        </p>
        <hr class="mr-8" v-if="i !== data.length - 1">
      </div>
      <button class="text-red-500" @click="$emit('remove', i)">Delete</button>
    </div>
  </div>
</div>
</template>
<script>
export default {
  props: ['data', 'metric'],
    filters: {
    exName(ex) {
      if (!ex) {
        return
      }
      let { unilateral, name, mode, style, equipment, position } = ex
      unilateral = unilateral ? 'Unilateral' : false
      switch (true) {
        case ex.type == 'Flexibility':
          switch(true) {
            case !!unilateral:
              return `${unilateral} ${name}`
            default:
              return `${name}`
          }
        case ex.type == 'Cardiovascular':
          return `${style} ${mode}`
        case ex.type == 'Resistance':
          switch(true) {
            case !!unilateral && !!equipment && !!position:
              return `${unilateral} ${position} ${equipment} ${name}`
            case !!equipment && !!position:
              return `${position} ${equipment} ${name}`
            case !!unilateral && !!equipment:
              return `${equipment} ${name}`
            case !!equipment:
              return `${equipment} ${name}`
            case !!unilateral && !!position:
              return `${position} ${name}`
            case !!position:
              return `${position} ${name}`
            default:
              return name
          }
      }
    },
    exParams(ex, metric) {
      if (!ex) {
        return
      }
      const { timed, sets, duration, intensity, reps, rest, load, durationWork, durationRest, tempo} = ex
      switch (true) {
        case ex.type == 'Flexibility':
          switch (true) {
            case !!load:
              return `${ sets } sets × ${ timed ? `${ duration } sec.` : `${ reps } reps`} @ ${ metric ? `${load} kg` : `${load} lbs` }`
            default:
              return `${ sets } sets × ${ timed ? `${ duration } sec.` : `${ reps } reps`}`
          }
        case ex.type == 'Cardiovascular':
          switch(true) {
            case !!durationWork && !!durationRest:
              return `${duration} mins @ ${intensity} HRR, ${durationWork} Work:${durationRest} Rest`
            default:
              return `${duration} mins @ ${intensity} HRR`
          }
        case ex.type == 'Resistance':
          return `${ sets } sets × ${ timed ? `${duration} sec` : `${reps} reps` } @ ${ metric ? `${load} kg` : `${load} lbs` }${tempo ? `, ${tempo}` : '' }`
      }
      
    }
  }
}
</script>