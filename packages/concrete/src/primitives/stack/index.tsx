import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { Stack } from './component'
import { stackExamples } from './examples'
import { stackMeta } from './meta'
import { type StackValue, stackSchema } from './schema'

export type { StackProps } from './component'
export { Stack } from './component'
export type { StackAlign, StackInput, StackValue } from './schema'
export { stackAlignSchema, stackPropsSchema, stackSchema } from './schema'

export const stackPrimitiveDefinition = createPrimitive({
	...stackMeta,
	component: Stack,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(stackExamples, state),
	renderInput: input => renderStackInput(stackSchema.parse(input)),
	schema: stackSchema,
	slug: 'stack',
	states: exampleStates(stackExamples, ['default', 'divided', 'editorial'])
})

function renderStackInput({ align, content, density, divided }: StackValue) {
	return (
		<Stack align={align} density={density} divided={divided}>
			{content}
		</Stack>
	)
}
