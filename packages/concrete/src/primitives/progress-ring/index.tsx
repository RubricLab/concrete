import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { ProgressRing } from './component'
import { progressRingExamples } from './examples'
import { progressRingMeta } from './meta'
import { type ProgressRingValue, progressRingSchema } from './schema'

export type { ProgressRingDensity, ProgressRingIntent, ProgressRingProps } from './component'
export { ProgressRing } from './component'
export type { ProgressRingInput, ProgressRingValue } from './schema'
export { progressRingPropsSchema, progressRingSchema } from './schema'

export const progressRingPrimitiveDefinition = createPrimitive({
	...progressRingMeta,
	component: ProgressRing,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(progressRingExamples, state),
	renderInput: input => renderProgressRingInput(progressRingSchema.parse(input)),
	schema: progressRingSchema,
	slug: 'progress-ring',
	states: exampleStates(progressRingExamples, ['default', 'density', 'signals'])
})

function renderProgressRingInput(input: ProgressRingValue) {
	return <ProgressRing {...input} />
}
