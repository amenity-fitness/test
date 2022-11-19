export default function ({ $axios }, inject ){
  const api = $axios.create({})

  inject('api', api)
}