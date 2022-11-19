import { openDB, deleteDB, wrap, unwrap } from 'idb'
export const state = () => ({
  db: null,
  store: null,
  collections: [],
  docs: []
})

export const mutations = {
  SET_DB(state, { db }) {
    state.db = db
  },
  SET_DOCS(state, data) {
    state['docs'] = data.val
  },
  SET_STATE(state, { key, val }) {
    state[key] = val
  },
  WRITE_DB(state, { key, val }) {
    state.db.put('offline', val, key )
  }
}
export const actions = {
  async setDB({commit}, payload) {
    commit('WRITE_DB', payload)
  },
  async initDB({ commit, dispatch }) {
    const db = await openDB('indexDb', 1, {
      upgrade(db, oldVersion, newVersion, transaction) {
        db.createObjectStore('offline')
      },
      blocked() {
      },
      blocking() {
      },
      terminated() {
      }
    })
    await commit('SET_DB', { db })
    await dispatch('popStore')
  },
  async popStore({dispatch, commit, state}) {
    const { db } = state,
    collections = await db.getAllKeys('offline')
    commit('SET_STATE', { key: 'collections', val: collections })
  },
  async getDocs({ state }) {
    const data = [],
    { collections, db } = state
    collections.forEach(async collection => {
      data.push({
        id: collection,
        val: await db.get('offline', collection)
      })
    })
    return data
  }
}

export const strict = false