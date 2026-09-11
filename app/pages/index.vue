<script setup lang="ts">
import { buttonVariants } from '@/components/ui/button'

useHead({ title: 'Home' })
</script>

<template>
  <!-- Placeholder hero. The design direction captured in ui-plan.md is a
       full-bleed portrait with an oversized headline overlapping it; this is
       deliberately plain until that treatment and the photography exist. -->
  <section class="mx-auto flex w-full max-w-5xl flex-col items-start gap-6 px-6 py-24 sm:py-32">
    <p class="text-sm font-medium tracking-widest text-primary uppercase">
      Placeholder
    </p>

    <h1 class="max-w-3xl text-4xl font-bold tracking-tight text-balance sm:text-6xl">
      I'm Noel Lines.
    </h1>

    <p class="max-w-prose text-lg text-muted-foreground">
      Temporary intro copy. This is where a short positioning statement will
      go once the hero design lands.
    </p>

    <!-- buttonVariants() rather than <Button as-child>: the /* @vue-ignore */
         workaround leaves `as`/`asChild` undeclared as props, so as-child
         renders correctly but logs a Vue warning on every render. Styling the
         link directly is shadcn's documented pattern for this anyway. -->
    <div class="flex flex-wrap gap-3 pt-2">
      <NuxtLink to="/projects" :class="buttonVariants()">
        View projects
      </NuxtLink>
      <NuxtLink to="/contact" :class="buttonVariants({ variant: 'outline' })">
        Get in touch
      </NuxtLink>
    </div>
  </section>
</template>
