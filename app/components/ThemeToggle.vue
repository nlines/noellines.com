<script setup lang="ts">
import { Monitor, Moon, Sun } from '@lucide/vue'
import {
  DropdownMenuContent,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuRoot,
  DropdownMenuTrigger,
} from 'reka-ui'

const colorMode = useColorMode()

// `preference` is what the user picked and what the radio group binds to.
// `value` is what that resolves to once 'system' is read — deliberately not
// used for rendering, since it differs between server and client.
const options = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'System', icon: Monitor },
]
</script>

<template>
  <DropdownMenuRoot>
    <DropdownMenuTrigger
      aria-label="Change theme"
      class="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
    >
      <!-- Both icons are rendered and CSS picks one from the `.dark` class
           the colour-mode module puts on <html> before paint. That keeps the
           trigger identical on server and client, so there is no hydration
           mismatch to work around and no need to defer behind ClientOnly. -->
      <Sun class="size-5 dark:hidden" />
      <Moon class="hidden size-5 dark:block" />
    </DropdownMenuTrigger>

    <DropdownMenuPortal>
      <DropdownMenuContent
        align="end"
        :side-offset="8"
        class="z-50 min-w-36 rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md"
      >
        <DropdownMenuRadioGroup v-model="colorMode.preference">
          <DropdownMenuRadioItem
            v-for="option in options"
            :key="option.value"
            :value="option.value"
            class="flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none select-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground"
          >
            <component :is="option.icon" class="size-4" />
            {{ option.label }}

            <!-- Amber marker rather than amber text, matching the nav: the
                 accent sits below the contrast floor for label-sized copy,
                 but a decorative dot carries no such requirement. The radio
                 item already exposes its checked state to assistive tech. -->
            <span
              v-if="colorMode.preference === option.value"
              aria-hidden="true"
              class="ml-auto size-1.5 rounded-full bg-primary"
            />
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenuRoot>
</template>
