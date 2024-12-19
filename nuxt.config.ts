// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {enabled: true},

  vite: {
    optimizeDeps: {
      exclude: ['vee-validate']
    }
  },

  app: {
    head: {
      title: 'DietTailor',
      meta: [
        {name: 'viewport', content: 'width=device-width, initial-scale=1'},
        {name: 'og:title', content: 'DietTailor'},
        {name: 'description', content: 'Kickstart your Nuxt app.'},
        {name: 'og:description', content: 'Kickstart your Nuxt app.'},
        {name: 'msapplication-TileColor', content: '#ffffff'},
        {name: 'theme-color', content: '#ffffff'},
      ],
      link: [
        // {rel: 'icon', type: 'image/x-icon', href: '/logo.svg'},

        // Generate using https://realfavicongenerator.net/
        // {rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon.png'},
        // {rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon/favicon-32x32.png'},
        // {rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon/favicon-16x16.png'},
        // {rel: 'manifest', href: '/favicon/site.webmanifest'},
        // {rel: 'mask-icon', href: '/favicon/safari-pinned-tab.svg', color: '#ffffff'},
      ],
    },
  },

  runtimeConfig: {
    openaiApiKey: process.env.NUXT_OPENAI_API_KEY,
  },

  css: ['../assets/css/main.css'],

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    // '@nuxtjs/supabase',
    "shadcn-nuxt",
    '@vueuse/nuxt',
  ],

  // supabase: {
  //   redirect: false,
  // redirectOptions: {
  //   exclude: ['/register'],
  // }
  // },
  shadcn: {
    prefix: '',
    componentDir: './components/ui',
  },

  compatibilityDate: '2024-12-19',
})