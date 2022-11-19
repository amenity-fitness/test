require('dotenv').config()
const express = require('express'),
router = express.Router(),
pug = require('pug'),
fs = require('fs'),
juice = require('juice'),
minify = require('html-minifier').minify

const { validateEmail, resetPasswordLink } = require('./')

const mail = require('@sendgrid/mail')
mail.setApiKey(process.env.MAIL_KEY)

router.post('/reset-password', validateEmail, resetPasswordLink, (req, res) => {
  const { link, user } = res.locals
  try {
    const to = user.email,
    subject = 'Password Reset',
    route = `${__dirname}/../views/auth/reset.pug`,
    cta = {
      text: 'Reset Password',
      url: link,
      alt: 'If you do not want to reset your password you may disregard this email.'
    }
    let html = pug.renderFile(route, { cta })
    html = juice(html)
    html = minify(html, {
      removeAttributeQuotes: true,
      collapseWhitespace: true,
      userShortDoctype: true,
      sortClassName: true,
      removeRedundantAttributes: true
    })
    mail.send({
      to,
      subject,
      from: {
        email: process.env.SENDER_EMAIL,
        name: 'Amenity Fitness'
      },
      html
    })
    res.sendStatus(200)
  } catch (err) {
    res.send(err)
  }
})





router.get('/dev/:folder/:template', async (req, res) => {
  const { folder, template } = req.params
  if (process.env.NODE_ENV == 'development') {
    res.render(`${folder}/${template}.pug`, req.query)
  } else {
    res.sendStatus(500)
  }
})

router.get('/:folder/:template', async (req, res) => {
  const { subject, payload } = req.body
  const { folder, template } = req.params
  try {
    const to = 'amenity.lifestylefitness@gmail.com',
    subject = 'Hello from Amenity.Fitness!',
    route = `${__dirname}/../views/${folder}/${template}.pug`
    let html = pug.renderFile(route, req.query)
    html = juice(html)
    html = minify(html, {
      removeAttributeQuotes: true,
      collapseWhitespace: true,
      userShortDoctype: true,
      sortClassName: true,
      removeRedundantAttributes: true
    })
    await mail.send({
      to,
      subject,
      from: {
        email: process.env.SENDER_EMAIL,
        name: 'Amenity Fitness'
      },
      html
    })
    res.send(html)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

router.post('/send-mail', async (req, res) => {
  const { recipients, subject, template } = req.body
  try {
    recipients.forEach(async sub => {
      const to = sub.email
      let html
      const ext = template.split('.')['1']
      if (ext == 'html') {
        html = fs.readFileSync(template).toString()
        html = await juice(html)
      } else {
        html = pug.renderFile(template, { name: 'Paul', uid: 'c3yOKtr9lnbfd0Gw8WYZGEpdZFo2' })
        html = await juice(html)
      }
      await mail.send({
        to,
        subject,
        from: {
          email: process.env.SENDER_EMAIL,
          name: 'Amenity Fitness'
        },
        // sendAt: 1633901813,
        // personalizations: [
        //   {
        //     to: [
        //       {
        //         email: "info@amenity.fitness",
        //       }
        //     ],
        //     sendAt: 1633888328
        //   }
        // ],
        html
      })
    })
    res.sendStatus(200)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

router.post('/promo', async (req, res) => {
  const { list, subject, template } = req.body
  try {
    const ref = db.collection(list)
    const recipients = await ref.get()
    recipients.forEach(async doc => {
      const sub = doc.data()
      sub['uid'] = doc.id
      
      const { name, uid, email } = sub
      let html = pug.renderFile(template, {
        name,
        uid
      })
      html = juice(html)

      mail.send({
        html,
        subject,
        to: email,
        from: {
          email: process.env.SENDER_EMAIL,
          name: 'Amenity Fitness'
        },
      })
    })
    res.sendStatus(200)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

router.post('/basic', async (req, res) => {
  const { to, subject, text } = req.body
  try {
    await mail.send({
      to,
      subject,
      text,
      from: {
        email: process.env.SENDER_EMAIL,
        name: process.env.SENDER_NAME
      }
    })
    res.sendStatus(200)
  } catch (err) {
    res.sendStatus(500)
  }
})

module.exports = router