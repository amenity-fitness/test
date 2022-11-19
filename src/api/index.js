const express = require('express')
const app = express()
const admin = require('firebase-admin')
const { auth } = require("./middleware.js")
const { GA_TRACKING_ID } = process.env
// const fetch = require('node-fetch')
import fetch from 'node-fetch'

const serviceAccount = require('../../service-account.json')
const credential = admin.credential.cert(serviceAccount)
!admin.apps.length ?
  admin.initializeApp({ credential }) : null


app.enable('trust proxy')
app.use(express.json())
app.use('/email', require('./routes/email'))
app.set('view engine', 'pug')
app.set('views', 'api/views')

app.post('/claims-set', auth, async (req, res) => {
  try {
    const { claims } = req.body
    const { sub } = res.locals
    const result = await admin
      .auth()
      .setCustomUserClaims(sub, claims)
    res.send(result)
  } catch (err) {
    res.sendStatus(500)
  }
})

const trackEvent = (events) => {

};

app.post('/analytics', async (req, res, next) => {
  try {
    const { events, clientId } = req.body,
    measurement_id = 'G-93WEPK588T',
    api_secret = 'BjKWI7-7StmVMsoNgpqpXg',
    url = `https://www.google-analytics.com/mp/collect?measurement_id=${ measurement_id }&api_secret=${ api_secret }`
    const result = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        client_id: clientId,
        events
      })
    });
    console.log(result)
    res.status(200).send('Event tracked.').end();
  } catch (error) {
    console.log(error)
    res.status(500).send(error).end();
  }
});

module.exports = {
  path: '/api',
  handler: app
}