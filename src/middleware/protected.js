export default function ({ req, store, redirect }) {
  const { auth } = store.state,
  props = Object.keys(auth.auth)
  if (!props.length) {
    if (req) {
      redirect('/login' + `?redirect=${req.url ? req.url : req.href}`)
    } else {
      redirect('/login')
    }
  }
}