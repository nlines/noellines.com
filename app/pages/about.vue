<script setup lang="ts">
import { buttonVariants } from '@/components/ui/button'

usePageTitle('About')

// Whole years of experience since January 2012. The start is a January, so
// the count rises by one on each 1 January.
//
// The page is prerendered, so the HTML carries the figure from the day of the
// build. `useState` hands that same value to the browser, so hydration sees no
// difference, and `onMounted` then swaps in the figure for the visitor's clock.
// A stale build therefore corrects itself without a hydration mismatch.
const careerStartYear = 2012
const currentYears = () => new Date().getFullYear() - careerStartYear
const yearsOfExperience = useState('years-of-experience', currentYears)
onMounted(() => {
  yearsOfExperience.value = currentYears()
})

// The career arc, oldest first. Each step is one job on the résumé; the last
// is the current one and gets the accent rule.
const path = [
  { year: '2013', title: 'Corporate systems', detail: 'HR and payroll software' },
  { year: '2015', title: 'Consulting', detail: 'Websites, APIs and cloud apps on Azure' },
  { year: '2018', title: 'Product', detail: 'Analytics platform at eVestment, a Nasdaq company' },
  { year: '2024', title: 'Developer experience', detail: 'CI/CD and migration tooling' },
  { year: '2026', title: 'Platform and AI', detail: 'Infrastructure as code and security agents' },
]

const tools = [
  'AWS',
  'Azure',
  'Terraform',
  'GitLab CI/CD',
  'C#/.NET',
  'Python',
  'Claude',
  'GitHub Copilot',
]
</script>

<template>
  <section class="mx-auto w-full max-w-3xl px-6 py-16 sm:py-24">
    <h1 class="text-3xl font-bold tracking-tight sm:text-4xl">
      About
    </h1>

    <p class="mt-8 text-xl leading-snug font-medium tracking-tight text-balance sm:text-2xl">
      I build the platforms and automation other engineers rely on.
    </p>

    <div class="mt-8 flex flex-col gap-5 text-muted-foreground">
      <p>
        I'm a senior software engineer with {{ yearsOfExperience }} years of
        experience. From product features to cloud infrastructure, I know both
        sides of the handoff: what teams need to deploy and ship, and what it
        takes to keep it safe.
      </p>
      <p>
        I started out building the products people use: web applications, APIs
        and data systems in C# and .NET. Over time my work shifted to what sits
        underneath them, the cloud infrastructure, CI/CD pipelines and
        internal tooling that decide how quickly and safely a team can ship.
        My users are now other engineers.
      </p>
      <p>
        Throughout, I've modernized systems without breaking the business,
        from legacy migrations to a monolith-to-microservices transition.
      </p>
    </div>

    <h2 class="mt-12 text-sm font-medium tracking-widest text-muted-foreground uppercase">
      Career path
    </h2>
    <!-- Vertical on small screens, a horizontal strip from `sm` up. -->
    <ol class="mt-6 grid gap-6 sm:grid-cols-5 sm:gap-4">
      <li
        v-for="(step, i) in path"
        :key="step.year"
        class="border-l-2 pl-4 sm:border-t-2 sm:border-l-0 sm:pt-3 sm:pl-0"
        :class="i === path.length - 1 ? 'border-primary' : 'border-border'"
      >
        <p class="text-sm font-semibold text-amber-700 dark:text-primary">
          {{ step.year }}
        </p>
        <p class="mt-1 font-medium">
          {{ step.title }}
        </p>
        <p class="mt-1 text-sm text-muted-foreground">
          {{ step.detail }}
        </p>
      </li>
    </ol>

    <h2 class="mt-12 text-sm font-medium tracking-widest text-muted-foreground uppercase">
      Core tools
    </h2>
    <ul class="mt-4 flex flex-wrap gap-2">
      <li
        v-for="tool in tools"
        :key="tool"
        class="rounded-full border border-border bg-card px-3 py-1 text-sm text-card-foreground"
      >
        {{ tool }}
      </li>
    </ul>

    <div class="mt-12">
      <NuxtLink to="/contact" :class="buttonVariants()">
        Get in touch
      </NuxtLink>
    </div>
  </section>
</template>
