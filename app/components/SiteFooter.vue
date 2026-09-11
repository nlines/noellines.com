<script setup lang="ts">
// Evaluated at build time for prerendered routes, which is fine — the site
// is rebuilt on every deploy.
const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-border">
    <div class="mx-auto flex w-full max-w-5xl flex-col gap-2 px-6 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
      <p>&copy; {{ year }} Noel Lines</p>
      <p>Built with Nuxt and Tailwind CSS.</p>
    </div>
  </footer>
</template>
