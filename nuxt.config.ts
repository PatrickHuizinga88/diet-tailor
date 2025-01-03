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
      title: "DietTailor – Personalized Meal Plans Tailored to Your Preferences and Needs",
      meta: [
        {name: 'viewport', content: 'width=device-width, initial-scale=1'},
        {name: 'og:title', content: "DietTailor – Personalized Meal Plans Tailored to Your Preferences and Needs"},
        {name: 'description', content: "Create a weekly meal plan that's perfectly tailored to your dietary preferences and lifestyle goals. DietTailor adapts to your needs, from health goals to personal tastes. Start your journey today!"},
        {name: 'og:description', content: "Create a weekly meal plan that's perfectly tailored to your dietary preferences and lifestyle goals. DietTailor adapts to your needs, from health goals to personal tastes. Start your journey today!"},
        {name: 'apple-mobile-web-app-title', content: 'DietTailor'},
      ],
      link: [
        {rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon/favicon-96x96.png'},
        {rel: 'icon', type: 'image/svg+xml', href: '/favicon/favicon.svg'},
        {rel: 'shortcut icon', href: '/favicon/favicon.ico'},
        {rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon.png'},
        {rel: 'manifest', href: '/favicon/site.webmanifest'},
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