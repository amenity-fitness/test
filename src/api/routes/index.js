import admin from 'firebase-admin'

module.exports = {
  isAdmin: async function (req, res, next) {
    const auth = req.headers.authorization
    try {
      const idToken = auth.split(' ')[1]
      const decodedToken = await admin.auth()
        .verifyIdToken(idToken)
      if (decodedToken['admin']) {
        res.locals.uid = decodedToken['uid']
        next()
      } else {
        res.sendStatus(400)
      }
    } catch(err) {
      res.sendStatus(400)
    }
  },
  customToken: async function (req, res, next) {
    const { uid, claims } = req.body
    const additionalClaims = {
      ...claims
    }
    try {
      const token = await admin
        .auth()
        .createCustomToken(uid, additionalClaims)
      res.locals = { token }
      next()
    } catch (err) {
      console.log(err)
      res.sendStatus(500)
    }
  },
  resetPasswordLink: async function (req, res, next) {
    let { email } = req.body
    if (!email) {
      email = res.locals['user'].email
    }
    const actionCodeSettings = {
      url: 'https://amenity.fitness?mode=reset-password',
      handleCodeInApp: false,
    }
    try {
      const resetLink = await admin
        .auth()
        .generatePasswordResetLink(email, actionCodeSettings)
      res.locals.link = resetLink
      next()
    } catch(err) {
      res.send(err)
    }
  },
  isLoggedIn: async function (req,res,next) {
    const auth = req.headers.authorization
    try {
      const idToken = auth.split(' ')[1]
      const decodedToken = await admin.auth()
        .verifyIdToken(idToken)
      if (decodedToken['uid']) {
        res.locals.uid = decodedToken['uid']
        next()
      } else {
        res.sendStatus(400)
      }
    } catch (err) {
      console.log(err)
      res.sendStatus(400)
    }
  },
  validateEmail: async function (req, res, next) {
    let { email } = req.body
    if (!email) {
      email = req.query['email']
    }
    try {
      const user = await admin
        .auth()
        .getUserByEmail(email)
      res.locals = { user }
      next()
    } catch (err) {
      const { code, message } = err
      res.status(400).send({
        code,
        alt: message,
        message: 'Account not found'
      })
    }
  },
  userProfile: async function (req, res, next) {
    const { uid } = req.body
    try {
      const user = await admin
        .auth()
        .getUser(uid)
      res.locals = { user }
      next()
    } catch (err) {
      console.log(err)
    }
  },
  verifyEmailLink: async function (req, res, next) {
    let { email } = req.body
    if (!email) {
      email = res.local['email']
    }
    try {
      const actionCodeSettings = {

      },
      link = await admin
        .auth()
        .generateEmailVerificationLink(email, actionCodeSettings)
      res.locals = { link }
      next()
    } catch (err) {
      console.log(err)
      res.sendStatus(500)
    }
  },
  verifyId: async function (req, res, next) {
    const { idToken } = req.body
    try {
      const user = await admin.auth()
        .verifyIdToken(idToken)
      res.locals = { user }
      next()
    } catch (err) {
      console.log(err)
    }
  }
}