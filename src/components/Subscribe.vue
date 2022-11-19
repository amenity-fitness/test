<template>
  <section>
    <div>
      <h2 class="underline">Keep up to date</h2>
      <p>Our newsletter is the best way to keep up to date with changes to our services and notifications</p>
    </div>
    <form @submit.prevent="submit">
      <Floating-Input 
        class="w-full"
        v-model="email"
        :data="input"
        @clear="clear"
        @error="input.error = true"/>
      <Button-Action
        :submit="true"
        :loading="loading"
        :text="'Submit'"/>
    </form>
  </section>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data: () => ({
    loading: false,
    email: '',
    input: {
      id: 'email',
      label: 'Email',
      email: true,
      error: false
    }
  }),
  methods: {
    ...mapActions('db', ['dbCreate']),
    clear(i) {
      this.input['error'] = false
    },
    async submit() {
      try {
        const { email } = this,
        valid = this.validateEmail(email)
        this.loading = true
        switch(true) {
          case !email:
            throw {
              message: 'Please include an email'
            }
          case !valid:
            throw {
              message: 'Please include an email'
            }
          default:
            const status = this.publicWrite({ email })
            this.$emit('submit', {
              status
            })
            setTimeout(() => this.loading = false, 2000)
            this.email = ''
        }
      } catch (error) {
        setTimeout(() => this.loading = false, 2000)
        this.$emit('error', error)
      }
    },
    validateEmail(email) {
      return String(email)
        .toLowerCase()
        .match(
          /^\S+@\S+\.\S+$/
        )
    },
    // writeDb(email, message) {
    //   return this.$axios({ 
    //     method: 'POST',
    //     url: 'https://firestore.googleapis.com/v1/projects/amenity-fitness/databases/(default)/documents/public',
    //     data: {
    //       fields: {
    //         email: {
    //           stringValue: email
    //         }
    //       }
    //     }
    //   })
    // },
  }
}
</script>

<style scoped>
form {
  @apply space-x-1
  flex items-end
}
button {
  @apply py-3 border bg-transparent
}
section {
  @apply p-4 mb-2 
  bg-accent rounded-t-xl space-y-2
}
img {
  @apply aspect-[3/2]
}
</style>