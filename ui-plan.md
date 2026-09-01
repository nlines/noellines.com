# UI Plan

Working notes for this site's theme and design decisions. Living document — update as decisions get made, not just proposed.

## Framework

- Current: Nuxt 4 (Vue) — upgraded from the 3.8.2 the Vercel template shipped with. App code lives under `app/`.
- Component library: [shadcn-nuxt](https://nuxt.com/modules/shadcn) (wraps shadcn-vue). Component source is copied into `app/components/ui`, not installed as an opaque dependency — full ownership/customization of each component.
- CSS approach: Tailwind CSS (required by shadcn-nuxt), styled via shadcn's CSS-variable theming convention (`--background`, `--primary`, `--radius`, etc.)
- Explicitly *not* using Nuxt UI alongside it — both build on Reka UI + Tailwind and would fight over Tailwind config ownership and CSS variable names (shadcn and Nuxt UI v3 use overlapping token names), plus duplicate primitives (two different `Button`/`Dialog`/etc). Picking shadcn-nuxt only keeps one theming system and avoids that conflict.

## Navigation

- Pages: **Home, About/Bio, Projects/Portfolio, Contact/Links.**
- Nav pattern: **simple top nav** — a horizontal header/nav bar linking to each section. Standard pattern that scales fine for this page count (4).

## Theme

- Base color: **Stone** (shadcn-vue's warmer, earthy neutral) — drives grays/backgrounds/borders across all components.
- Light/dark mode: **both, with a toggle.** Respects system preference by default, user can override. Needs a color-mode strategy at implementation time (e.g. `@nuxtjs/color-mode`) paired with shadcn's light/dark CSS variable sets.
- Typography: **Inter** (webfont, loaded via Google Fonts) — `shadcn-vue init` defaulted to this rather than prompting. Originally planned as system font stack; keeping Inter for now since it's already wired in, may revisit in a later design pass.
- Accent/brand color: **Amber** (warm accent, sets `--primary`/`--accent`/`--ring`). Pairs with Stone's warm undertone; used for links, buttons, focus states. Implemented in [app/assets/css/tailwind.css](app/assets/css/tailwind.css) using real Tailwind v4 amber OKLCH values (amber-600/amber-950 in light mode, amber-400/amber-950 in dark mode for primary; amber-100/amber-900 and amber-900/amber-100 for accent) — not part of shadcn's `init` prompts, set manually post-init.
- Border radius / component shape: **shadcn default, `--radius: 0.625rem`.** Balanced, moderate rounding; no reason found to deviate from the out-of-the-box value.

## Implementation Plan

Ordered build-out. Each phase flags which shadcn components it actually needs — see [Cost of the shadcn workaround](#cost-of-the-shadcn-workaround) for why that count matters.

### Phase 1 — Routing skeleton

Convert the single-file `app/app.vue` into a real page structure.

- `app/app.vue` → `<NuxtLayout><NuxtPage /></NuxtLayout>`
- `app/layouts/default.vue` — header + `<slot />` + footer
- `app/pages/index.vue`, `about.vue`, `projects.vue`, `contact.vue`
- Drop the `routeRules` prerender-only-`/` rule in [nuxt.config.ts](nuxt.config.ts) in favour of prerendering all four routes

**shadcn components needed: none.** Pure Nuxt routing.

### Phase 2 — Top nav

- `app/components/SiteHeader.vue` — site name + four `<NuxtLink>`s, `active-class` for current-route styling
- Mobile: below `sm`, either a plain CSS disclosure or shadcn `sheet` for a slide-out drawer

**shadcn components needed: 0–1** (`sheet`, only if we want a drawer over a simple stacked menu). A four-link nav does not need `navigation-menu` — that component exists for multi-level dropdown menus.

### Phase 3 — Dark/light toggle

Implements the light/dark decision recorded under [Theme](#theme).

- Add [`@nuxtjs/color-mode`](https://github.com/nuxt-modules/color-mode) (v4.0.1)
- **Gotcha:** the module defaults to `classSuffix: '-mode'`, which puts `dark-mode` on `<html>`. Our Tailwind file declares `@custom-variant dark (&:is(.dark *))`, which needs a bare `.dark`. Set `colorMode: { classSuffix: '' }` in [nuxt.config.ts](nuxt.config.ts) or no dark styles will apply.
- `app/components/ThemeToggle.vue` — `Button` for a simple light/dark flip, or `dropdown-menu` for tri-state light/dark/system

**shadcn components needed: 0–1.** `button` is already added; add `dropdown-menu` only if we want the system option exposed.

### Phase 4 — Page content

- Home: intro/hero
- About: bio prose
- Projects: list of project entries — shadcn `card`, or plain Tailwind divs
- Contact: links out (email, GitHub, etc.) — plain anchors, optionally `badge`

**shadcn components needed: 0–2** (`card`, `badge`), both optional and easily hand-rolled.

### Cost of the shadcn workaround

Every `shadcn-vue add` needs a follow-up `pnpm run fix:shadcn-extends` (see [README.md](README.md) for the full explanation — it's an architectural limitation of `@vue/compiler-sfc`, not a bug awaiting a fix upstream).

Totalling the phases above: **4–6 more `add` calls over the life of this site**, essentially all front-loaded into the initial build. The friction scales with the number of shadcn components, and a personal site needs very few — most of the work here is layout, typography, and Tailwind utilities, which are unaffected. That count is the number to weigh against any future proposal to re-platform.

## Decisions Log

<!-- As choices are made, record them here with a short rationale. -->

- **Component library: shadcn-nuxt (not Nuxt UI).** Chosen for code ownership (components copied into repo, not black-boxed in `node_modules`) and to avoid running two overlapping Tailwind/Reka UI-based systems side by side.
- **Base color: Stone.**
- **Light/dark mode: both, with a toggle.** Standard expectation for a modern personal site; shadcn's theming is built around CSS variables per mode.
- **Typography: Inter (webfont), not system stack as originally planned.** `shadcn-vue init` defaulted to Inter without prompting; kept it rather than reverting, revisit later if desired.
- **Accent/brand color: Amber.** Warm accent to pair with Stone; sets `--primary`/`--accent`/`--ring` manually post-init (not a CLI prompt), using real Tailwind v4 amber OKLCH values.
- **Border radius: shadcn default (`0.625rem`).** No case found for deviating from the default.
- **Pages: Home, About/Bio, Projects/Portfolio, Contact/Links.** Nav pattern: simple top nav.
- **Staying on shadcn-nuxt despite the `@vue/compiler-sfc` extends friction.** Re-evaluated after hitting it: upstream treats `/* @vue-ignore */` as the prescribed remedy rather than a bug to fix (Vue core emits it in the error itself; related `vuejs/core` issues have sat open since 2023), so it won't resolve on its own. Kept anyway because the cost is bounded — 4–6 remaining `add` calls, each needing one already-automated command. Nuxt UI would sidestep it entirely (ships compiled components, so nothing in-repo compiles an `extends` clause) but forfeits the code-ownership property that motivated the original choice.
