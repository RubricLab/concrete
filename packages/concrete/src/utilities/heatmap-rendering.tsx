import type { ReactNode } from 'react'
import { Fragment } from 'react'
import {
	HeatmapCell,
	HeatmapColumnLabel,
	HeatmapCorner,
	HeatmapGrid,
	HeatmapRowLabel
} from '../primitives'
import { formatChartValue } from './chart-core-rendering'

export function renderHeatmapChart(
	cells: readonly { label?: string | undefined; value: number; x: string; y: string }[],
	showValues: boolean
): ReactNode {
	const xLabels = [...new Set(cells.map(cell => cell.x))]
	const yLabels = [...new Set(cells.map(cell => cell.y))]
	const maximum = Math.max(...cells.map(cell => cell.value), 1)

	return (
		<HeatmapGrid columnCount={xLabels.length}>
			<HeatmapCorner />
			{xLabels.map(label => (
				<HeatmapColumnLabel key={label}>{label}</HeatmapColumnLabel>
			))}
			{yLabels.map(yLabel => (
				<Fragment key={yLabel}>
					<HeatmapRowLabel>{yLabel}</HeatmapRowLabel>
					{xLabels.map(xLabel => {
						const cell = cells.find(value => value.x === xLabel && value.y === yLabel)
						const intensity = cell ? cell.value / maximum : 0

						return (
							<HeatmapCell
								intensity={0.08 + intensity * 0.44}
								key={`${xLabel}-${yLabel}`}
								title={cell?.label ?? `${xLabel} ${yLabel}`}
							>
								{showValues ? (cell ? formatChartValue(cell.value) : '') : undefined}
							</HeatmapCell>
						)
					})}
				</Fragment>
			))}
		</HeatmapGrid>
	)
}
