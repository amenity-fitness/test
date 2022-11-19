export default async function ({ $axios, store }, inject ){
  const db = $axios.create({})
  db.setBaseURL('https://firestore.googleapis.com/v1/projects/amenity-fitness/databases/(default)/'),
  inject('db', db)
}