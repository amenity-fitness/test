export default function ({ $axios, $config }, inject ){
  const { stripeKey } = $config
  const billing = $axios.create({
    baseURL: 'https://api.stripe.com/v1',
    headers: {
      'Authorization': `Bearer ${stripeKey}`
    }
  })

  inject('billing', billing)
}