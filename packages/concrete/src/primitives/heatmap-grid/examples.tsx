import { defineExamples } from '../../factories/createExamples'
import {
	HeatmapCell,
	HeatmapColumnLabel,
	HeatmapCorner,
	HeatmapGrid,
	HeatmapRowLabel
} from './component'

export const heatmapGridExamples = defineExamples({
	default: {
		description: 'Heatmap grid with column labels, row label, and values.',
		render: () => (
			<HeatmapGrid columnCount={3}>
				<HeatmapCorner />
				<HeatmapColumnLabel>Mon</HeatmapColumnLabel>
				<HeatmapColumnLabel>Tue</HeatmapColumnLabel>
				<HeatmapColumnLabel>Wed</HeatmapColumnLabel>
				<HeatmapRowLabel>API</HeatmapRowLabel>
				<HeatmapCell intensity={0.34}>12</HeatmapCell>
				<HeatmapCell intensity={0.48}>18</HeatmapCell>
				<HeatmapCell intensity={0.22}>8</HeatmapCell>
			</HeatmapGrid>
		)
	}
})
