# @rubriclab/concrete

Concrete is the Rubric Labs React design system for AI-native product surfaces, editorial research, generative UI, and educational mockups.

```sh
npm install @rubriclab/concrete
```

```tsx
import '@rubriclab/concrete/styles.css'
import { Button, primitiveRegistry } from '@rubriclab/concrete'
import { Composer } from '@rubriclab/concrete/components'
import { Button as PrimitiveButton } from '@rubriclab/concrete/primitives'
```

## Exports

- `@rubriclab/concrete`
- `@rubriclab/concrete/components`
- `@rubriclab/concrete/foundations`
- `@rubriclab/concrete/primitives`
- `@rubriclab/concrete/styles.css`
- `@rubriclab/concrete/registry`
- `@rubriclab/concrete/icons`
- `@rubriclab/concrete/schemas`

## Package shape

Concrete ships built ESM, declaration files, CSS, and SVG assets. It is intentionally ESM-only and keeps package subpaths small so application bundlers can tree-shake unused surfaces.

Pressure modes are registry metadata and composition guidance. They are not universal primitive props.
