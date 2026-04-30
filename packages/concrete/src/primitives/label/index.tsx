import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { Label } from './component'
import { labelExamples } from './examples'
import { labelMeta } from './meta'
import { type LabelValue, labelSchema } from './schema'

export type { ConcreteLabelProps } from './component'
export { Label } from './component'
export type { LabelInput, LabelPurpose, LabelToneValue, LabelValue } from './schema'
export { labelPropsSchema, labelPurposeSchema, labelSchema, labelToneSchema } from './schema'

export const labelPrimitiveDefinition = createPrimitive({
	...labelMeta,
	component: Label,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(labelExamples, state),
	renderInput: input => renderLabelInput(labelSchema.parse(input)),
	schema: labelSchema,
	slug: 'label',
	states: exampleStates(labelExamples, ['default', 'field', 'tones'])
})

function renderLabelInput({ content, leadingIcon, marker, purpose, tone }: LabelValue) {
	return (
		<Label marker={marker} purpose={purpose} tone={tone} {...(leadingIcon ? { leadingIcon } : {})}>
			{content}
		</Label>
	)
}
