import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type HeatmapGridMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const heatmapGridMeta = {
	category: 'data',
	description: 'Heatmap grid, labels, corner, and intensity cells.',
	guidance:
		'Use Heatmap Grid after row/column data has been normalized. Components own intensity scaling and cell ordering.',
	name: 'Heatmap Grid',
	pressure: ['product', 'generative'],
	props: [
		prop('HeatmapGrid.columnCount', 'number', 'Column count for the grid.', undefined, true),
		prop('HeatmapCell.intensity', 'number', 'Computed heatmap opacity scalar.'),
		prop('HeatmapCell.children', 'ReactNode', 'Optional cell value.')
	]
} as const satisfies HeatmapGridMeta
