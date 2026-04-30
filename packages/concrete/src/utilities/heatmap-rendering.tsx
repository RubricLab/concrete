import type { CSSProperties, ReactNode } from 'react'
import { Fragment } from 'react'
import { concreteClassNames } from '../styles/class-names'
import { formatChartValue } from './chart-core-rendering'

export function renderHeatmapChart(
	cells: readonly { label?: string | undefined; value: number; x: string; y: string }[],
	showValues: boolean
): ReactNode {
	const xLabels = [...new Set(cells.map(cell => cell.x))]
	const yLabels = [...new Set(cells.map(cell => cell.y))]
	const maximum = Math.max(...cells.map(cell => cell.value), 1)

	return (
		<div
			className={concreteClassNames.heatmapChart}
			style={{ gridTemplateColumns: `76px repeat(${xLabels.length}, minmax(34px, 1fr))` }}
		>
			<span />
			{xLabels.map(label => (
				<b key={label}>{label}</b>
			))}
			{yLabels.map(yLabel => (
				<Fragment key={yLabel}>
					<strong>{yLabel}</strong>
					{xLabels.map(xLabel => {
						const cell = cells.find(value => value.x === xLabel && value.y === yLabel)
						const intensity = cell ? cell.value / maximum : 0

						return (
							<span
								className={concreteClassNames.heatmapCell}
								key={`${xLabel}-${yLabel}`}
								style={{ '--heatmap-intensity': String(0.08 + intensity * 0.44) } as CSSProperties}
								title={cell?.label ?? `${xLabel} ${yLabel}`}
							>
								{showValues ? <span>{cell ? formatChartValue(cell.value) : ''}</span> : null}
							</span>
						)
					})}
				</Fragment>
			))}
		</div>
	)
}
