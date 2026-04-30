import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { Progress } from './component'
import { progressExamples } from './examples'
import { progressMeta } from './meta'
import { type ProgressValue, progressSchema } from './schema'

export type {
	ProgressIndeterminate,
	ProgressProps,
	ProgressRingProps,
	ProgressSize,
	ProgressTone,
	SegmentedProgressProps
} from './component'
export { Progress, ProgressRing, SegmentedProgress } from './component'
export type { ProgressInput, ProgressValue } from './schema'
export { progressPropsSchema, progressSchema } from './schema'

export const progressPrimitiveDefinition = createPrimitive({
	...progressMeta,
	component: Progress,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(progressExamples, state),
	renderInput: input => renderProgressInput(progressSchema.parse(input)),
	schema: progressSchema,
	slug: 'progress',
	states: exampleStates(progressExamples, [
		'default',
		'signals',
		'indeterminate',
		'segmented',
		'ring'
	])
})

function renderProgressInput({ indeterminate, ...props }: ProgressValue) {
	return <Progress {...props} {...(indeterminate ? { indeterminate } : {})} />
}
