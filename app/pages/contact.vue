<script setup lang="ts">
usePageTitle('Contact')

const contacts = [
  { label: 'Email', value: 'nlines@gmail.com', href: 'mailto:nlines@gmail.com' },
  { label: 'GitHub', value: 'github.com/nlines', href: 'https://github.com/nlines' },
  { label: 'LinkedIn', value: 'linkedin.com/in/noel-lines', href: 'https://www.linkedin.com/in/noel-lines/' },
]

// Web links open in a new tab so the visitor keeps this site; a mailto: link
// hands off to the mail app and must not open a blank tab.
const isExternal = (href: string) => href.startsWith('http')
</script>

<template>
  <section class="mx-auto w-full max-w-3xl px-6 py-16 sm:py-24">
    <h1 class="text-3xl font-bold tracking-tight sm:text-4xl">
      Contact
    </h1>
    <p class="mt-4 max-w-prose text-muted-foreground">
      You can reach me by email, or find me on LinkedIn and GitHub.
    </p>

    <ul class="mt-10 flex flex-col gap-px overflow-hidden rounded-lg border border-border">
      <li v-for="contact in contacts" :key="contact.label">
        <a
          :href="contact.href"
          :target="isExternal(contact.href) ? '_blank' : undefined"
          :rel="isExternal(contact.href) ? 'noopener noreferrer' : undefined"
          class="flex items-baseline justify-between gap-4 bg-card px-5 py-4 transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          <span class="text-sm font-medium">{{ contact.label }}</span>
          <span class="text-sm text-muted-foreground">
            {{ contact.value }}
            <span v-if="isExternal(contact.href)" class="sr-only">(opens in a new tab)</span>
          </span>
        </a>
      </li>
    </ul>
  </section>
</template>
