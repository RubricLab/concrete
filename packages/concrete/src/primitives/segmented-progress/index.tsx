import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { SegmentedProgress } from './component'
import { segmentedProgressExamples } from './examples'
import { segmentedProgressMeta } from './meta'
import { type SegmentedProgressValue, segmentedProgressSchema } from './schema'

export type { SegmentedProgressProps } from './component'
export { SegmentedProgress } from './component'
export type { SegmentedProgressInput, SegmentedProgressValue } from './schema'
export { segmentedProgressPropsSchema, segmentedProgressSchema } from './schema'

export const segmentedProgressPrimitiveDefinition = createPrimitive({
	...segmentedProgressMeta,
	component: SegmentedProgress,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(segmentedProgressExamples, state),
	renderInput: input => renderSegmentedProgressInput(segmentedProgressSchema.parse(input)),
	schema: segmentedProgressSchema,
	slug: 'segmented-progress',
	states: exampleStates(segmentedProgressExamples, ['default', 'complete'])
})

function renderSegmentedProgressInput(input: SegmentedProgressValue) {
	return <SegmentedProgress {...input} />
}
