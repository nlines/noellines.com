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

### Changed

- `README.md` setup instructions to reflect the project's actual toolchain (fnm for Node, Corepack-pinned pnpm) instead of generic yarn/npm/pnpm boilerplate.
- Upgraded Nuxt 3 to Nuxt 4; app code now lives under `app/`.
- Bumped `@nuxt/devtools` off a stale `^1.0.3` pin that pulled a second major version of Vite into the dependency tree.
- All four routes are now prerendered, via a seeded `nitro.prerender` crawl rather than a single route rule.

[Unreleased]: https://github.com/nlines/noellines.com/compare/main...HEAD
