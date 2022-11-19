export const state = () => ({
  calendar: false,
  dialog: null,
  snackbar: {
    state: false,
    message: 'No error present',
    err: false
  },
  location: ''
})

export const mutations = {
  CALENDAR_SET(state, boolean) {
    state['calendar'] = boolean
  },
  DIALOG_SET(state, boolean) {
    const {scrollY} = window
    if (boolean == false) {
      document.body.classList.remove('overflow-hidden')
    } else {
      document.body.classList.add('overflow-hidden')
    }
    state['dialog'] = boolean
  },
  ERROR_SHOW(state, data) {
    let { message, deleteAccount } = data
    const lowercase = message
      .replace(/_/g," ")
      .toLowerCase()
      
    message = lowercase
      .charAt(0)
      .toUpperCase()
      +
      lowercase
        .slice(1)
    
    message = message.split(':')[0]

    state.snackbar = {
      state: true,
      err: true,
      message,
      deleteAccount
    }
  },
  SNACKBAR_REMOVE(state) {
    state.snackbar['state'] = false
  },
  SUCCESS_SHOW(state, data) {
    let { message } = data

    const lowercase = message
      .replace(/_/g," ")
      .toLowerCase()
      
    message = lowercase
      .charAt(0)
      .toUpperCase()
      +
      lowercase
        .slice(1)

    state.snackbar = {
      state: true,
      err: false,
      message
    }
  },
  SET_LOCATION(state, data) {
    state['location'] = data
  }
}

export const actions = {
  analyticsEvent({}, { name, params }) {
    try {
      const { analytics_id } = window.localStorage,
      clientId = analytics_id
      this.$axios({
        method: 'POST',
        url: '/api/analytics',
        data: {
          events: [{
            name,
            params
          }],
          clientId
        }
      })
    } catch (err) {
      console.log(err)
    }
  },
  handleError({commit}, data) {
    commit('ERROR_SHOW', data)
    setTimeout(() => commit('SNACKBAR_REMOVE'), 3000)
  },
  handleSuccess({commit}, data) {
    commit('SUCCESS_SHOW', data)
    setTimeout(() => commit('SNACKBAR_REMOVE'), 3000)
  },
  async nuxtServerInit({ dispatch, commit }, { query, route, redirect, res }) {
    try {
      const { message, status, mode } = query
      // location = res.getHeader('location')
      // commit('SET_LOCATION', location)
      switch (true) {
        case mode == 'resetPassword':
          if (route['name'] !== 'reset-password') {
            const redirectQuery = route.fullPath.slice(1)
            redirect('/reset-password' + redirectQuery)
          }
          break
        case mode == 'verifyEmail':
          dispatch('auth/verifyEmail', query)
          break
        case mode == 'signIn':
          break
        case status == 'error':
          dispatch('handleError', { message })
          break
        case status == 'success':
          dispatch('handleSuccess', { message })
          break
      }
    } catch (err) {
      console.log(err)
    }
  }
}