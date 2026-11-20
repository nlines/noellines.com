<script setup lang="ts">
// Home gets the full tagline as its whole title; the site-wide
// `%s · Noel Lines` template would turn it into "…· Noel Lines".
useHead({
  title: 'Noel Lines - Engineer, Builder, Technologist',
  titleTemplate: '%s',
})
</script>

<template>
  <HomeHero />

  <!-- Placeholder band so the page has somewhere to scroll to: the hero's
       scroll-driven motion needs scrollable distance, and Home is otherwise a
       single screen. Stands in for the alternating section bands deferred in
       ui-plan.md; replace with real content. -->
  <section class="mx-auto w-full max-w-6xl px-6 py-24 sm:py-32">
    <h2 class="text-2xl font-semibold tracking-tight sm:text-3xl">
      Placeholder section
    </h2>
    <p class="mt-4 max-w-prose text-muted-foreground">
      Stand-in content below the hero. Selected work, a short bio, or the first
      of the alternating section bands will go here.
    </p>
    <div class="mt-10 h-64 rounded-lg border border-dashed border-border" />
  </section>
</template>
