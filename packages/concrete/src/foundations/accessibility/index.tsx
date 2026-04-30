import { exampleStates, renderExample } from '../../factories/createExamples'
import { createFoundation } from '../../factories/createItems'
import { accessibilityExamples } from './examples'
import { accessibilityMeta } from './meta'
import { accessibilityFoundationSchema, accessibilityTokens } from './schema'

export {
	type AccessibilityFoundationInput,
	type AccessibilityFoundationValue,
	type AccessibilityToken,
	accessibilityFoundationSchema,
	accessibilityTokenKindSchema,
	accessibilityTokenSchema,
	accessibilityTokens
} from './schema'

export const accessibilityFoundationDefinition = createFoundation({
	...accessibilityMeta,
	kind: 'foundation',
	renderExample: (state?: string) => renderExample(accessibilityExamples, state),
	schema: accessibilityFoundationSchema,
	slug: 'accessibility',
	states: exampleStates(accessibilityExamples, ['default', 'utilities']),
	tokens: accessibilityTokens
})
