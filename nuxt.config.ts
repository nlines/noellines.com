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

  modules: ['shadcn-nuxt', '@nuxtjs/color-mode'],

  colorMode: {
    // The module defaults to classSuffix '-mode', which would put
    // `dark-mode` on <html>. Tailwind's dark variant here is declared as
    // `@custom-variant dark (&:is(.dark *))` and needs a bare `.dark`, so
    // without this no dark styles apply at all.
    classSuffix: '',
    preference: 'system',
    fallback: 'dark',
  },

  shadcn: {
    prefix: '',
    componentDir: '@/components/ui',
  },
});