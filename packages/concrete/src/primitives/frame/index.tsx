import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { Frame } from './component'
import { frameExamples } from './examples'
import { frameMeta } from './meta'
import { type FrameValue, frameSchema } from './schema'

export type { FrameProps } from './component'
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
	states: exampleStates(frameExamples, ['default', 'texture'])
})

function renderFrameInput({ body, footer, footerMeta, header, headerMeta, texture }: FrameValue) {
	return (
		<Frame
			{...(footer ? { footer } : {})}
			{...(footerMeta ? { footerMeta } : {})}
			{...(header ? { header } : {})}
			{...(headerMeta ? { headerMeta } : {})}
			{...(texture ? { texture } : {})}
		>
			{body}
		</Frame>
	)
}
