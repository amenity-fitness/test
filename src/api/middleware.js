import admin from 'firebase-admin'

module.exports = {
  auth: async function (req, res, next) {
    try {
      const headers = req.headers
      const { authorization } = headers
      const idToken = authorization.split(' ')[1]
      const { sub } = await admin.auth().verifyIdToken(idToken);
      res.locals = { sub }
      next()
    } catch(err) {
      res.sendStatus(400)
    }
  }
}