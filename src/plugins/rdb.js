export default function ({ $axios, store }, inject ) {
  const db = $axios.create({})
  db.setBaseURL('https://amenity-fitness-default-rtdb.firebaseio.com/')
  inject('rdb',db)
}