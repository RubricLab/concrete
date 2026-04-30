# Refactor Runbook

This file is a continuity tool for long runs with context compaction. It is not the architecture source of truth. Read `CODEBASE_POLICIES.md` first.

## Start Protocol

Every meaningful implementation session starts here:

1. Read `CODEBASE_POLICIES.md`.
2. Read this runbook.
3. Run `git status -sb`.
4. Pick one concrete chunk.
5. Create or update the todo list for that chunk.
6. Update this runbook before stopping.

## Active Goal

Keep the codebase aligned with the Concrete DX policies:

- files own one complete concern
- routes own page UX
- factories are narrow
- shared engines live outside `components/`
- component-to-component imports do not grow
- gates stay green

## Current Checkpoint

- Folder-per-item migration is complete for foundations, primitives, and components.
- Docs playground/render/detail flows consume registry item definitions.
- `CODEBASE_POLICIES.md` replaced the temporary architecture document.
- `components/` root has been cleaned down to the public barrel; shared engines now live in `utilities/`.
- Shared component implementations used by other components now live in private `primitives/internal/*` folders.
- Component `component.tsx` files no longer import sibling component folders.
- The previous LOC-first composer split was rejected. Composer remains whole unless a future change deletes code or creates a real reusable boundary.

## Active Todo

- [x] Move docs route UI out of temporary `apps/docs/src/*Page` proxy modules.
- [x] Replace `create/` with narrow `factories/` and move schema/render helpers to `utilities/`.
- [x] Move loose shared component engines out of `components/` root.
- [x] Move reused component JSX into private internal primitives.
- [x] Add durable codebase policy documentation.
- [x] Run format, lint, typecheck, tests, and build.
- [ ] Commit and push to `main`.

## Next Chunks

- Pay down component-to-component transition exceptions without adding duplicate JSX.
- Decide whether chart shared render engines should become primitives or collapse into chart components.
- Move active CSS selectors into item-owned style files only with visual QA coverage.
- Add nested object/array/discriminated controls over the existing root `Props JSON` boundary.

## Chunk Log

- 2026-04-29: Captured the new DX policy in `CODEBASE_POLICIES.md` and reduced this runbook to a reusable long-run tracker.
- 2026-04-29: Moved docs page UI into App Router page files and deleted the temporary one-line page proxy modules.
- 2026-04-29: Replaced `packages/concrete/src/create` with `packages/concrete/src/factories` plus shared schema/render utilities.
- 2026-04-29: Moved loose shared engines/render helpers out of `packages/concrete/src/components` into `packages/concrete/src/utilities`.
- 2026-04-29: Promoted shared message, toolbar, form-shell, and file-upload implementations into private internal primitive folders so component implementations import primitives instead of siblings.
- 2026-04-29: Gates passed: `bun run format`, `bun run lint`, `bun test`, `bun run typecheck`, and `bun run build`.
