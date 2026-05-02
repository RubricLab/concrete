import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { Texture, TexturePreview } from './component'
import { textureExamples } from './examples'
import { textureMeta } from './meta'
import { type TextureValue, textureSchema } from './schema'

export type { TextureProps, TextureVariant } from './component'
export { getTextureClass, Texture, TexturePreview } from './component'
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
	states: exampleStates(textureExamples, ['default', 'lattice', 'depth'])
})

function renderTextureInput({ texture }: TextureValue) {
	return <TexturePreview variant={texture} />
}
