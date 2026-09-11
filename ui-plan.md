# UI Plan

Working notes for this site's theme and design decisions. Living document — update as decisions get made, not just proposed.

## Framework

- Current: Nuxt 4 (Vue) — upgraded from the 3.8.2 the Vercel template shipped with. App code lives under `app/`.
- Component library: [shadcn-nuxt](https://nuxt.com/modules/shadcn) (wraps shadcn-vue). Component source is copied into `app/components/ui`, not installed as an opaque dependency — full ownership/customization of each component.
- CSS approach: Tailwind CSS (required by shadcn-nuxt), styled via shadcn's CSS-variable theming convention (`--background`, `--primary`, `--radius`, etc.)
- Explicitly *not* using Nuxt UI alongside it — both build on Reka UI + Tailwind and would fight over Tailwind config ownership and CSS variable names (shadcn and Nuxt UI v3 use overlapping token names), plus duplicate primitives (two different `Button`/`Dialog`/etc). Picking shadcn-nuxt only keeps one theming system and avoids that conflict.

## Navigation

- Pages: **Home, About/Bio, Projects/Portfolio, Contact/Links.**
- Nav pattern: **minimal header — name + menu button at every width**, with no visible link list even on desktop, following matthewencina.com. Opens a full-screen overlay menu listing the four routes in large type. Supersedes the earlier "simple top nav" decision; see the Decisions Log for why.

## Theme

- Base color: **Stone** (shadcn-vue's warmer, earthy neutral) — drives grays/backgrounds/borders across all components.
- Light/dark mode: **both, with a toggle.** Respects system preference by default, user can override. Needs a color-mode strategy at implementation time (e.g. `@nuxtjs/color-mode`) paired with shadcn's light/dark CSS variable sets.
- Typography: **Inter** (webfont, loaded via Google Fonts) — `shadcn-vue init` defaulted to this rather than prompting. Originally planned as system font stack; keeping Inter for now since it's already wired in, may revisit in a later design pass.
- Accent/brand color: **Amber** (warm accent, sets `--primary`/`--accent`/`--ring`). Pairs with Stone's warm undertone; used for links, buttons, focus states. Implemented in [app/assets/css/tailwind.css](app/assets/css/tailwind.css) using real Tailwind v4 amber OKLCH values (amber-600/amber-950 in light mode, amber-400/amber-950 in dark mode for primary; amber-100/amber-900 and amber-900/amber-100 for accent) — not part of shadcn's `init` prompts, set manually post-init.
- Border radius / component shape: **shadcn default, `--radius: 0.625rem`.** Balanced, moderate rounding; no reason found to deviate from the out-of-the-box value.

## Implementation Plan

Ordered build-out. Each phase flags which shadcn components it actually needs — see [Cost of the shadcn workaround](#cost-of-the-shadcn-workaround) for why that count matters.

### Phase 1 — Routing skeleton ✅ done

Convert the single-file `app/app.vue` into a real page structure.

- `app/app.vue` → `<NuxtLayout><NuxtPage /></NuxtLayout>`
- `app/layouts/default.vue` — header + `<slot />` + footer
- `app/pages/index.vue`, `about.vue`, `projects.vue`, `contact.vue`
- Drop the `routeRules` prerender-only-`/` rule in [nuxt.config.ts](nuxt.config.ts) in favour of prerendering all four routes

**shadcn components needed: none.** Pure Nuxt routing.

**Gotcha found while building:** `routeRules: { '/**': { prerender: true } }` does *not* work. It marks routes as prerenderable but never seeds the prerender queue, so the build silently emits zero HTML files. Use `nitro.prerender` with an explicit seed route plus `crawlLinks` instead.

### Phase 2 — Top nav ✅ done

- `app/components/SiteHeader.vue` — site name + four `<NuxtLink>`s, `active-class` for current-route styling
- Mobile: below `sm`, either a plain CSS disclosure or shadcn `sheet` for a slide-out drawer

**shadcn components needed: 0–1** (`sheet`, only if we want a drawer over a simple stacked menu). A four-link nav does not need `navigation-menu` — that component exists for multi-level dropdown menus.

**Resolved to the minimal header instead** — name + menu button at every width, no visible link list. Built with **zero** shadcn components.

The menu uses reka-ui's dialog primitives (`DialogRoot`/`DialogPortal`/`DialogOverlay`/`DialogContent`) directly rather than shadcn's `sheet`. Two reasons:

1. Once the nav is hidden behind a button at *every* width, it is the only way through the site, so it needs real modal behaviour — focus trap, Escape, scroll lock, focus restore. reka-ui provides all four; hand-rolling a focus trap is the easy thing to get subtly wrong.
2. **reka-ui ships compiled**, so its own components never pass through `@vue/compiler-sfc` in this project. Consuming them directly sidesteps the `extends` workaround and its `as`/`asChild` fallout entirely — no `add`, no `fix:shadcn-extends`, no warnings.

That second point generalises: **when a shadcn component would only be a thin styled wrapper over a reka-ui primitive, using the primitive directly avoids the workaround altogether.** Worth reaching for before the next `shadcn-vue add`.

Note `active-class` was not usable as written: routes are flat, so NuxtLink's prefix matching marks `/` active on every page. An exact `route.path === to` test is used instead, paired with `aria-current="page"`.

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

### Second-order cost: the ignored props become undeclared

Found while building Phase 1. The workaround is not purely cosmetic, and this was not accounted for when the stay-on-shadcn decision was made.

Because `/* @vue-ignore */` tells the compiler to skip `extends PrimitiveProps`, the props from that base type — `as` and `asChild` — are never declared as runtime props. `Button.vue`'s template still references them, so **every render logs two Vue warnings**:

```
[Vue warn]: Property "as" was accessed during render but is not defined on instance.  at <Button as-child="">
[Vue warn]: Property "asChild" was accessed during render but is not defined on instance.
```

`<Button as-child>` still renders the correct markup, but only incidentally: the attributes fall through to `Primitive`, which declares those props itself. `withDefaults(..., { as: "button" })` is silently dead, since `as` is not a prop to default.

The warnings are dev-only (stripped from production builds), so this is noise rather than breakage. Practical consequences:

- Prefer `buttonVariants()` on the element directly over `<Button as-child>`. This is shadcn's documented pattern for a link styled as a button anyway, and it produces identical markup with no warnings. Used on the Home CTAs.
- Expect the same for every future component whose props extend a reka-ui base type, which is most interactive ones.
- If this becomes noisy enough to matter, the fix is to declare `as`/`asChild` explicitly in the generated component instead of inheriting them — at which point `fix:shadcn-extends` would need to stop patching that file.

## Decisions Log

<!-- As choices are made, record them here with a short rationale. -->

- **Component library: shadcn-nuxt (not Nuxt UI).** Chosen for code ownership (components copied into repo, not black-boxed in `node_modules`) and to avoid running two overlapping Tailwind/Reka UI-based systems side by side.
- **Base color: Stone.**
- **Light/dark mode: both, with a toggle.** Standard expectation for a modern personal site; shadcn's theming is built around CSS variables per mode.
- **Typography: Inter (webfont), not system stack as originally planned.** `shadcn-vue init` defaulted to Inter without prompting; kept it rather than reverting, revisit later if desired.
- **Accent/brand color: Amber.** Warm accent to pair with Stone; sets `--primary`/`--accent`/`--ring` manually post-init (not a CLI prompt), using real Tailwind v4 amber OKLCH values.
- **Border radius: shadcn default (`0.625rem`).** No case found for deviating from the default.
- **Pages: Home, About/Bio, Projects/Portfolio, Contact/Links.**
- **Nav pattern: minimal header (name + menu button at every width), superseding the earlier four-link top nav.** Chosen deliberately for the restraint, with the discoverability cost understood: the four-link version was built first and was the recommendation, on the grounds that the hero drama does not actually depend on hiding the nav — matthewencina.com's header is a solid bar *above* its hero, not a transparent overlay, so a visible link list and a full-bleed portrait hero can coexist. Preference for the minimal look won on its own merits rather than as a means to the hero.
- **Hidden-nav components come from reka-ui directly, not shadcn.** reka-ui ships compiled, so its primitives dodge the `@vue/compiler-sfc` `extends` workaround completely. Prefer a primitive over a `shadcn-vue add` wherever the shadcn component is just styling over one.
- **Staying on shadcn-nuxt despite the `@vue/compiler-sfc` extends friction.** Re-evaluated after hitting it: upstream treats `/* @vue-ignore */` as the prescribed remedy rather than a bug to fix (Vue core emits it in the error itself; related `vuejs/core` issues have sat open since 2023), so it won't resolve on its own. Kept anyway because the cost is bounded — 4–6 remaining `add` calls, each needing one already-automated command. Nuxt UI would sidestep it entirely (ships compiled components, so nothing in-repo compiles an `extends` clause) but forfeits the code-ownership property that motivated the original choice.
