<template>
<div>
  <h1>Profile</h1>
  <section v-if="customAttributes">
    <div>
      <h4>
        Height   
      </h4>
      <p>
        {{ height }} {{ metric ? 'cm' : 'Inches' }}
      </p>
    </div>
    <div>
      <h4>
        Weight
      </h4>
      <p>{{ weight }} {{ metric ? 'kgs' : 'lbs' }}</p>
    </div>
    <div>
      <h4>
        Date Of Birth
      </h4>
      <p>{{ birthDate }}</p>
    </div>
    <div>
      <h4>
        Gender
      </h4>
      <p>{{ gender | capitalize }}</p>
    </div>
  </section>
  <p v-else>Update your profile to help us personalize our services for you</p>
</div>
</template>
<script>
export default {
  props: ['displayName', 'email', 'photoUrl', 'localId', 'customAttributes'],
  methods: {
  },
  computed: {
    birthDate() {
      return this.customAttributes['birthDate'] || 'Undefined'
    },
    height() {
      return this.customAttributes['height'] || 'Undefined'
    },
    weight() {
      return this.customAttributes['weight'] || 'Undefined'
    },
    gender() {
      return this.customAttributes['gender'] || 'Undefined'
    },
    metric() {
      return this.customAttributes['metric']
    }
  },
  filters: {
    capitalize(val) {
      return val.charAt(0).toUpperCase() + val.slice(1)
    }
  }
}
</script>
<style scoped>
section {
  @apply pb-2 grid grid-cols-2 gap-4
}

h1 {
  @apply pb-2
}

p {
  @apply text-lg
}
</style>