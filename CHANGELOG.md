# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- `version` field in `package.json`, starting at `0.1.0`.
- `packageManager` field in `package.json`, pinning pnpm via Corepack.
- This changelog.
- Tailwind CSS v4, wired in via `@tailwindcss/vite`.
- [shadcn-nuxt](https://nuxt.com/modules/shadcn) component library, initialised with the Stone base colour and an Amber accent; `Button` added as the first component.
- `fix:shadcn-extends` script, working around a `@vue/compiler-sfc` limitation that stops generated shadcn components from compiling.
- `ui-plan.md`, recording UI framework, theme and navigation decisions alongside a phased build-out plan.
- Home, About, Projects and Contact pages, with placeholder content and a shared default layout.
- Site header with a sticky four-link nav that collapses to a hamburger menu on small screens, plus a site footer.
- Per-page titles via a `%s · Noel Lines` template.
- Escape now closes the small-screen nav menu, returning focus to the menu button.
- Tri-state theme toggle (light / dark / system) in the site header, backed by [`@nuxtjs/color-mode`](https://github.com/nuxt-modules/color-mode). The chosen preference persists, and the theme is applied before first paint so there is no flash.
- Home hero: a full-bleed portrait with a large "Engineer / Builder / Technologist" headline overlapping it, always dark. The portrait ships in three responsive sizes, and its scroll motion is CSS only (scroll-driven animations), skipped under `prefers-reduced-motion` and in browsers that lack support.
- Site icon: a black square with "NL" in the site's amber accent, as an SVG favicon with `.ico` and Apple touch icon fallbacks, replacing the default Nuxt icon.
- Home page tab title reads "Noel Lines - Engineer, Builder, Technologist"; the other pages keep the `%s · Noel Lines` template.
- Open Graph and Twitter card tags with a 1200×627 portrait card, so shared links (LinkedIn, Slack, X) unfurl with an image, title and description.
- Per-page titles in link previews: About, Projects and Contact now share as "About · Noel Lines" and so on, matching their browser tabs, through a `usePageTitle` composable.
- About page: first real content, a short bio, a five-step career timeline, a core-tools list and a contact link, replacing the placeholder copy.
- Contact page: real email, GitHub and LinkedIn links in place of the placeholders. Web links open in a new tab, with a screen-reader note, while the email link does not.
- Home: a "What I do" section of three cards and a closing "Get in touch" band with email and LinkedIn buttons, replacing the placeholder section.

### Changed

- `README.md` setup instructions to reflect the project's actual toolchain (fnm for Node, Corepack-pinned pnpm) instead of generic yarn/npm/pnpm boilerplate.
- Upgraded Nuxt 3 to Nuxt 4; app code now lives under `app/`.
- Bumped `@nuxt/devtools` off a stale `^1.0.3` pin that pulled a second major version of Vite into the dependency tree.
- All four routes are now prerendered, via a seeded `nitro.prerender` crawl rather than a single route rule.
- Dark mode uses the same amber accent as light mode. It previously used a lighter shade from further up Tailwind's amber ramp, which also reads noticeably more yellow, since the ramp shifts hue as it lightens.
- About page: the years-of-experience figure is calculated from a start year instead of being typed in, so it rises each January once the site is rebuilt. The last career-path step is now dated 2026.

### Fixed

- Home hero portrait no longer crops out the face at the narrow end of the tablet breakpoint (about 768px wide); its horizontal position is now computed from the hero's size instead of being fixed.

[Unreleased]: https://github.com/nlines/noellines.com/compare/main...HEAD
