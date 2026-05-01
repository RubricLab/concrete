import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { Delta } from './component'
import { deltaExamples } from './examples'
import { deltaMeta } from './meta'
import { type DeltaValue, deltaSchema } from './schema'

export type { DeltaDensity, DeltaHierarchy, DeltaIntent, DeltaProps } from './component'
export { Delta } from './component'
export type { DeltaInput, DeltaValue } from './schema'
export { deltaPropsSchema, deltaSchema } from './schema'

export const deltaPrimitiveDefinition = createPrimitive({
	...deltaMeta,
	component: Delta,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(deltaExamples, state),
	renderInput: input => renderDeltaInput(deltaSchema.parse(input)),
	schema: deltaSchema,
	slug: 'delta',
	states: exampleStates(deltaExamples, ['default', 'basis', 'density', 'wash'])
})

function renderDeltaInput({ basis, ...props }: DeltaValue) {
	return <Delta {...props} {...(basis ? { basis } : {})} />
}
