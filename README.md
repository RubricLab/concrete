# Concrete

Concrete is Rubric Labs' React design system for AI-native product surfaces, editorial research, generative UI, and educational explainers.

The public package is `@rubriclab/concrete`. This repository also contains the docs app that inventories foundations, primitives, components, examples, playgrounds, and render routes.

## Install

```sh
npm install @rubriclab/concrete
```

```tsx
import '@rubriclab/concrete/styles.css'
import { Badge, Button, Card } from '@rubriclab/concrete'
import { Composer } from '@rubriclab/concrete/components'
import { Button as PrimitiveButton } from '@rubriclab/concrete/primitives'
```

The root export is the ergonomic default. Subpath exports are available when an app wants explicit primitive, component, registry, icon, or schema boundaries.

## Public Inventory

- `@rubriclab/concrete` exposes the common package surface.
- `@rubriclab/concrete/components` exposes higher-order product, data, form, AI, and interaction components.
- `@rubriclab/concrete/primitives` exposes atomic UI primitives.
- `@rubriclab/concrete/foundations` exposes foundation definitions.
- `@rubriclab/concrete/registry` exposes item metadata, examples, schemas, and render definitions.
- `@rubriclab/concrete/icons` exposes the icon registry.
- `@rubriclab/concrete/schemas` exposes shared public schemas.
- `@rubriclab/concrete/styles.css` is the required public stylesheet.

Concrete ships built ESM, declaration files, CSS, and SVG assets. It is intentionally ESM-only and keeps package subpaths small so application bundlers can tree-shake unused surfaces.

Pressure modes are creative direction and registry metadata. They are not universal primitive props.

## Docs App

The docs app lives in `apps/docs` and is a Next app backed by the local workspace package.

```sh
bun install
bun run dev
```

Open `http://localhost:3000` to view the docs. The app includes the catalog, foundation pages, item detail pages, playgrounds, and render routes used for screenshots and validation.

## Monorepo Setup

This repo uses Bun workspaces:

- `packages/concrete` is the public package.
- `apps/docs` is the docs site.

Common commands:

```sh
bun install
bun run dev
bun run check
bun run build
bun run --cwd packages/concrete verify:publish
```

`bun run check` runs typecheck, lint, and tests. `bun run build` builds the package and docs app. `verify:publish` performs the package release gate: build, package tests, lint, publint, are-the-types-wrong, and npm pack dry run.

## Deployment And Release

CI runs on pull requests and pushes to `main`:

```sh
bun install --frozen-lockfile
bun run check
bun run build
bun run --cwd packages/concrete verify:publish
```

The docs app deploys as a standard Next app from `apps/docs`; the repository-level build command is `bun run build:docs`.

Pushing to `main` also runs the release workflow. The workflow compares `packages/concrete/package.json` with the published npm version, bumps to the next patch version when needed, updates `packages/concrete/CHANGELOG.md` and `bun.lock`, commits the release bump back to `main`, then publishes `packages/concrete` with npm provenance:

```sh
npm publish --provenance --access public
```

Publishing expects npm trusted publishing to be configured for `RubricLab/concrete` and the `Release Package` GitHub Actions workflow.

## Code Guide

Concrete's codebase guide lives in [`CODE.md`](./CODE.md). It is the senior-engineer manifesto for item ownership, schemas, examples, controls, CSS, docs structure, tests, and long-running refactors.

Read `CODE.md` before structural work. Long-running CSS and component standardization work should also read [`ITEM_SCOPE.md`](./ITEM_SCOPE.md) for item boundaries, [`MIGRATION_QUEUE.md`](./MIGRATION_QUEUE.md) for the autonomous chunk queue, and [`REFACTOR_RUNBOOK.md`](./REFACTOR_RUNBOOK.md) to track gates and context-compaction history.
