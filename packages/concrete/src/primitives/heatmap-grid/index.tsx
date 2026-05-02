import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import {
	HeatmapCell,
	HeatmapColumnLabel,
	HeatmapCorner,
	HeatmapGrid,
	HeatmapRowLabel
} from './component'
import { heatmapGridExamples } from './examples'
import { heatmapGridMeta } from './meta'
import { type HeatmapGridValue, heatmapGridSchema } from './schema'

export type {
	HeatmapCellProps,
	HeatmapColumnLabelProps,
	HeatmapCornerProps,
	HeatmapGridProps,
	HeatmapRowLabelProps
} from './component'
export {
	HeatmapCell,
	HeatmapColumnLabel,
	HeatmapCorner,
	HeatmapGrid,
	HeatmapRowLabel
} from './component'
export type { HeatmapGridInput, HeatmapGridValue } from './schema'
export { heatmapGridPropsSchema, heatmapGridSchema } from './schema'

export const heatmapGridPrimitiveDefinition = createPrimitive({
	...heatmapGridMeta,
	component: HeatmapGrid,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(heatmapGridExamples, state),
	renderInput: input => renderHeatmapGridInput(heatmapGridSchema.parse(input)),
	schema: heatmapGridSchema,
	slug: 'heatmap-grid',
	states: exampleStates(heatmapGridExamples, ['default'])
})

function renderHeatmapGridInput({ columnCount, showValues }: HeatmapGridValue) {
	return (
		<HeatmapGrid columnCount={columnCount}>
			<HeatmapCorner />
			<HeatmapColumnLabel>Mon</HeatmapColumnLabel>
			<HeatmapColumnLabel>Tue</HeatmapColumnLabel>
			<HeatmapColumnLabel>Wed</HeatmapColumnLabel>
			<HeatmapRowLabel>API</HeatmapRowLabel>
			<HeatmapCell intensity={0.34}>{showValues ? '12' : undefined}</HeatmapCell>
			<HeatmapCell intensity={0.48}>{showValues ? '18' : undefined}</HeatmapCell>
			<HeatmapCell intensity={0.22}>{showValues ? '8' : undefined}</HeatmapCell>
		</HeatmapGrid>
	)
}
