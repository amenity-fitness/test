import { lookup } from 'geoip-lite'

export default async function ({ app, req, res }){
  const ip = req.headers['x-forwarded-for']
    || req.connection.remoteAddress,
  location = lookup(ip)
  res.setHeader('location', location)
}