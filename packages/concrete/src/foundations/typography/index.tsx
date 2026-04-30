import { exampleStates, renderExample } from '../../factories/createExamples'
import { createFoundation } from '../../factories/createItems'
import { typographyExamples } from './examples'
import { typographyMeta } from './meta'
import { typographyFoundationSchema, typographyTokens } from './schema'

export {
	type TypographyFoundationInput,
	type TypographyFoundationValue,
	type TypographyToken,
	typographyFoundationSchema,
	typographyTokenSchema,
	typographyTokens
} from './schema'

export const typographyFoundationDefinition = createFoundation({
	...typographyMeta,
	kind: 'foundation',
	renderExample: (state?: string) => renderExample(typographyExamples, state),
	schema: typographyFoundationSchema,
	slug: 'typography',
	states: exampleStates(typographyExamples, ['default', 'scale', 'mono']),
	tokens: typographyTokens
})
