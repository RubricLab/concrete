import { exampleStates, renderExample } from '../../factories/createExamples'
import { createFoundation } from '../../factories/createItems'
import { sizingExamples } from './examples'
import { sizingMeta } from './meta'
import { sizingFoundationSchema, sizingTokens } from './schema'

export {
	type SizingFoundationInput,
	type SizingFoundationValue,
	type SizingToken,
	sizingFoundationSchema,
	sizingTokenKindSchema,
	sizingTokenSchema,
	sizingTokens
} from './schema'

export const sizingFoundationDefinition = createFoundation({
	...sizingMeta,
	kind: 'foundation',
	renderExample: (state?: string) => renderExample(sizingExamples, state),
	schema: sizingFoundationSchema,
	slug: 'sizing',
	states: exampleStates(sizingExamples, ['default', 'controls', 'measures']),
	tokens: sizingTokens
})
