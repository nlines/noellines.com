<script setup lang="ts">
// Open Graph / Twitter card tags, so a shared link (LinkedIn, Slack, iMessage,
// X...) unfurls with the portrait card. Crawlers need absolute URLs, and
// `noellines.com` redirects to `www`, so the canonical origin is the www one.
const siteUrl = 'https://www.noellines.com'
const route = useRoute()

const title = 'Noel Lines - Engineer, Builder, Technologist'
const description = 'Portfolio of Noel Lines: engineer, builder and technologist.'
const imageUrl = `${siteUrl}/images/og-image.jpg`
const imageAlt = 'Noel Lines, with the words Engineer, Builder, Technologist.'

useSeoMeta({
  description,
  ogSiteName: 'Noel Lines',
  ogType: 'website',
  ogTitle: title,
  ogDescription: description,
  ogUrl: () => `${siteUrl}${route.path}`,
  ogImage: imageUrl,
  ogImageWidth: 1200,
  ogImageHeight: 627,
  ogImageAlt: imageAlt,
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: imageUrl,
  twitterImageAlt: imageAlt,
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
