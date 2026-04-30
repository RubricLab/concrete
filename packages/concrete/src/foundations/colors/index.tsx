import { exampleStates, renderExample } from '../../factories/createExamples'
import { createFoundation } from '../../factories/createItems'
import { colorsExamples } from './examples'
import { colorsMeta } from './meta'
import { colorFoundationSchema } from './schema'

export {
	type ColorFoundationInput,
	type ColorFoundationValue,
	type ColorToken,
	colorFoundationSchema,
	colorTokenSchema,
	colorTokens
} from './schema'

export const colorsFoundationDefinition = createFoundation({
	...colorsMeta,
	kind: 'foundation',
	renderExample: (state?: string) => renderExample(colorsExamples, state),
	schema: colorFoundationSchema,
	slug: 'colors',
	states: exampleStates(colorsExamples, ['default'])
})
