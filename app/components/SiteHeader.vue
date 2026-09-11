<script setup lang="ts">
import { Menu, X } from '@lucide/vue'
import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  VisuallyHidden,
} from 'reka-ui'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
]

const route = useRoute()
const open = ref(false)

// Routes are flat, so an exact match is right for every link — '/' would
// prefix-match every route if we used NuxtLink's default active class.
const isActive = (to: string) => route.path === to

watch(() => route.path, () => {
  open.value = false
})
</script>

<template>
  <!-- Name + menu button at every width, with no visible link list: the nav
       is deliberately minimal. Because the menu is the only way to navigate,
       it uses reka-ui's dialog primitives rather than a hand-rolled panel —
       they bring the focus trap, Escape handling, scroll lock and focus
       restore that a hidden-nav pattern depends on. Used directly rather than
       via shadcn's `sheet`, since reka-ui ships compiled and so sidesteps the
       compiler-sfc `extends` workaround entirely. -->
  <header class="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
    <div class="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6">
      <NuxtLink
        to="/"
        class="rounded-md text-base font-semibold tracking-tight transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
      >
        Noel Lines
      </NuxtLink>

      <DialogRoot v-model:open="open">
        <DialogTrigger
          aria-label="Open menu"
          class="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          <Menu class="size-5" />
        </DialogTrigger>

        <DialogPortal>
          <DialogOverlay
            class="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0"
          />

          <DialogContent
            class="fixed inset-0 z-50 flex flex-col bg-background data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0"
          >
            <VisuallyHidden>
              <DialogTitle>Site navigation</DialogTitle>
            </VisuallyHidden>

            <div class="mx-auto flex h-16 w-full max-w-5xl shrink-0 items-center justify-between px-6">
              <span class="text-base font-semibold tracking-tight">Noel Lines</span>

              <DialogClose
                aria-label="Close menu"
                class="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                <X class="size-5" />
              </DialogClose>
            </div>

            <nav class="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center gap-1 px-6 pb-24">
              <NuxtLink
                v-for="link in links"
                :key="link.to"
                :to="link.to"
                :aria-current="isActive(link.to) ? 'page' : undefined"
                class="relative rounded-md py-2 pl-8 text-4xl font-bold tracking-tight text-foreground transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none sm:text-6xl"
              >
                <!-- Amber marker rather than amber text: at this size the
                     accent would sit below the contrast floor for body copy,
                     and a decorative dot has no such requirement. -->
                <span
                  v-if="isActive(link.to)"
                  aria-hidden="true"
                  class="absolute top-1/2 left-0 size-2.5 -translate-y-1/2 rounded-full bg-primary"
                />
                {{ link.label }}
              </NuxtLink>
            </nav>
          </DialogContent>
        </DialogPortal>
      </DialogRoot>
    </div>
  </header>
</template>
