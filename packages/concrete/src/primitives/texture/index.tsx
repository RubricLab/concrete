import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { Texture } from './component'
import { textureExamples } from './examples'
import { textureMeta } from './meta'
import { type TextureValue, textureSchema } from './schema'

export type { TextureProps, TextureVariant } from './component'
export { getTextureClass, Texture } from './component'
export type { TextureInput, TextureValue } from './schema'
export { texturePropsSchema, textureSchema } from './schema'

export const texturePrimitiveDefinition = createPrimitive({
	...textureMeta,
	component: Texture,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(textureExamples, state),
	renderInput: input => renderTextureInput(textureSchema.parse(input)),
	schema: textureSchema,
	slug: 'texture',
	states: exampleStates(textureExamples, ['default', 'lattice'])
})

function renderTextureInput({ texture }: TextureValue) {
	return <Texture style={{ height: 96 }} variant={texture} />
}
