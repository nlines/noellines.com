<template>
  <div class="flex min-h-svh flex-col bg-background text-foreground">
    <SiteHeader />

    <!-- No width constraint here: pages own their own container, so a page
         can go full-bleed (e.g. the planned portrait hero) without fighting
         the layout. -->
    <main class="flex-1">
      <slot />
    </main>

    <SiteFooter />
  </div>
</template>
