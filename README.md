# Concrete

Concrete is the Rubric Labs design system for AI-native product surfaces, editorial research, generative UI, and educational mockups.

This repo is a Bun monorepo:

- `packages/concrete` - public React package `@rubriclab/concrete`
- `apps/docs` - Next app for foundations, primitives, components, and render routes
- `concepts` - original concept sources kept as reference material

## Commands

```sh
bun install
bun run dev
bun run check
bun run build
```

## Public Package

```tsx
import '@rubriclab/concrete/styles.css'
import { Button, Card, Badge } from '@rubriclab/concrete'
import { Composer } from '@rubriclab/concrete/components'
import { Button as PrimitiveButton } from '@rubriclab/concrete/primitives'
```

The root export is the ergonomic default. Subpath exports are available when an app wants explicit primitive, component, registry, icon, or schema boundaries.

Pressure modes are creative direction and registry metadata. They are not universal primitive props.
