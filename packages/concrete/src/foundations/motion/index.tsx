import { exampleStates, renderExample } from '../../factories/createExamples'
import { createFoundation } from '../../factories/createItems'
import { motionExamples } from './examples'
import { motionMeta } from './meta'
import { motionFoundationSchema, motionTokens } from './schema'

export {
	type MotionFoundationInput,
	type MotionFoundationValue,
	type MotionToken,
	motionFoundationSchema,
	motionTokenSchema,
	motionTokens
} from './schema'

export const motionFoundationDefinition = createFoundation({
	...motionMeta,
	kind: 'foundation',
	renderExample: (state?: string) => renderExample(motionExamples, state),
	schema: motionFoundationSchema,
	slug: 'motion',
	states: exampleStates(motionExamples, ['default', 'states']),
	tokens: motionTokens
})
