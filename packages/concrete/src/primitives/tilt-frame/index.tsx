import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { TiltFrame } from './component'
import { tiltFrameExamples } from './examples'
import { tiltFrameMeta } from './meta'
import { type TiltFrameValue, tiltFrameSchema } from './schema'

export type { TiltFrameIntensity, TiltFrameProps, TiltFrameSurface } from './component'
export { TiltFrame } from './component'
export type { TiltFrameInput, TiltFrameValue } from './schema'
export { tiltFramePropsSchema, tiltFrameSchema } from './schema'

export const tiltFramePrimitiveDefinition = createPrimitive({
	...tiltFrameMeta,
	component: TiltFrame,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(tiltFrameExamples, state),
	renderInput: input => renderTiltFrameInput(tiltFrameSchema.parse(input)),
	schema: tiltFrameSchema,
	slug: 'tilt-frame',
	states: exampleStates(tiltFrameExamples, ['default', 'surface'])
})

function renderTiltFrameInput({ body, interactive, intensity, surface }: TiltFrameValue) {
	return (
		<TiltFrame interactive={interactive} intensity={intensity} surface={surface}>
			{body}
		</TiltFrame>
	)
}
