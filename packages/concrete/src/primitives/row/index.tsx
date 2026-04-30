import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { Row } from './component'
import { rowExamples } from './examples'
import { rowMeta } from './meta'
import { type RowValue, rowSchema } from './schema'

export type { RowProps } from './component'
export { Row } from './component'
export type { RowInput, RowValue } from './schema'
export { rowPropsSchema, rowSchema } from './schema'

export const rowPrimitiveDefinition = createPrimitive({
	...rowMeta,
	component: Row,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(rowExamples, state),
	renderInput: input => renderRowInput(rowSchema.parse(input)),
	schema: rowSchema,
	slug: 'row',
	states: exampleStates(rowExamples, ['default', 'static'])
})

function renderRowInput({ interactive, label, leadingIcon, meta }: RowValue) {
	return (
		<Row
			interactive={interactive}
			{...(leadingIcon ? { leadingIcon } : {})}
			{...(meta ? { meta } : {})}
		>
			{label}
		</Row>
	)
}
