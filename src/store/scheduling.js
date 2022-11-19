export const actions = {
  async publicWrite({ dispatch }, data) {
    const { subscribe, email, message, callback } = data
    try {
      switch (true) {
        case callback:
          return dispatch('db/dbCreate', {
            url: `documents/callback`,
            collectionId: 'callback',
            parent: `projects/amenity-fitness/databases/(default)/documents`,
            data
          },
          { root: true })
        case subscribe:
          return dispatch('db/dbCreate', {
            url: `documents/subscribers`,
            collectionId: 'subscribers',
            parent: `projects/amenity-fitness/databases/(default)/documents`,
            data: {
              email
            },
          },
          { root: true })
        default:
          return dispatch('db/dbCreate', {
            url: `documents/public`,
            collectionId: 'public',
            parent: `projects/amenity-fitness/databases/(default)/documents`,
            data: {
              email,
              message
            }
          },
          { root: true })
      }
    } catch (err) {
      const { data } = err.response
      throw data.error
    }
  },
  dateFormat({}) {
    try {
      let date = new Date(),
      selectDate = new Date()
  
      selectDate.setHours(date.getHours() + 17)
      selectDate.setMinutes(0)
      selectDate.setSeconds(0)
      selectDate.setMilliseconds(0)

      date.setHours(date.getHours() - 7)
  
      return {
        date: date.toISOString().substr(0, 10),
        selectDate: selectDate.toISOString()
      }
    } catch (err) {
      console.log(err)
    }
  },
  async inventorySet({ dispatch }, { user, service, data }) {
    try {
      await dispatch('db/dbWrite', {
        url: `documents/users/${ user['localId'] }/inventory/${ service }`,
        collectionId: 'inventory',
        data
      }, { root: true })
      return true
    } catch (err) {
      throw err
    }
  },
  async sessionAdd({ dispatch }, { user, inventory, product, service, time, trainer }) {
    try {
      const ml = new Date(time).setMilliseconds(0)
      const date = new Date(ml),
      productLength = product['duration'],
      mins = date.getMinutes(),
      sessionStart = new Date(time),
      start = new Date(new Date(time).setMinutes(mins - 60)),
      end = new Date(new Date(time).setMinutes(mins + 60 + productLength)),
      dy = date.getDate(),
      mo = date.getMonth(),
      yr = date.getFullYear()

      await dispatch('db/dbCreate', {
        url: 'documents/schedule',
        collectionId: 'schedule',
        data: {
          conflict: true,
          end,
          start,
          date: new Date(yr, mo, dy).toISOString().substr(0, 10),
          productId: product.id,
          productLength,
          serviceId: service,
          sessionStart,
          trainer,
          uid: user.localId
        }
      }, { root: true })

      let data = {}
      data[ product.id ] = inventory[ service ][ product.id ]
      data[ product.id ][ product.duration ]--
      
      await dispatch('inventorySet', {
        user,
        service,
        data
      })
      dispatch('handleSuccess', { message: 'Success' }, { root: true })
      return { qty: data[product.id][ product.duration ] }
    } catch (err) {
      console.log(err)
      const { error } = err.response.data
      dispatch('handleError', error, { root: true })
    }
  },
  async sessionRemove({ dispatch }, { id, inventory, service, product, user }) {
    try {
      let data = {
        conflict: false
      }
      await dispatch('db/dbWrite', {
        url: `documents/schedule/${ id }`,
        collectionId: 'schedule',
        data
      }, { root: true })
      delete data['conflict']
      data[ product.id ] = inventory[ service ][ product.id ]
      data[ product.id ][ product.duration ]++
      await dispatch('inventorySet', { user, service, data })
      dispatch('handleSuccess', { message: 'Success' }, { root: true })
      return { qty: data[product.id][ product.duration ] }
    } catch (err) {
      if (err.response) {
        const { error } = err.response.data
        dispatch('handleError', error, { root: true })
      } else {
        console.log(err)
      }
    }
  },
  async reqCallback({ dispatch }) {
    const date = new Date(),
    hrs = date.getHours()
    date.setHours(hrs + 24)
    const selectDate = new Date(date).toISOString(),
    conflicts = await dispatch('scheduleList', { selectDate }),
    paul = conflicts.filter(conflict => conflict.trainer == 'paul'),
    katey = conflicts.filter(conflict => conflict.trainer == 'katey')
    return { paul, katey }
  },
  async scheduleInit({ rootState, dispatch }, { trainer }) {
    const { user } = rootState,
    uid = user.localId,
    { date, selectDate } = await dispatch('dateFormat'),
    cards = await dispatch('billing/cardsList', {}, { root: true })
    
    if (trainer) {
      const inventory = await dispatch('db/dbRead', { url: `documents/users/${ uid }/inventory` }, {root: true }),
      { unavailable, unavailableOrig, userSession } = await dispatch('scheduleList', { selectDate, uid, trainer })
      return {
        cards,
        date,
        inventory,
        selectDate,
        trainer,
        uid,
        unavailable,
        unavailableOrig,
        userSession,
      }
    }

    return {
      cards,
      date,
      selectDate,
      trainer: null,
      uid,
      unavailable: null,
      unavailableOrig: null,
      userSession: null,
    }
  },
  async scheduleList({ dispatch }, { trainer, selectDate, uid }) {
    try {
      const orderBy = !!uid ? {
        field: {
          fieldPath : "start"
        },
        direction : "DESCENDING"
      } : null,
      res = await dispatch('db/dbQuery',
        {
          url: 'documents:runQuery',
          parent: 'projects/amenity-fitness/databases/(default)/documents',
          structuredQuery: {
            where: {
              fieldFilter: {
                field: {"fieldPath": "date"},
                op:"EQUAL",
                value: {"stringValue": selectDate.substr(0, 10) }
              }
            },
            from: [{
              "collectionId": "schedule"
            }],
            orderBy
          } 
        },
        {
          root: true 
        })
      if (uid) {
        const zMill = (time) => { return new Date(time).setMilliseconds(0) }
        res.forEach((conflict, i) => {
          conflict['start'] = new Date(zMill(conflict['start'])).toISOString()
          conflict['sessionStart'] = new Date(zMill(conflict['sessionStart'])).toISOString()
          conflict['end'] = new Date(zMill(conflict['end'])).toISOString()
        })
        return {
          unavailableOrig: res.filter(doc => doc.conflict == true),
          unavailable: res.filter(doc => doc.trainer == trainer && doc.conflict == true),
          userSession: res.filter(doc => doc.uid == uid && doc.conflict == true)
        }
      } else {
        return res.filter(doc => doc.conflict == true)
      }
    } catch (err) {
      console.log(err)
    }
  }
}