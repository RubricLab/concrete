import { exampleStates, renderExample } from '../../factories/createExamples'
import { createFoundation } from '../../factories/createItems'
import { spacingExamples } from './examples'
import { spacingMeta } from './meta'
import { spacingFoundationSchema } from './schema'

export {
	type SpacingFoundationInput,
	type SpacingFoundationValue,
	type SpacingToken,
	spacingFoundationSchema,
	spacingTokenSchema,
	spacingTokens
} from './schema'

export const spacingFoundationDefinition = createFoundation({
	...spacingMeta,
	kind: 'foundation',
	renderExample: (state?: string) => renderExample(spacingExamples, state),
	schema: spacingFoundationSchema,
	slug: 'spacing',
	states: exampleStates(spacingExamples, ['default', 'density'])
})
