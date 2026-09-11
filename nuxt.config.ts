// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  css: ['~/assets/css/tailwind.css'],
  devtools: { enabled: true },

  app: {
    head: {
      titleTemplate: '%s · Noel Lines',
    },
  },

  nitro: {
    prerender: {
      // Fully static site. Routes are listed explicitly rather than relying
      // on link crawling: the nav lives inside a closed dialog, so it is not
      // in the prerendered HTML and there is nothing to crawl from. Note a
      // wildcard route rule does NOT work here either — it marks routes
      // prerenderable but never seeds the queue, so nothing gets built.
      routes: ['/', '/about', '/projects', '/contact'],
      crawlLinks: true,
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  modules: ['shadcn-nuxt'],

  shadcn: {
    prefix: '',
    componentDir: '@/components/ui',
  },
});