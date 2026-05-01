import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { Frame } from './component'
import { frameExamples } from './examples'
import { frameMeta } from './meta'
import { type FrameValue, frameSchema } from './schema'

export type { FrameAlign, FrameProps, FrameScale, FrameTexture } from './component'
export { Frame } from './component'
export type { FrameInput, FrameValue } from './schema'
export { framePropsSchema, frameSchema } from './schema'

export const framePrimitiveDefinition = createPrimitive({
	...frameMeta,
	component: Frame,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(frameExamples, state),
	renderInput: input => renderFrameInput(frameSchema.parse(input)),
	schema: frameSchema,
	slug: 'frame',
	states: exampleStates(frameExamples, ['default', 'texture', 'showcase'])
})

function renderFrameInput({
	align,
	body,
	footer,
	footerMeta,
	header,
	headerMeta,
	scale,
	texture
}: FrameValue) {
	return (
		<Frame
			align={align}
			{...(footer ? { footer } : {})}
			{...(footerMeta ? { footerMeta } : {})}
			{...(header ? { header } : {})}
			{...(headerMeta ? { headerMeta } : {})}
			scale={scale}
			{...(texture ? { texture } : {})}
		>
			{body}
		</Frame>
	)
}
