import { exampleStates, renderExample } from '../../factories/createExamples'
import { createFoundation } from '../../factories/createItems'
import { texturesExamples } from './examples'
import { texturesMeta } from './meta'
import { textureFoundationSchema, textureTokens } from './schema'

export {
	type TextureFoundationInput,
	type TextureFoundationValue,
	type TextureToken,
	textureFoundationSchema,
	textureTokens
} from './schema'

export const texturesFoundationDefinition = createFoundation({
	...texturesMeta,
	kind: 'foundation',
	renderExample: (state?: string) => renderExample(texturesExamples, state),
	schema: textureFoundationSchema,
	slug: 'textures',
	states: exampleStates(texturesExamples, ['default', 'diagram']),
	tokens: textureTokens.map(token => ({ name: token, value: token }))
})
