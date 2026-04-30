import { exampleStates, renderExample } from '../../factories/createExamples'
import { createFoundation } from '../../factories/createItems'
import { elevationExamples } from './examples'
import { elevationMeta } from './meta'
import { elevationFoundationSchema } from './schema'

export {
	type ElevationFoundationInput,
	type ElevationFoundationValue,
	type ElevationToken,
	elevationFoundationSchema,
	elevationTokenSchema,
	elevationTokens
} from './schema'

export const elevationFoundationDefinition = createFoundation({
	...elevationMeta,
	kind: 'foundation',
	renderExample: (state?: string) => renderExample(elevationExamples, state),
	schema: elevationFoundationSchema,
	slug: 'elevation',
	states: exampleStates(elevationExamples, ['default'])
})
