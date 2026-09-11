<script setup lang="ts">
useHead({ title: 'Projects' })

// Placeholder entries. Plain objects for now — no data layer until the real
// project list exists and its shape is settled.
const projects = [
  { title: 'Project one', description: 'Placeholder description of the first project.' },
  { title: 'Project two', description: 'Placeholder description of the second project.' },
  { title: 'Project three', description: 'Placeholder description of the third project.' },
]
</script>

<template>
  <section class="mx-auto w-full max-w-5xl px-6 py-16 sm:py-24">
    <h1 class="text-3xl font-bold tracking-tight sm:text-4xl">
      Projects
    </h1>
    <p class="mt-4 max-w-prose text-muted-foreground">
      Placeholder list. ui-plan.md flags a denser, edge-to-edge visual grid as
      the eventual direction here.
    </p>

    <!-- Plain Tailwind cards rather than the shadcn `card` component: this is
         presentational, so it avoids an `add` plus its fix:shadcn-extends run. -->
    <ul class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <li
        v-for="project in projects"
        :key="project.title"
        class="rounded-lg border border-border bg-card p-5 text-card-foreground"
      >
        <h2 class="font-semibold">
          {{ project.title }}
        </h2>
        <p class="mt-2 text-sm text-muted-foreground">
          {{ project.description }}
        </p>
      </li>
    </ul>
  </section>
</template>
