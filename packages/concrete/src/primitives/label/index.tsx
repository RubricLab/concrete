import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { Label } from './component'
import { labelExamples } from './examples'
import { labelMeta } from './meta'
import { type LabelValue, labelSchema } from './schema'

export type { ConcreteLabelProps } from './component'
export { Label } from './component'
export type { LabelInput, LabelIntentValue, LabelPurpose, LabelValue } from './schema'
export { labelIntentSchema, labelPropsSchema, labelPurposeSchema, labelSchema } from './schema'

export const labelPrimitiveDefinition = createPrimitive({
	...labelMeta,
	component: Label,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(labelExamples, state),
	renderInput: input => renderLabelInput(labelSchema.parse(input)),
	schema: labelSchema,
	slug: 'label',
	states: exampleStates(labelExamples, ['default', 'field', 'intents'])
})

function renderLabelInput({ content, intent, leadingIcon, marker, purpose }: LabelValue) {
	return (
		<Label
			intent={intent}
			marker={marker}
			purpose={purpose}
			{...(leadingIcon ? { leadingIcon } : {})}
		>
			{content}
		</Label>
	)
}
