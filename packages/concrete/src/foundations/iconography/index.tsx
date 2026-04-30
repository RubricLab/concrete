import { exampleStates, renderExample } from '../../factories/createExamples'
import { createFoundation } from '../../factories/createItems'
import { iconographyExamples } from './examples'
import { iconographyMeta } from './meta'
import { iconographyFoundationSchema, iconographyTokens } from './schema'

export {
	type IconographyFoundationInput,
	type IconographyFoundationValue,
	type IconographyRole,
	type IconographyToken,
	iconographyFoundationSchema,
	iconographyRoleSchema,
	iconographyStrokePolicy,
	iconographyTokenSchema,
	iconographyTokens
} from './schema'

export const iconographyFoundationDefinition = createFoundation({
	...iconographyMeta,
	kind: 'foundation',
	renderExample: (state?: string) => renderExample(iconographyExamples, state),
	schema: iconographyFoundationSchema,
	slug: 'iconography',
	states: exampleStates(iconographyExamples, ['default', 'stroke']),
	tokens: iconographyTokens
})
