import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { ScaleFrame } from './component'
import { scaleFrameExamples } from './examples'
import { scaleFrameMeta } from './meta'
import { type ScaleFrameValue, scaleFrameSchema } from './schema'

export type { ScaleFrameAlign, ScaleFrameProps, ScaleFrameSurface } from './component'
export { ScaleFrame } from './component'
export type { ScaleFrameInput, ScaleFrameValue } from './schema'
export { scaleFramePropsSchema, scaleFrameSchema } from './schema'

export const scaleFramePrimitiveDefinition = createPrimitive({
	...scaleFrameMeta,
	component: ScaleFrame,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(scaleFrameExamples, state),
	renderInput: input => renderScaleFrameInput(scaleFrameSchema.parse(input)),
	schema: scaleFrameSchema,
	slug: 'scale-frame',
	states: exampleStates(scaleFrameExamples, ['controls', 'panel'])
})

function renderScaleFrameInput({ align, body, scale, surface }: ScaleFrameValue) {
	return (
		<ScaleFrame align={align} scale={scale} surface={surface}>
			<div>{body}</div>
		</ScaleFrame>
	)
}
