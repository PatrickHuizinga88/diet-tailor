import tailwindcss from "@tailwindcss/vite";

const title = "DietTailor – Personalized Meal Plans Tailored to Your Preferences and Needs";
const description = "Create a daily meal plan that's perfectly tailored to your dietary preferences and lifestyle goals. DietTailor adapts to your needs, from health goals to personal tastes. Start your journey today!";

export default defineNuxtConfig({
  devtools: {enabled: true},

  site: {
    url: process.env.NUXT_PUBLIC_BASE_URL,
    name: 'DietTailor',
  },

  app: {
    head: {
      title: title,
      meta: [
        {name: 'viewport', content: 'width=device-width, initial-scale=1'},
        {name: 'og:title', content: title},
        {name: 'description', content: description},
        {name: 'og:description', content: description},
        {name: 'og:image', content: '/logo.svg'},
        {name: 'og:type', content: 'website'},
        {name: 'twitter:card', content: 'summary_large_image'},
        {name: 'twitter:title', content: title},
        {name: 'twitter:description', content: description},
        {name: 'twitter:image', content: '/logo.svg'},
        {name: 'apple-mobile-web-app-title', content: 'DietTailor'},
        {name: 'theme-color', content: '#0d7351'},
        {name: 'robots', content: 'index, follow'},
      ],
      link: [
        {rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon/favicon-96x96.png'},
        {rel: 'icon', type: 'image/svg+xml', href: '/favicon/favicon.svg'},
        {rel: 'shortcut icon', href: '/favicon/favicon.ico'},
        {rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon.png'},
        {rel: 'manifest', href: '/favicon/site.webmanifest'},
        {rel: 'sitemap', href: '/sitemap_index.xml'},
      ],
      script: [
        (process.env.NODE_ENV === 'production' ?
            {src: 'https://cloud.umami.is/script.js', 'data-website-id': "43d25c72-944a-424f-8ba8-5710aa9a98e5", defer: true} : ''
        )
      ]
    },
  },

  runtimeConfig: {
    public: {
      baseUrl: 'http://localhost:3000',
    },
    openaiApiKey: '',
    stripeSecretKey: '',
    resendApiKey: '',
  },

  css: ['../assets/css/tailwind.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  modules: [
    '@pinia/nuxt',
    '@nuxtjs/supabase',
    'shadcn-nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/i18n',
    '@nuxtjs/color-mode',
    'dayjs-nuxt',
    '@nuxtjs/sitemap',
    'motion-v/nuxt'
  ],

  supabase: {
    redirectOptions: {
      login: '/sign-in',
      callback: '',
      exclude: [
        '/',
        '/confirm-registration',
        '/contact',
        '/password-recovery',
        '/privacy-policy',
        '/results',
        '/sign-up',
        '/terms-of-service',
        '/update-password',
        '/wizard',
      ],
    }
  },

  shadcn: {
    prefix: '',
    componentDir: './components/ui',
  },

  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'en',
    locales: [
      {
        code: 'en',
        name: 'English',
        files: ['en/common.ts', 'en/404.ts', 'en/account.ts', 'en/authentication.ts', 'en/contact.ts', 'en/dashboard.ts', 'en/feedback.ts', 'en/legal.ts', 'en/pricing.ts', 'en/profile.ts', 'en/settings.ts']
      },
    ],
    bundle: {
      optimizeTranslationDirective: false,
    },
  },

  compatibilityDate: '2024-12-19',
})