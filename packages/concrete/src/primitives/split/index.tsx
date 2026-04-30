import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { Split } from './component'
import { splitExamples } from './examples'
import { splitMeta } from './meta'
import { type SplitValue, splitSchema } from './schema'

export type { SplitProps } from './component'
export { Split } from './component'
export type { SplitInput, SplitRatio, SplitValue } from './schema'
export { splitPropsSchema, splitRatioSchema, splitSchema } from './schema'

export const splitPrimitiveDefinition = createPrimitive({
	...splitMeta,
	component: Split,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(splitExamples, state),
	renderInput: input => renderSplitInput(splitSchema.parse(input)),
	schema: splitSchema,
	slug: 'split',
	states: exampleStates(splitExamples, ['default', 'even', 'sidebar'])
})

function renderSplitInput({ aside, content, density, ratio }: SplitValue) {
	return (
		<Split aside={aside} density={density} ratio={ratio}>
			{content}
		</Split>
	)
}
