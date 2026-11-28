<script setup lang="ts">
usePageTitle('Projects')
// `projects` comes from app/utils/projects.ts.
</script>

<template>
  <section class="mx-auto w-full max-w-5xl px-6 py-16 sm:py-24">
    <h1 class="text-3xl font-bold tracking-tight sm:text-4xl">
      Projects
    </h1>
    <p class="mt-4 max-w-prose text-muted-foreground">
      A selection of the applications and services I've built.
    </p>

    <ul class="mt-10 grid gap-4 sm:grid-cols-2">
      <li v-for="project in projects" :key="project.title">
        <ProjectCard :project="project" />
      </li>
    </ul>
  </section>
</template>
