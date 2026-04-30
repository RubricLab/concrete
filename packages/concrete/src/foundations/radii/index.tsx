import { exampleStates, renderExample } from '../../factories/createExamples'
import { createFoundation } from '../../factories/createItems'
import { radiiExamples } from './examples'
import { radiiMeta } from './meta'
import { radiiFoundationSchema } from './schema'

export {
	type RadiiFoundationInput,
	type RadiiFoundationValue,
	type RadiusToken,
	radiiFoundationSchema,
	radiusTokenSchema,
	radiusTokens
} from './schema'

export const radiiFoundationDefinition = createFoundation({
	...radiiMeta,
	kind: 'foundation',
	renderExample: (state?: string) => renderExample(radiiExamples, state),
	schema: radiiFoundationSchema,
	slug: 'radii',
	states: exampleStates(radiiExamples, ['default'])
})
