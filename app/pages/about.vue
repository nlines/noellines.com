<script setup lang="ts">
import { TooltipArrow, TooltipContent, TooltipPortal, TooltipProvider, TooltipRoot, TooltipTrigger } from 'reka-ui'
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

// Kept in alphabetical order. Each description says what the tool is, not how
// much I have used it, and shows in a tooltip on hover or keyboard focus.
const tools = [
  { name: 'AWS', description: 'Amazon\'s cloud platform' },
  { name: 'Azure', description: 'Microsoft\'s cloud platform' },
  { name: 'Backstage', description: 'Open-source developer portal framework' },
  { name: 'C#/.NET', description: 'Microsoft\'s language and application platform' },
  { name: 'Claude', description: 'Anthropic\'s AI assistant and models' },
  { name: 'Databricks', description: 'Data and AI analytics platform' },
  { name: 'Datadog', description: 'Monitoring and observability platform' },
  { name: 'Docker', description: 'Container packaging and runtime' },
  { name: 'Elasticsearch', description: 'Search and analytics engine' },
  { name: 'GitHub Copilot', description: 'AI pair-programming assistant' },
  { name: 'GitLab CI/CD', description: 'Built-in build, test and deploy pipelines' },
  { name: 'Python', description: 'General-purpose programming language' },
  { name: 'Terraform', description: 'Infrastructure-as-code tool' },
  { name: 'Vue.js', description: 'JavaScript framework for user interfaces' },
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
    <!-- Each chip is a focusable button so keyboard and screen-reader users get
         the description too; it has no action of its own. -->
    <TooltipProvider :delay-duration="200">
      <ul class="mt-4 flex flex-wrap gap-2">
        <li v-for="tool in tools" :key="tool.name">
          <TooltipRoot>
            <TooltipTrigger
              type="button"
              class="rounded-full border border-border bg-card px-3 py-1 text-sm text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              {{ tool.name }}
            </TooltipTrigger>
            <TooltipPortal>
              <TooltipContent
                side="top"
                :side-offset="8"
                class="z-50 max-w-60 rounded-md border border-border bg-popover px-3 py-1.5 text-center text-sm text-popover-foreground shadow-md"
              >
                {{ tool.description }}
                <TooltipArrow class="fill-popover stroke-border" />
              </TooltipContent>
            </TooltipPortal>
          </TooltipRoot>
        </li>
      </ul>
    </TooltipProvider>

    <div class="mt-12">
      <NuxtLink to="/contact" :class="buttonVariants()">
        Get in touch
      </NuxtLink>
    </div>
  </section>
</template>
