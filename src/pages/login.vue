<template>
  <div class="w-full" v-show="!loading">
    <div class="w-fit mx-auto">
      <nuxt-link to="/">
        <Logo class="logo"/>
      </nuxt-link>
    </div>
    <div class="w-full">
      <transition name="fade" appear mode="out-in">
        <Forgot
          :loading="disable"
          @return="forgot = false"
          @submit="handleReset" 
          v-if="forgot"/>
        <Register
          :loading="disable"
          :inputs="inputs"
          @submit="validate"
          @toggle="toggle"
          v-else-if="register"/>
        <Login
          :loading="disable"
          :inputs="inputs"
          @forgot="forgot = true"
          @submit="validate"
          @toggle="toggle" 
          v-else/>
      </transition>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex' 
export default {
  layout: 'login',
  head: () => ({
    title: 'Login',
  }),
  async mounted() {
    const { redirect } = this
    const { refresh_token } = window.localStorage
    this.$nextTick(async () => {
      this.$nuxt.$loading.start()
      if (!this.redirect) {
        this.finishLoading()
      } else {
        if (refresh_token) {
          await this.refreshToken({refresh_token, redirect})
        } else {
          this.finishLoading()
        }
      }
    })
  },
  asyncData({query}) {
    let { redirect, register, status, message } = query
    if (status) {
      redirect = '/login' + '?' + Object.keys({ status, message })
        .map(key => key + '=' + query[key]).join('&')
    }
    return { redirect, register }
  },
  data: () => ({
    message: null,
    deferredPrompt: null,
    disable: false,
    loading: true,
    forgot: false,
    register: false,
    inputs: [
      {
        id: 'email',
        label: 'Email',
        email: true,
        error: false
      },
      {
        id: 'password',
        label: 'Password',
        error: false,
        password: true
      }
    ]
  }),
  methods: {
    ...mapActions('auth', ['signIn', 'createAccount', 'refreshToken', 'resetPassword']),
    ...mapActions(['handleSuccess', 'handleError']),
    async handleReset(evt) {
      const { email } = evt
      try {
        this.disable = true
        const valid = await this.validateEmail(email)
        switch(true) {
          case !email:
            this.handleError({
              message: 'Please include an email'
            })
            setTimeout(() => this.disable = false, 2000)
            break
          case !valid:
            this.handleError({
              message: 'Please include a valid email'
            })
            setTimeout(() => this.disable = false, 2000)
            break
          default:
            const res = await this.resetPassword({ email })
            if (res.status == 200) {
              this.disable = false
              this.forgot = false
              this.handleSuccess({
                message: 'An email has been sent'
              })
            }
        }
      } catch (err) {
        setTimeout(() => this.disable = false, 1500)
        const { data } = err.response
        this.handleError(data)
      }
    },
    async validate(evt) {
      try {
        this.disable = true
        const { email, password, name } = evt,
        valid = await this.validateEmail(email)
        let message
        switch(true) {
          case !email:
            message = 'Please include an email'
            throw {
              message,
              response: {
                data: {
                  error: {
                    message
                  }
                }
              }
            }
          case !valid:
            message = 'Please include a valid email'
            throw {
              message,
              response: {
                data: {
                  error: {
                    message
                  }
                }
              }
            }
          case !password:
            message = 'Please include a password'
            throw {
              message,
              response: {
                data: {
                  error: {
                    message
                  }
                }
              }
            }
          default:
            if (this.register) {
              await this.createAccount({email, password, name})
            } else {
              const redirect = this.redirect
              await this.signIn({email, password, redirect})
            }
        }
      } catch (err) {
        setTimeout(() => this.disable = false, 2000)
        const { data } = err.response
        this.handleError(data.error)
      }
    },
    validateEmail(email) {
      return String(email)
        .toLowerCase()
        .match(
          /^\S+@\S+\.\S+$/
        )
    },
    toggle() {
      this.register = !this.register
    },
    finishLoading() {
      this.loading = false
      this.$nuxt.$loading.finish()
    }
  }
}
</script>