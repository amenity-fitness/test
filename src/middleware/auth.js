export default function ({ store, redirect }) {
  const { admin } = store.getters
  if (!admin) {
    redirect('/app')
  }
}