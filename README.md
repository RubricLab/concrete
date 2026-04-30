# Concrete

Concrete is the Rubric Labs design system for AI-native product surfaces, editorial research, generative UI, and educational mockups.

This repo is a Bun monorepo:

- `packages/concrete` - public React package `@rubriclab/concrete`
- `apps/docs` - Next app for foundations, primitives, components, and render routes

## Commands

```sh
bun install
bun run dev
bun run check
bun run build
```

## Codebase Policies

Concrete's architecture rules live in [`CODEBASE_POLICIES.md`](./CODEBASE_POLICIES.md). Read that file before structural work. Long-running refactors should use [`REFACTOR_RUNBOOK.md`](./REFACTOR_RUNBOOK.md) to track the active chunk, gates, and next actions across context compaction.

## Public Package

```sh
npm install @rubriclab/concrete
```

```tsx
import '@rubriclab/concrete/styles.css'
import { Button, Card, Badge } from '@rubriclab/concrete'
import { Composer } from '@rubriclab/concrete/components'
import { Button as PrimitiveButton } from '@rubriclab/concrete/primitives'
```

The root export is the ergonomic default. Subpath exports are available when an app wants explicit primitive, component, registry, icon, or schema boundaries.

Concrete ships built ESM, declaration files, CSS, and SVG assets. It is intentionally ESM-only and keeps package subpaths small so application bundlers can tree-shake unused surfaces.

Pressure modes are creative direction and registry metadata. They are not universal primitive props.

## CI And Release Flow

CI runs on pull requests and pushes to `main`:

```sh
bun install --frozen-lockfile
bun run check
bun run build
bun run --cwd packages/concrete verify:publish
```

Pushing to `main` also runs the release workflow. The workflow compares `packages/concrete/package.json` with the published npm version, bumps to the next patch version when needed, updates `packages/concrete/CHANGELOG.md` and `bun.lock`, commits the release bump back to `main`, then dispatches the publish job.

The publish job verifies the package again and publishes `packages/concrete` with npm provenance:

```sh
npm publish --provenance --access public
```

Publishing expects npm trusted publishing to be configured for `RubricLab/concrete` and the `Release Package` GitHub Actions workflow.
