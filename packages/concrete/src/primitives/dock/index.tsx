import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { Dock } from './component'
import { dockExamples } from './examples'
import { dockMeta } from './meta'
import { type DockValue, dockSchema } from './schema'

export type { DockProps } from './component'
export { Dock } from './component'
export type { DockAlign, DockInput, DockPlacement, DockValue } from './schema'
export { dockAlignSchema, dockPlacementSchema, dockPropsSchema, dockSchema } from './schema'

export const dockPrimitiveDefinition = createPrimitive({
	...dockMeta,
	component: Dock,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(dockExamples, state),
	renderInput: input => renderDockInput(dockSchema.parse(input)),
	schema: dockSchema,
	slug: 'dock',
	states: exampleStates(dockExamples, ['default', 'between', 'top'])
})

function renderDockInput({ align, content, density, placement }: DockValue) {
	return (
		<Dock align={align} density={density} placement={placement}>
			{content}
		</Dock>
	)
}
