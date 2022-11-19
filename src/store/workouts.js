export const actions = {
  async getWorkouts({ dispatch }, { uid }) {
    const res = await dispatch(
      'db/dbRead',
      { url: `documents/users/${ uid }/workouts` },
      { root: true }
    )
    let workouts = []
    Object.keys(res)
      .forEach(key => {
        workouts.push({
          ...res[key],
          id: key
        })
      })
    return workouts
  }
}