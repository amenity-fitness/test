<template>
  <section>
    <h1>Update User</h1>
    <div>
      <input 
        id="displayName"
        :value="displayName"
        placeholder=" "
        type="text"
        @input="updateValue($event)">
      <label for="displayName">Display Name</label>
    </div>
    <div>
      <input 
        id="email"
        :value="newEmail ? newEmail : email"
        placeholder=" "
        :class="!validEmail ? 'border-red-500' : ''"
        type="text"
        @blur="validateEmail"
        @input="updateValue($event)">
      <label for="displayName">Email</label>
    </div>
    <div>
      <input 
        id="photoUrl"
        :value="photoUrl"
        placeholder=" "
        type="text"
        @input="updateValue($event)">
      <label for="photoUrl">Photo Url</label>
    </div>
    <button id="delete" @click="deleteAccount">Delete Account</button>
  </section>
</template>
<script>
export default {
  props: ['displayName', 'email', 'photoUrl', 'localId', 'customAttributes'],
  data: () => ({
    newEmail: '',
    validEmail: true
  }),
  methods: {
    deleteAccount() {
      this.$emit('delete')
    },
    updateValue(e) {
      const { value, id } = e.target
      if (id == 'email') {
        this.newEmail = value
      }
      this.$emit('input', { id, value })
    },
    validateEmail(e) {
      const valid = String(e.target.value)
        .toLowerCase()
        .match(
          /^\S+@\S+\.\S+$/
        )
      if ( valid ) {
        this.validEmail = true
      } else { 
        this.validEmail = false
      }
    }
  },
  computed: {
    admin() {
      return this.customAttributes['admin']
    },
    birthDate() {
      return this.customAttributes['birthDate']
    },
    height() {
      return this.customAttributes['height']
    },
    weight() {
      return this.customAttributes['weight']
    },
    gender() {
      return this.customAttributes['gender']
    },
    metric() {
      return this.customAttributes['metric']
    }
  }
}
</script>
<style scoped>
section {
  @apply pb-2 text-center
}
input:not(:placeholder-shown) ~ label,
input:focus-within ~ label {
  @apply transform scale-75 -translate-y-5 left-0
}

input, textarea {
  @apply rounded-none
}
div {
  @apply w-full relative mt-6 pb-2
}

h1 {
  @apply text-left pb-2
}

input, textarea {
  @apply block w-full
  appearance-none border-b bg-transparent
  focus:outline-none
}
label {
  @apply absolute top-0 left-1 duration-300 origin-top-left font-medium
}
footer {
  @apply space-x-2 flex justify-end
}
#delete {
  @apply text-center text-red-400 font-bold mt-4
}
</style>