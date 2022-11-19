export default {
  publicRuntimeConfig: {
    mapsKey: process.env.MAPS_KEY,
    projectKey: process.env.PROJECT_KEY,
    stripeKey: process.env.STRIPE_KEY
  },
  srcDir: 'src/',
  head: {
    titleTemplate: '%s - Amenity Fitness',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: "width=device-width, user-scalable=no" },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      { name:"apple-mobile-web-app-capable", content:"yes"},
      { name:"theme-color", content:"" },
      { name:"published", content: new Date().toISOString()},
      { name:"modified", content: new Date().toISOString()}
    ],
    script: [
      {
        async: true,
        src: "https://www.googletagmanager.com/gtag/js?id=G-93WEPK588T"
      }
    ],
    link: [
      { rel: "apple-touch-icon", sizes: "192x192", href: "/icon-192x192.png" },
      { rel: "apple-touch-icon", sizes: "512x512", href: "/icon-512x512.png" },
      // { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      // { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
      // { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@1,600&display=swap' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  serverMiddleware: [
    '~/api',
    '~/api/headers.js'
  ],
  loading: '~/components/Loading.vue',
  css: [
    '~/assets/css/main.css'
  ],
  axios: {
    proxy: true
  },
  proxy: {
    '/api/': process.env.NODE_ENV !== 'development' ? 'https://amenity.fitness/api/' : 'http://localhost:3000/api/',
  },
  plugins: [
    '~/plugins/api',
    '~/plugins/db',
    '~/plugins/rdb',
    '~/plugins/billing',
    { src: '~/plugins/timezone', mode: 'server' },
    // { src: '~/plugins/analytics', mode: 'client' },
    { src: '~/plugins/dark', mode: 'client' },
    // { src: '~/plugins/sw', mode: 'client' }
  ],
  router: {
    prefetchLinks: true
    // middleware: 'analytics'
  },
  components: true,
  buildModules: [
    '@nuxt/postcss8',
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxt/content'
  ],
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  }
}
