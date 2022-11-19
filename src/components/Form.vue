<template>
<section class="pb-6">
  <h1 class="title pl-3">Contact Us</h1>
  <div class="card">
    <div>
      <p>
        {{ cta }}
        Additionally, <a @click="$store.commit('DIALOG_SET', 'Request-Callback')">Request A Callback</a> to speak with one of our trainers
      </p>
      <form @submit.prevent="submit">
        <Floating-Input
          v-for="(input, i) in inputs"
          v-model="$data[input.id]"
          @clear="clear"
          @error="error"
          :data="input"
          :i="i"
          :key="i" />
        <footer>
          <Button-Action class="shadow-sm" :submit="true" :loading="loading" :text="'Submit'"/>
        </footer>
      </form>
    </div>
    <section>
      <p class="text-sm opacity-80 italic py-2">
        Use of our contact form implies that you have acknowledged and agree to our 
        <nuxt-link to="/privacy-policy" target="_blank" class="text-sm">
          Privacy Policy
        </nuxt-link>
      </p>
    </section>
  </div>
</section>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: ['cta'],
  data: () => ({
    loading: false,
    email: '',
    message: '',
    inputs: [
      {
        id: 'email',
        label: 'Email',
        email: true,
        error: false
      },
      {
        id: 'message',
        label: 'Message',
        error: false,
        multi: true
      }
    ]
  }),
  methods: {
    ...mapActions('scheduling', ["publicWrite"]),
    clear(i) {
      this.inputs[i].error = false
    },
    error(i) {
      this.inputs[i].error = true
    },
    async submit() {
      try {
        this.loading = true
        const { email, message } = this
        const valid = await this.validateEmail(email)
        switch(true) {
          case !email:
            throw {
              message: 'Please include an email'
            }
          case !valid:
            throw {
              message: 'Please include a valid email'
            }
          case !message:
            throw {
              message: 'Please include an email'
            }
          default:
            const status = await this.publicWrite({ email, message })
            this.$emit('submit', {
              message: 'Message Sent',
              status
            })
            this.email = ''
            this.message = ''
            setTimeout(() => this.loading = false, 2000)
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
  }
}
</script>

<style scoped>
form {
  @apply flex flex-col
  bg-foremost
  border rounded-xl p-4 mt-4
}
</style>