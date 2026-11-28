<script setup lang="ts">
import type { Project } from '~/utils/projects'

defineProps<{ project: Project }>()
</script>

<template>
  <article class="flex h-full flex-col rounded-lg border border-border bg-card p-6 text-card-foreground">
    <p class="text-sm font-semibold text-amber-700 dark:text-primary">
      {{ project.period }}
    </p>
    <h3 class="mt-3 text-xl font-semibold tracking-tight">
      {{ project.title }}
    </h3>
    <p class="mt-3 text-muted-foreground">
      {{ project.summary }}
    </p>

    <ul v-if="project.tags.length" class="mt-auto flex flex-wrap gap-2 pt-5">
      <li
        v-for="tag in project.tags"
        :key="tag"
        class="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground"
      >
        {{ tag }}
      </li>
    </ul>
  </article>
</template>
