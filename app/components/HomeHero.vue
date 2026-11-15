<script setup lang="ts">
import { buttonVariants } from '@/components/ui/button'
</script>

<template>
  <!-- The hero is always dark, whichever mode the rest of the site is in.
       Putting `.dark` on the section re-resolves every colour token inside it
       to the dark palette (the tokens are CSS variables defined on `.dark`),
       and `dark:` utilities match because they are keyed off an ancestor
       `.dark`. This is a scaffold-time assumption: the portrait is a dark,
       warm-lit photo, so forcing the hero dark avoids it fading into a white
       page in light mode. Revisit once light mode has a considered treatment. -->
  <section
    class="dark relative isolate flex min-h-[calc(100svh-4rem)] flex-col justify-end overflow-hidden bg-background text-foreground"
  >
    <!-- Portrait. Not a cutout: the photo's own background is already near
         the page background, so it is faded into it with gradients rather
         than masked. Right-anchored on desktop so the headline can overlap
         the figure's arm and shoulder without covering the face. -->
    <div class="absolute inset-0 -z-10">
      <!-- Only the <img> moves with scroll. The gradients below stay put, so
           the bottom fade always sits at the section edge; if they travelled
           with the photo, the section's overflow clip would cut the fade
           short and leave a hard edge. -->
      <img
        src="/images/hero-portrait-1200.jpg"
        srcset="
          /images/hero-portrait-800.jpg   800w,
          /images/hero-portrait-1200.jpg 1200w,
          /images/hero-portrait-2000.jpg 2000w
        "
        sizes="(min-width: 768px) 70vw, 100vw"
        width="2000"
        height="1333"
        alt="Portrait of Noel Lines smiling, one arm stretched out to the side, in a dimly lit workshop with warm orange lighting."
        fetchpriority="high"
        decoding="async"
        class="hero-photo absolute top-0 right-0 h-[80%] w-full object-cover object-[50%_18%] max-md:[mask-image:linear-gradient(to_bottom,black_55%,transparent)] md:h-full md:w-[70%] md:object-[50%_20%] md:[mask-image:linear-gradient(to_right,transparent,black_55%)]"
      >

      <!-- Below `md` the photo stops short of the section bottom, so a section
           level gradient cannot hide its edge; it is masked to transparent
           instead (see the img classes). From `md` up it runs the full height
           and the gradients below do the work. The photo also covers only the
           right 70%, so a section-wide gradient can't hide its left edge
           either: from `md` up the img is masked to fade in from that edge.

           The left gradient keeps the headline legible, and the bottom one
           hands the hero off cleanly to the next section. -->
      <div class="absolute inset-0 bg-gradient-to-r from-background via-background/55 via-35% to-transparent to-70% max-md:hidden" />
      <div class="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-background via-background/80 to-transparent" />

      <!-- A solid strip over the last few pixels. The photo is transformed on
           scroll, and where a transformed layer meets the section's overflow
           clip the browser can leave a one-pixel line of it showing through
           even under a fully opaque gradient stop. -->
      <div class="absolute inset-x-0 bottom-0 h-[3px] bg-background" />
    </div>

    <div class="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 pt-[52svh] pb-12 md:pt-24 md:pb-20">
      <p class="text-sm font-medium tracking-widest text-primary uppercase">
        Hello, I'm Noel Lines
      </p>

      <!-- Sized to overlap the portrait on desktop; each role breaks onto its
           own line the way the reference site stacks its roles. -->
      <h1 class="hero-headline text-[clamp(3.25rem,11.5vw,9.5rem)] leading-[1] font-bold tracking-tighter text-balance">
        <span class="block">Engineer</span>
        <span class="block">Builder</span>
        <span class="block">Technologist</span>
      </h1>

      <div class="flex flex-wrap gap-3 pt-2">
        <NuxtLink to="/projects" :class="buttonVariants()">
          View projects
        </NuxtLink>
        <NuxtLink to="/contact" :class="buttonVariants({ variant: 'outline' })">
          Get in touch
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Scroll motion is pure CSS and a progressive enhancement: with no support, or
   with reduced motion requested, none of this applies and the hero is simply
   static. Nothing is hidden or faded to zero, so content never depends on it.
   Browsers without scroll-driven animations (Firefox before 159) skip it. */
@media (prefers-reduced-motion: no-preference) {
  @supports (animation-timeline: scroll()) {
    .hero-photo {
      animation: hero-photo-drift linear both;
      /* shorthand resets animation-timeline, so it has to come after */
      animation-timeline: scroll(root);
      animation-range: 0 100svh;
    }

    .hero-headline {
      animation: hero-headline-lift linear both;
      animation-timeline: scroll(root);
      animation-range: 0 100svh;
    }
  }
}

/* The photo drifts down and eases in slowly while the headline lifts away
   faster, so the overlap shifts as you scroll. */
@keyframes hero-photo-drift {
  to {
    transform: translateY(9%) scale(1.07);
  }
}

@keyframes hero-headline-lift {
  to {
    transform: translateY(-16%);
  }
}
</style>
