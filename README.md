# Noel Lines dot Com

## Setup

This project uses [pnpm](https://pnpm.io), pinned via Corepack in [`package.json`](package.json).

If you don't have a Node.js version manager, install [fnm](https://github.com/Schniz/fnm) and hook it into your shell, then install Node:

```bash
fnm install --lts
fnm default lts-latest
```

Enable Corepack (ships with Node) so it uses the pinned pnpm version automatically:

```bash
corepack enable
```

Then install dependencies:

```bash
pnpm install
```

## Development Server

Start the development server on http://localhost:3000

```bash
pnpm run dev
```

## Production

Build the application for production:

```bash
pnpm run build
```

Locally preview production build:

```bash
pnpm run preview
```

Checkout the [deployment documentation](https://nuxt.com/docs/getting-started/deployment#presets) for more information.

## Commit Conventions

Commits in this project follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/):

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Types: `feat` (new feature), `fix` (bug fix), `build`, `chore`, `ci`, `docs`, `style`, `refactor`, `perf`, `test`, `revert`.

A breaking change is marked one of two ways:

- Append `!` after the type/scope (e.g. `feat!:`) — the commit description itself is then used as the breaking-change description, and a `BREAKING CHANGE:` footer may be omitted.
- Add a `BREAKING CHANGE:` footer (or the synonymous `BREAKING-CHANGE:`), followed by a description.

Examples:

```
feat(auth): add magic-link login

fix: correct off-by-one error in pagination

docs: update setup instructions in README
```

This also maps directly onto [Semantic Versioning](https://semver.org/) when deciding the next `version` for the [Release Process](#release-process) below: `fix` → patch, `feat` → minor, any breaking change → major.

## Release Process

This project tracks changes in [CHANGELOG.md](CHANGELOG.md), following [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Changes land under `[Unreleased]` as they're made.

To cut a release:

1. Bump `version` in `package.json` (following [Semantic Versioning](https://semver.org/)) if it hasn't already been bumped.
2. In `CHANGELOG.md`, rename `[Unreleased]` to `[<version>] - <YYYY-MM-DD>` and add a fresh empty `[Unreleased]` section above it.
3. Update the compare links at the bottom of `CHANGELOG.md`.
4. Commit, then tag the release:
   ```bash
   git tag v<version>
   git push origin v<version>
   ```
