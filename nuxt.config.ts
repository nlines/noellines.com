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
      // Fully static site. '/' seeds the crawl and the header nav links out
      // to every other route, so /about, /projects and /contact are picked
      // up automatically. A wildcard route rule does NOT work here: it marks
      // routes prerenderable but never seeds the queue, so nothing is built.
      routes: ['/'],
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