import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { EmptyState } from './component'
import { emptyStateExamples } from './examples'
import { emptyStateMeta } from './meta'
import { type EmptyStateValue, emptyStateSchema } from './schema'

export type { EmptyStateDensity, EmptyStateIntent, EmptyStateProps } from './component'
export { EmptyState } from './component'
export type { EmptyStateInput, EmptyStateValue } from './schema'
export { emptyStatePropsSchema, emptyStateSchema } from './schema'

export const emptyStatePrimitiveDefinition = createPrimitive({
	...emptyStateMeta,
	component: EmptyState,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(emptyStateExamples, state),
	renderInput: input => renderEmptyStateInput(emptyStateSchema.parse(input)),
	schema: emptyStateSchema,
	slug: 'empty-state',
	states: exampleStates(emptyStateExamples, ['default', 'compact', 'sky'])
})

function renderEmptyStateInput({ body, density, icon, intent, title }: EmptyStateValue) {
	return (
		<EmptyState
			density={density}
			icon={icon}
			intent={intent}
			title={title}
			{...(body ? { body } : {})}
		/>
	)
}
