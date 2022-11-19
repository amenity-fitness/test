const express = require('express')
const { loadNuxt, build } = require('nuxt')
async function init () { 

  const isDev = process.env.NODE_ENV !== 'production'

  const nuxt = await loadNuxt(isDev ? 'dev' : 'start')

  if (isDev) {
    build(nuxt)
  }

  const app = express();

  app.use((req, res) => {
    const { originalUrl } = req
    switch (true) {
      case originalUrl == '/':
        res.sendStatus(200)
        break
      default:
        nuxt.render(req, res)
    }
  })

  const server = app.listen(3000, () => {
    console.log(`The application started on port ${server.address().port}`);
  });
}
init()