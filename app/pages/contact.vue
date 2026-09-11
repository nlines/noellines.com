<script setup lang="ts">
useHead({ title: 'Contact' })

// Placeholder targets — swap for real handles before this ships.
const contacts = [
  { label: 'Email', value: 'hello@noellines.com', href: 'mailto:hello@noellines.com' },
  { label: 'GitHub', value: 'github.com/nlines', href: 'https://github.com/nlines' },
]
</script>

<template>
  <section class="mx-auto w-full max-w-3xl px-6 py-16 sm:py-24">
    <h1 class="text-3xl font-bold tracking-tight sm:text-4xl">
      Contact
    </h1>
    <p class="mt-4 max-w-prose text-muted-foreground">
      Placeholder links. Best ways to get in touch will live here.
    </p>

    <ul class="mt-10 flex flex-col gap-px overflow-hidden rounded-lg border border-border">
      <li v-for="contact in contacts" :key="contact.label">
        <a
          :href="contact.href"
          class="flex items-baseline justify-between gap-4 bg-card px-5 py-4 transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          <span class="text-sm font-medium">{{ contact.label }}</span>
          <span class="text-sm text-muted-foreground">{{ contact.value }}</span>
        </a>
      </li>
    </ul>
  </section>
</template>
