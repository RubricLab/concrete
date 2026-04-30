import { exampleStates, renderExample } from '../../factories/createExamples'
import { createFoundation } from '../../factories/createItems'
import { layoutExamples } from './examples'
import { layoutMeta } from './meta'
import { layoutFoundationSchema, layoutTokens } from './schema'

export {
	type LayoutFoundationInput,
	type LayoutFoundationValue,
	type LayoutToken,
	layoutFoundationSchema,
	layoutTokenKindSchema,
	layoutTokenSchema,
	layoutTokens
} from './schema'

export const layoutFoundationDefinition = createFoundation({
	...layoutMeta,
	kind: 'foundation',
	renderExample: (state?: string) => renderExample(layoutExamples, state),
	schema: layoutFoundationSchema,
	slug: 'layout',
	states: exampleStates(layoutExamples, ['default', 'templates', 'layers']),
	tokens: layoutTokens
})
