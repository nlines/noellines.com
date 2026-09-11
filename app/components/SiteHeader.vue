<script setup lang="ts">
import { Menu, X } from '@lucide/vue'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
]

const route = useRoute()
const open = ref(false)
const menuButton = ref<HTMLButtonElement | null>(null)

// Routes are flat, so an exact match is right for every link — '/' would
// prefix-match every route if we used NuxtLink's default active class.
const isActive = (to: string) => route.path === to

const closeMenu = () => {
  open.value = false
  // Closing hides the panel, so focus would otherwise fall to <body> and a
  // keyboard user would have to tab from the top of the page again.
  menuButton.value?.focus()
}

const onEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape') closeMenu()
}

// Bound to the document rather than the header so Escape still works when
// focus has moved outside the menu, and only attached while it is open.
watch(open, (isOpen) => {
  if (isOpen) document.addEventListener('keydown', onEscape)
  else document.removeEventListener('keydown', onEscape)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onEscape)
})

// Navigating closes the menu without restoring focus to the trigger, since
// the user is moving to a new page rather than dismissing the menu. Note
// nothing currently moves focus on route change either, so a keyboard user
// who activates a link here lands back at <body>; worth revisiting if route
// focus management is added site-wide.
watch(() => route.path, () => {
  open.value = false
})
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
    <div class="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6">
      <NuxtLink
        to="/"
        class="rounded-md text-base font-semibold tracking-tight transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
      >
        Noel Lines
      </NuxtLink>

      <div class="flex items-center gap-1">
        <nav class="hidden items-center gap-1 sm:flex">
          <NuxtLink
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="relative rounded-md px-3 py-2 text-sm transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            :class="isActive(link.to) ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'"
          >
            {{ link.label }}
            <span
              v-if="isActive(link.to)"
              class="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-primary"
            />
          </NuxtLink>
        </nav>

        <ThemeToggle />

        <button
          ref="menuButton"
          type="button"
          class="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none sm:hidden"
          :aria-label="open ? 'Close menu' : 'Open menu'"
          :aria-expanded="open"
          aria-controls="site-nav-mobile"
          @click="open = !open"
        >
          <X v-if="open" class="size-5" />
          <Menu v-else class="size-5" />
        </button>
      </div>
    </div>

    <nav
      v-show="open"
      id="site-nav-mobile"
      class="border-t border-border sm:hidden"
    >
      <ul class="mx-auto w-full max-w-5xl px-3 py-2">
        <li v-for="link in links" :key="link.to">
          <NuxtLink
            :to="link.to"
            class="block rounded-md px-3 py-2 text-sm transition-colors"
            :class="isActive(link.to)
              ? 'bg-accent text-accent-foreground'
              : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'"
          >
            {{ link.label }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>
