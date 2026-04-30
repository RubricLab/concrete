import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { FieldRow } from './component'
import { fieldRowExamples } from './examples'
import { fieldRowMeta } from './meta'
import { type FieldRowValue, fieldRowSchema } from './schema'

export type { FieldRowProps } from './component'
export { FieldRow } from './component'
export type { FieldRowAlign, FieldRowInput, FieldRowValue } from './schema'
export { fieldRowAlignSchema, fieldRowPropsSchema, fieldRowSchema } from './schema'

export const fieldRowPrimitiveDefinition = createPrimitive({
	...fieldRowMeta,
	component: FieldRow,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(fieldRowExamples, state),
	renderInput: input => renderFieldRowInput(fieldRowSchema.parse(input)),
	schema: fieldRowSchema,
	slug: 'field-row',
	states: exampleStates(fieldRowExamples, ['default', 'meta', 'error'])
})

function renderFieldRowInput({
	align,
	control,
	description,
	interactive,
	label,
	meta,
	status
}: FieldRowValue) {
	return (
		<FieldRow
			align={align}
			control={control}
			description={description}
			interactive={interactive}
			meta={meta}
			status={status}
		>
			{label}
		</FieldRow>
	)
}
