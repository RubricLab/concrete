import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { Wordmark } from './component'
import { wordmarkExamples } from './examples'
import { wordmarkMeta } from './meta'
import { wordmarkSchema } from './schema'

export type { WordmarkProps } from './component'
export { Wordmark } from './component'
export type { WordmarkInput, WordmarkValue } from './schema'
export { wordmarkPropsSchema, wordmarkSchema } from './schema'

export const wordmarkPrimitiveDefinition = createPrimitive({
	...wordmarkMeta,
	component: Wordmark,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(wordmarkExamples, state),
	renderInput: input => {
		wordmarkSchema.parse(input)
		return <Wordmark />
	},
	schema: wordmarkSchema,
	slug: 'wordmark',
	states: exampleStates(wordmarkExamples, ['default'])
})
