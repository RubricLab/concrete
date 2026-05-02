import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { Grid } from './component'
import { gridExamples } from './examples'
import { gridMeta } from './meta'
import { type GridValue, gridSchema } from './schema'

export type { GridProps } from './component'
export { Grid } from './component'
export type { GridColumns, GridInput, GridValue } from './schema'
export { gridColumnsSchema, gridPropsSchema, gridSchema } from './schema'

export const gridPrimitiveDefinition = createPrimitive({
	...gridMeta,
	component: Grid,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(gridExamples, state),
	renderInput: input => renderGridInput(gridSchema.parse(input)),
	schema: gridSchema,
	slug: 'grid',
	states: exampleStates(gridExamples, ['default', 'three', 'compact'])
})

function renderGridInput({ columns, content, density }: GridValue) {
	return (
		<Grid columns={columns} density={density}>
			{content}
		</Grid>
	)
}
