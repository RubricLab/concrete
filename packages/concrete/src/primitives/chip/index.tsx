import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { Chip } from './component'
import { chipExamples } from './examples'
import { chipMeta } from './meta'
import { type ChipValue, chipSchema } from './schema'

export type { ChipProps } from './component'
export { Chip } from './component'
export type { ChipInput, ChipValue } from './schema'
export { chipPropsSchema, chipSchema, chipToneValues } from './schema'

export const chipPrimitiveDefinition = createPrimitive({
	...chipMeta,
	component: Chip,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(chipExamples, state),
	renderInput: input => renderChipInput(chipSchema.parse(input)),
	schema: chipSchema,
	slug: 'chip',
	states: exampleStates(chipExamples, ['default', 'tones', 'icons'])
})

function renderChipInput({ label, leadingIcon, ...input }: ChipValue) {
	return (
		<Chip {...input} {...(leadingIcon ? { leadingIcon } : {})}>
			{label}
		</Chip>
	)
}
