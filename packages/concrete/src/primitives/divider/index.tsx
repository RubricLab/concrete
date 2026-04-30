import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { Divider } from './component'
import { dividerExamples } from './examples'
import { dividerMeta } from './meta'
import { type DividerValue, dividerSchema } from './schema'

export type { DividerProps } from './component'
export { Divider } from './component'
export type { DividerInput, DividerValue } from './schema'
export { dividerPropsSchema, dividerSchema } from './schema'

export const dividerPrimitiveDefinition = createPrimitive({
	...dividerMeta,
	component: Divider,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(dividerExamples, state),
	renderInput: input => renderDividerInput(dividerSchema.parse(input)),
	schema: dividerSchema,
	slug: 'divider',
	states: exampleStates(dividerExamples, ['default', 'label'])
})

function renderDividerInput(input: DividerValue) {
	return <Divider {...input} />
}
