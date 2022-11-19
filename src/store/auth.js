export const state = () => ({
  auth: {},
  user: {}
})

export const getters = {
  admin(state) {
    const { user } = state
    return user['customAttributes'] ? user['customAttributes'].admin : null
  },
  birthDate(state) {
    const { user } = state
    return user['customAttributes'] ? user['customAttributes'].birthDate : null
  },
  gender(state) {
    const { user } = state
    return user['customAttributes'] ? user['customAttributes'].gender : null
  },
  height(state) {
    const { user } = state
    return user['customAttributes'] ? user['customAttributes'].height : null
  },
  lastRefresh(state) {
    const { lastRefreshAt } = state.user
    return lastRefreshAt
  },
  metric(state) {
    const { user } = state
    return user['customAttributes'] ? user['customAttributes'].metric : null
  },
  profile(state) {
    const { user } = state
    return user['customAttributes'] ? user['customAttributes'] : null
  },
  token(state) {
    const { idToken, accessToken } = state.auth
    const token = idToken || accessToken
    return token || false
  },
  weight(state) {
    const { user } = state
    return user['customAttributes'] ? user['customAttributes'].weight : null
  },
}
export const mutations = {
  AUTH_SET(state, data) {
    state['auth'] = data
  },
  USER_SET(state, data) {
    let { customAttributes } = data
    if ( customAttributes ) {
      data['customAttributes'] = JSON.parse(data['customAttributes'])
    }
    state['user'] = data
  },
}

export const actions = {
  async confirmResetCode ({}, query) {
    try {
      const { oobCode, apiKey } = query,
      res = await this.$axios({
        method: 'POST',
        url: 'https://identitytoolkit.googleapis.com/v1/accounts:resetPassword?key=' + apiKey,
        data: { oobCode }
      }),
      { email } = res.data
      return { oobCode, apiKey, email }
    } catch (err) {
      throw(err)
    }
  },
  camelCase({}, data) {
    for (const key in data) {
      let words = []
      key
        .split('_')
        .forEach((word, i) => {
          if (i > 0) {
            words.push(word.charAt(0).toUpperCase() + word.slice(1))
          } else [
            words.push(word)
          ]
        })
      
      data[words.join('')] = data[key]
      delete data[key]
    }
    return data
  },
  async changePassword({ commit, dispatch }, data) {
    const { idToken, password } = data
    const returnSecureToken = true
    try {
      const res = await this.$axios({
        method: 'POST',
        url: 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=' + this.$config.projectKey,
        data: { idToken, password, returnSecureToken }
      })
      const { status, data } = res
      if (status == 200) {
        commit('USER_SET', data)
        commit('DIALOG_SET', false)
        dispatch('handleSuccess', { message: 'Success' }, { root: true })
      }
    } catch (err) {
      const { message } = err
      dispatch('handleError', { message })
    }
  },
  async createAccount({ dispatch, commit }, data) {
    const { email, password, name } = data
    try {
      let returnSecureToken = true
      const res = await this.$axios({
        method: 'POST',
        url: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.$config.projectKey,
        data: { email, password, returnSecureToken }
      })
      const { data, status } = res
      if (status == '200') {
        await commit('AUTH_SET', data)
        const { idToken, refreshToken } = data
        const { localStorage } = window
        await dispatch('getProfile', { idToken })
        localStorage['refresh_token'] = refreshToken
        await dispatch('db/dbCreate', {
          url: 'documents/users/abc',
          collectionId: 'users',
          data: { name }
        }, { root: true })
        this.$router.push('/app')
      }
    } catch (err) {
      throw(err)
    }
  },
  async deleteAccount({ dispatch }, data) {
    const { idToken } = data
    try {
      const res = await this.$axios({
        method: 'POST',
        url: 'https://identitytoolkit.googleapis.com/v1/accounts:delete?key=' + this.$config.projectKey,
        data: { idToken }
      })
      const { status } = res
      if (status == '200') {
        dispatch('signOut')
      }
    } catch (error) {
      dispatch('handleError', { message: 'Error' })
      console.log(error)
    }
  },
  async getProfile({ commit, dispatch }, { idToken }) {
    dispatch('setToken', idToken)
    const res = await this.$axios({
      method: 'POST',
      url: 'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=' + this.$config.projectKey,
      data: { idToken }
    })
    const { status, data } = res
    commit('USER_SET', data.users[0])
  },
  async handleAuth({ commit, dispatch }, { data, status, redirect }) {
    if (status == '200') {
      data = await dispatch('camelCase', data)
      const { refreshToken, idToken } = data
      const { localStorage } = window
      localStorage['refresh_token'] = refreshToken
      await commit('AUTH_SET', data)
      await dispatch('getProfile', { idToken })
      this.$router.push(redirect || '/app')
    }
  },
  async refreshToken({ dispatch }, data) {
    const { refresh_token, redirect } = data
    try {
      let grant_type = 'refresh_token'
      const res = await this.$axios({
        method: 'POST',
        url: 'https://securetoken.googleapis.com/v1/token?key=' + this.$config.projectKey,
        data: { refresh_token, grant_type }
      })
      console.log(redirect)
      dispatch('handleAuth', {
        ...res,
        redirect
      })
    } catch(e) {
      // dispatch('handleError', { message: 'Error' })
      console.log(e)
    }
  },
  async resetPassword({}, { email }) {
    try {
      const res = await this.$axios({
        method: 'POST',
        url: '/api/email/reset-password',
        data: { email }
      })
      return res
    } catch (err) {
      throw(err)
    }
  },
  async sendEmailVerification({}, data) {
    const { idToken } = data
    const requestType = 'VERIFY_EMAIL'
    try {
      const res = await this.$axios({
        method: 'POST',
        url: 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=' + this.$config.projectKey,
        data: { idToken, requestType }
      })
      console.log(res.data)
    } catch (e) {
      console.log(e)
    }
  },
  setToken({}, value) {
    if ( !value ) {
      this.$api.setToken(false)
      this.$db.setToken(false)
    } else {
      this.$api.setToken(value, 'Bearer')
      this.$db.setToken(value, 'Bearer')
    }
  },
  async signIn({ dispatch, commit }, data) {
    const { email, password, redirect, reset } = data
    try {
      let returnSecureToken = true
      const res = await this.$axios({
        method: 'POST',
        url: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + this.$config.projectKey,
        data: { email, password, returnSecureToken }
      })
      const { data, status } = res
      if (status == '200') {
        await commit('AUTH_SET', data)
        const { idToken, refreshToken } = data,
        { localStorage } = window
        await dispatch('getProfile', { idToken })
        localStorage['refresh_token'] = refreshToken
        if (reset) {
          this.$router.push('/app')
          dispatch('handleSuccess', { message: 'New password updated' }, { root: true })
        } else {
          this.$router.push(redirect || '/app')
        }
      }
    } catch(err) {
      // console.log(err.response)
      throw(err)
    }
  },
  async signOut ({ dispatch, commit }) {
    const { localStorage } = window
    localStorage.removeItem('refresh_token')
    dispatch('setToken', false)
    commit('AUTH_SET', {})
    this.$router.push('/login')
  },
  async updateClaims({ commit, dispatch }, data) {
    try {
      const { idToken, claims } = data
      // console.log(claims)
      const res = await this.$axios({
        method: 'POST',
        url: '/api/',
        data: { idToken, claims }
      })

      commit('DIALOG_SET', false)
      dispatch('handleSuccess', { message: 'Success' }, { root: true })
      dispatch('getProfile', { idToken })
      console.log(res.status)
    } catch (err) {
      console.log(err)
    }
  },
  async updateProfile({ commit }, data) {
    const { idToken, displayName, photoUrl, deleteAttribute } = data
    const returnSecureToken = true
    try {
      const res = await this.$axios({
        method: 'POST',
        url: 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=' + this.$config.projectKey,
        data: { idToken, displayName, photoUrl, deleteAttribute, returnSecureToken }
      })
      const { status, data } = res
      if (status == 200) {
        commit('USER_SET', data)
      }
    } catch (e) {
      console.log(e)
    }
  },
  async updatePassword({ dispatch }, data) {
    try {
      const { newPassword, oobCode, apiKey, email } = data
      await this.$axios({
        method: 'POST',
        url: 'https://identitytoolkit.googleapis.com/v1/accounts:resetPassword?key=' + apiKey,
        data: { oobCode, newPassword }
      })
      await dispatch('signIn', {
        email,
        password: newPassword,
        reset: true
      })
    } catch (err) {
      throw(err)
    }
  },
  async verifyEmail({}, data) {
    const { oobCode, apiKey } = data
    try {
      const res = await this.$axios({
        method: 'POST',
        url: 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=' + apiKey,
        data: { oobCode }
      })
      console.log(res.data)
    } catch (e) {
      console.log(e)
    }
  },
}