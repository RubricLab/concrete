import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { FocusRingPreview } from './component'
import { focusRingExamples } from './examples'
import { focusRingMeta } from './meta'
import { type FocusRingValue, focusRingSchema } from './schema'

export type { FocusRingPreviewProps } from './component'
export { FocusRingPreview } from './component'
export type { FocusRingInput, FocusRingValue } from './schema'
export { focusRingPropsSchema, focusRingSchema } from './schema'

export const focusRingPrimitiveDefinition = createPrimitive({
	...focusRingMeta,
	component: FocusRingPreview,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(focusRingExamples, state),
	renderInput: input => renderFocusRingInput(focusRingSchema.parse(input)),
	schema: focusRingSchema,
	slug: 'focus-ring',
	states: exampleStates(focusRingExamples, ['default'])
})

function renderFocusRingInput({ label }: FocusRingValue) {
	return <FocusRingPreview label={label} />
}
