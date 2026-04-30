# Concrete Codebase Policies

Concrete is a schema-first component library and docs app. The codebase should feel deterministic: when a file is opened, that file should own one clear concern and there should be no second place where the same concern is secretly implemented.

## Core Rules

- Zod/v4 owns every serializable boundary.
- TypeScript types stay explicit and descriptive. Avoid `any`.
- Public package exports and subpath exports stay stable unless a release intentionally breaks them.
- LOC is a soft signal, not an architecture rule. A large file is acceptable when it owns one complete concern. Splitting one concern only to satisfy a line budget is worse than leaving the file whole.
- Every helper must earn its location. A helper used by one item usually belongs in that item. A helper used by many items must be a general utility, a factory, or a promoted primitive.

## Package Layout

```txt
packages/concrete/src/
  components/   public component item folders and the component barrel
  factories/    createControls, createExamples, and createItems only
  foundations/  foundation item folders and foundation exports
  icons/        public icon subpath export
  primitives/   public primitive item folders plus private internal primitive implementations
  registry/     public registry projection over item definitions
  schemas/      public schema subpath export
  utilities/    shared pure algorithms and temporary shared render engines
  styles/       public stylesheet inputs and selector manifest
```

`icons/` and `schemas/` remain top-level because they are stable package subpath exports. They may become internally backed by foundations or registry later, but the public surface must not churn casually.

## Item Ownership

Foundations, primitives, and components live in item folders. Each item owns:

- `component.tsx` for the exported JSX implementation
- `schema.ts` for its serializable input schema and public input/output types
- `examples.tsx` for typed example recipes
- `meta.ts` for registry metadata
- `index.tsx` for the item definition and public exports
- `styles.css` as the item style ownership marker

Item files can be larger when they own the full concern. Do not split component controller state, render wiring, or local subparts into extra files just to reduce LOC.

## Components

Component implementations should assemble primitives, schemas, and utilities. They should not import sibling components as an architectural default.

Component `component.tsx` files must not import from sibling component folders. Shared JSX that is reused by multiple components but is not ready to become a public registry primitive belongs in `primitives/internal/<name>` with only `component.tsx` and `index.ts`.

No new component-to-component imports should be introduced. Existing example or definition transition exceptions must be paid down by either:

- promoting the reused surface to a primitive,
- folding single-use JSX back into the owning component,
- or deleting the composition if it is only docs/example convenience.

Current known transition exceptions are mostly example and render-input composition such as command/search demos and form examples. These are not patterns to copy.

Root-level files in `components/` are banned except for the public barrel. Shared engines belong in `utilities/`; shared JSX should eventually become primitives or move back into the owning component.

## Factories And Utilities

`factories/` is intentionally narrow:

- `createControls.ts`
- `createExamples.tsx`
- `createItems.ts`
- `index.ts`

If a file does not create item definitions, controls, or examples, it does not belong in `factories/`.

`utilities/` is for shared pure algorithms, schema input helpers, render-route helpers, and temporary shared engines. Utilities must stay general. If a utility becomes item-specific, move it into the item. If a utility renders reusable UI, promote it to a primitive or fold it into the component that owns the behavior.

## Registry And Schemas

The registry projects item definitions into public catalog data. It should not own component behavior, docs examples, or visual decisions.

Schemas stay public because `@rubriclab/concrete/schemas` is a package boundary. Item schemas may re-export central schemas when that preserves compatibility, but new serializable item input should be owned beside the item whenever possible.

## Docs App

App Router route files own page-level UX. Do not create a route whose only job is `return <SomePage />`.

Docs files under `apps/docs/src` are allowed for reusable docs-only components, data, and utilities. Each docs component file should have a single runtime export. Current raw HTML and class-heavy docs pages are accepted transition debt; future UX work should rebuild them from Concrete primitives rather than expanding bespoke markup.

Docs must import only public `@rubriclab/concrete` surfaces.

## Styles

`@rubriclab/concrete/styles.css` is the required public stylesheet. Active selectors currently live in shared CSS files for auditability; item `styles.css` files mark ownership.

Do not add CSS modules. Do not add raw design values casually. Style debt should be left as `DX-TODO(...)` comments until a visual QA pass can move selectors into item-owned style files safely.

## Long-Run Workflow

For large refactors:

1. Read `CODEBASE_POLICIES.md` and `REFACTOR_RUNBOOK.md` before editing.
2. Pick one concrete chunk.
3. Track the chunk in the todo tool.
4. Implement only that chunk.
5. Run the relevant gates.
6. Update `REFACTOR_RUNBOOK.md` with the result and the next chunk.
7. Repeat until the batch is complete.

The runbook is a continuity mechanism for context compaction. The policies file is the durable architecture contract.
