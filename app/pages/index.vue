<script setup lang="ts">
import { buttonVariants } from '@/components/ui/button'

// Home gets the full tagline as its whole title; the site-wide
// `%s · Noel Lines` template would turn it into "…· Noel Lines".
useHead({
  title: 'Noel Lines - Engineer, Builder, Technologist',
  titleTemplate: '%s',
})

// Each title is a verb phrase that completes the "What I do" heading, then one
// plain sentence of proof. Kept general, with no internal tool names and no
// team or usage figures.
const highlights = [
  {
    title: 'Build the foundations.',
    body: 'The infrastructure, pipelines and tooling that let other engineers ship with confidence.',
  },
  {
    title: 'Put AI to work.',
    body: 'Security agents that find vulnerabilities, propose the fixes and raise the tickets and alerts, so people can focus on the problems that need them.',
  },
  {
    title: 'Modernize without the drama.',
    body: 'Legacy systems migrated and rebuilt while the business keeps running.',
  },
]

// The three projects marked `featured` in app/utils/projects.ts, most recent first.
const featuredProjects = projects.filter(project => project.featured)

const email = contacts.find(c => c.label === 'Email')
const linkedin = contacts.find(c => c.label === 'LinkedIn')
</script>

<template>
  <HomeHero />

  <!-- Below the hero: three outcome cards, a teaser of three projects, then a
       closing call to action. The page also needs this height for the hero's
       scroll-driven motion. -->
  <section class="mx-auto w-full max-w-6xl px-6 py-24 sm:py-32">
    <h2 class="text-sm font-medium tracking-widest text-muted-foreground uppercase">
      What I do
    </h2>

    <!-- From `md` up each card spans two rows of the list's grid (title, then
         body) and inherits them as a subgrid, so the bodies line up across
         cards even when one title wraps onto two lines. -->
    <ul class="mt-8 grid gap-4 md:grid-cols-3 md:gap-y-0">
      <li
        v-for="item in highlights"
        :key="item.title"
        class="rounded-lg border border-border bg-card p-6 md:row-span-2 md:grid md:grid-rows-subgrid"
      >
        <h3 class="text-2xl leading-tight font-bold tracking-tight text-balance text-amber-700 dark:text-primary">
          {{ item.title }}
        </h3>
        <p class="mt-3 text-muted-foreground">
          {{ item.body }}
        </p>
      </li>
    </ul>
  </section>

  <!-- No top padding: the section above already leaves the gap. -->
  <section class="mx-auto w-full max-w-6xl px-6 pb-24 sm:pb-32">
    <div class="flex items-baseline justify-between gap-4">
      <h2 class="text-sm font-medium tracking-widest text-muted-foreground uppercase">
        What I've built
      </h2>
      <NuxtLink
        to="/projects"
        class="rounded-sm text-sm font-medium text-amber-700 underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none dark:text-primary"
      >
        See all projects
      </NuxtLink>
    </div>

    <ul class="mt-8 grid gap-4 md:grid-cols-3">
      <li v-for="project in featuredProjects" :key="project.title">
        <ProjectCard :project="project" />
      </li>
    </ul>
  </section>

  <section class="border-t border-border bg-card/50">
    <div class="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-16 sm:py-20 md:flex-row md:items-center md:justify-between">
      <div>
        <h2 class="text-2xl font-bold tracking-tight sm:text-3xl">
          Get in touch
        </h2>
        <p class="mt-2 text-muted-foreground">
          Reach me by email or on LinkedIn.
        </p>
      </div>

      <div class="flex flex-wrap gap-3">
        <a v-if="email" :href="email.href" :class="buttonVariants()">
          Email me
        </a>
        <a
          v-if="linkedin"
          :href="linkedin.href"
          target="_blank"
          rel="noopener noreferrer"
          :class="buttonVariants({ variant: 'outline' })"
        >
          LinkedIn
          <span class="sr-only">(opens in a new tab)</span>
        </a>
      </div>
    </div>
  </section>
</template>
