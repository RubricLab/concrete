import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { Pill } from './component'
import { pillExamples } from './examples'
import { pillMeta } from './meta'
import { type PillValue, pillSchema } from './schema'

export type { LabelProps } from './component'
export { Pill } from './component'
export type { PillInput, PillValue } from './schema'
export { pillPropsSchema, pillSchema, pillToneValues } from './schema'

export const pillPrimitiveDefinition = createPrimitive({
	...pillMeta,
	component: Pill,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(pillExamples, state),
	renderInput: input => renderPillInput(pillSchema.parse(input)),
	schema: pillSchema,
	slug: 'pill',
	states: exampleStates(pillExamples, ['default', 'signals', 'icons'])
})

function renderPillInput({ label, leadingIcon, ...input }: PillValue) {
	return (
		<Pill {...input} {...(leadingIcon ? { leadingIcon } : {})}>
			{label}
		</Pill>
	)
}
