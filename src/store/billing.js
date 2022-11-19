export const actions = {
  async cardAttach({ dispatch, rootGetters }, data) {    
    try {
      const { profile } = rootGetters,
      { source } = data
      let { stripeId } = profile
      if (!stripeId) {
        stripeId = await dispatch('customerCreate')
      }
      const res = await this.$billing({
        method: 'POST',
        url: `/customers/${ stripeId }/sources`,
        params: { source }
      })
    } catch(err) {
      throw err
    }
  },
  async cardDelete({ rootGetters, dispatch }, data) {
    try {
      const { profile } = rootGetters,
      { stripeId } = profile,
      { id } = data,
      res = await this.$billing({
        method: 'DELETE',
        url: `/customers/${ stripeId }/sources/${ id }`
      }),
      { deleted } = res.data
      if ( deleted ) {
        dispatch('handleSuccess', { message: 'Success' }, { root:true })
        return true
      }
    } catch(err) {
      const { error } = err.response.data
      dispatch('handleError', error, { root:true })
    }
  },
  async cardsList({ rootGetters }) {
    try {
      const { profile } = rootGetters,
      { stripeId } = profile,
      result = await this.$billing({
        method: 'GET',
        url: `/customers/${ stripeId }/sources`
      })
      return result['data'].data
    } catch(err) {
      console.log(err)
    }
  },
  async cardToken({ dispatch }, { attach, card }) {
    try {
      const res = await this.$billing({
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: await dispatch('queryString', card),
        url: '/tokens'
      }),
      { data } = res
      if (data) {
        if ( attach ) {
          await dispatch('cardAttach', { source: data['id'] })
        }
        dispatch('handleSuccess', { message: 'Success' }, { root:true })
        return { card: data['card'] }
      }
    } catch(err) {
      const { error } = err.response.data
      dispatch('handleError', error, { root:true })
    }
  },
  async chargeCreate({ rootGetters }, data) {
    try {
      const { profile } = rootGetters,
      { stripeId } = profile,
      { card, total } = data,
      charge = await this.$billing({
        method: 'POST',
        url: '/charges',
        params: {
          amount: total * 100,
          currency: "CAD",
          source: card['id'],
          customer: stripeId
        }
      })
      // dispatch('handleSuccess', { message: 'Success' }, { root: true })
      return charge
    } catch(err) {
      const { error } = err.response.data
      dispatch('handleError', error, { root: true })
    }
  },
  async customerCreate({}) {
    try {
      const customer = await this.$billing({
        method: 'POST',
        url: '/customers'
      }),
      stripeId = customer['id']
      await dispatch('/userUpgrade', { stripeId })
      return stripeId
    } catch(err) {
      console.log(err)
    }
  },
  async customersList({}) {
    try {
      const customers = await this.$billing({
        method: 'GET',
        url: '/customers'
      })
      console.log(customers)
    } catch(err) {
      console.log(err)
    }
  },
  async pmDetach({}, data) {
    try {
      const { pm } = data,
      result = await this.$billing({
        method: 'POST',
        url: `/payment_methods/${ pm }/detach`
      })
      return result.data
    } catch(err) {
      console.log(err)
    }
  },
  async pmList({ rootGetters }) {
    const { profile } = rootGetters
    const { stripeId } = profile
    try {
      const result = await this.$billing({
        method: 'GET',
        url: `/payment_methods`,
        params: {
          customer: stripeId,
          type: 'card'
        }
      })
      return result.data
    } catch(err) {
      console.log(err)
    }
  },
  queryString({}, data) {
    const params = new URLSearchParams()
    for (const [key, value] of Object.entries(data)) {
      params.append(`card[${key}]`, `${ value }`)
    }
    return params.toString()
  },
  async userUpgrade({ dispatch, rootGetters }, data) {
    try {
      const { stripeId } = data,
      { profile } = rootGetters,
      claims = {
        ...profile,
        stripeId
      },
      result = await this.$api({
        method: 'POST',
        url: '/api/claims-set',
        data: {
          claims
        }
      }),
      { refresh_token } = window.localStorage
      dispatch('refreshToken', { refresh_token })
    } catch (err) {
      console.log(err)
    }
  }
}