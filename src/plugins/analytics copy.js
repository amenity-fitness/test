// import { lookup } from 'geoip-lite'
// import Sniffr from 'sniffr'
import admin from 'firebase-admin'
import geoip from 'geo-from-ip'

async function addLog(req) {
  const { path } = req._parsedUrl,
  // s = new Sniffr(),
  userAgent = req.headers['user-agent'],
  db = admin.firestore(),
  ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress,
  const data = await geoip.allData(ip)
  // location = lookup(ip),
  // os = s.sniff(userAgent).os,
  // browser = s.sniff(userAgent).browser,
  // device = s.sniff(userAgent).device,
  // date = new Date().toISOString()
  ref = db.collection('analytics')
    // .doc(ip).collection('traffic')
  // ref.add({
  //   path,
  //   date,
  //   browser,
  //   device,
  //   os,
  //   location
  // })
  ref.add(data)
}

export default async function ({ app, req }){
  const { options } = app['router'],
  { routes } = options
  let array = []
  routes.forEach(route => {
    array.push(route.path.substr(1))
  })
  const { referer } = req.headers
  let path
  if ( referer ) {
    path = referer.split('/')
  }
  // if (process.env.NODE_ENV == 'production' && array.includes(req.url.substr(1) || path && path[path.length - 1])) {
  // if (process.env.NODE_ENV == 'production' && array.includes(req.url.substr(1) || path[path.length - 1])) {
  if (process.env.NODE_ENV == 'production' && array.includes(req.url.substr(1))) {
    !admin.apps.length
      ? admin.initializeApp()
      : null
    if (req._parsedUrl.query) {
      const query = req._parsedUrl.query.split('=')
      if (!query.includes('redirect')) {
        addLog(req)
      }
    } else {
      addLog(req)
    }
  }
}