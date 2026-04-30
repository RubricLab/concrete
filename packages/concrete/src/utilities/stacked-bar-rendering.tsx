import type { ReactNode } from 'react'
import { cn } from '../primitives/utils'
import type { DataPoint, stackedBarChartSchema } from '../schemas'
import { concreteClassNames } from '../styles/class-names'
import {
	createChartPlotBox,
	formatChartValue,
	getStackedTotal,
	renderCartesianGrid
} from './chart-core-rendering'
import { getDataToneClass } from './data-tone'

export function renderStackedBarChart(
	groups: readonly { label: string; segments: readonly DataPoint[] }[],
	normalized: boolean,
	orientation: 'horizontal' | 'vertical',
	height: number,
	options: Pick<
		ReturnType<typeof stackedBarChartSchema.parse>,
		'showGrid' | 'showValues' | 'showXAxis' | 'showYAxis'
	>
): ReactNode {
	const width = 640

	if (groups.length === 0) {
		return <div className={concreteClassNames.chartMessage}>No data</div>
	}

	if (orientation === 'vertical') {
		return renderStackedBarColumns(groups, normalized, width, height, options)
	}

	return renderStackedBarRails(groups, normalized, width, height, options)
}

function renderStackedBarColumns(
	groups: readonly { label: string; segments: readonly DataPoint[] }[],
	normalized: boolean,
	width: number,
	height: number,
	options: Pick<
		ReturnType<typeof stackedBarChartSchema.parse>,
		'showGrid' | 'showValues' | 'showXAxis' | 'showYAxis'
	>
): ReactNode {
	const plotBox = createChartPlotBox(width, height, {
		bottom: 34,
		left: 46,
		right: 18,
		top: 22
	})
	const totals = groups.map(group => getStackedTotal(group))
	const maximumTotal = Math.max(...totals, 1)
	const extent: readonly [number, number] = [0, normalized ? 100 : maximumTotal]
	const slotWidth = plotBox.width / Math.max(groups.length, 1)
	const columnWidth = Math.max(slotWidth * 0.42, 10)
	const xLabels = groups.map((group, groupIndex) => ({
		label: group.label,
		x: plotBox.left + groupIndex * slotWidth + slotWidth / 2
	}))

	return (
		<svg aria-hidden className={concreteClassNames.chartSvg} viewBox={`0 0 ${width} ${height}`}>
			<title>Stacked bar chart</title>
			{renderCartesianGrid(plotBox, extent, xLabels, options)}
			{groups.map((group, groupIndex) => {
				const total = getStackedTotal(group)
				const denominator = normalized ? total || 1 : maximumTotal
				const x = plotBox.left + groupIndex * slotWidth + (slotWidth - columnWidth) / 2
				let cursorY = plotBox.bottom

				return (
					<g key={group.label}>
						<rect
							className={concreteClassNames.chartBarTrack}
							height={plotBox.height}
							rx="4"
							width={columnWidth}
							x={x}
							y={plotBox.top}
						/>
						{group.segments.map(segment => {
							const segmentHeight = Math.max((segment.value / denominator) * plotBox.height, 1)
							cursorY -= segmentHeight

							return (
								<rect
									className={cn(concreteClassNames.chartStackSegment, getDataToneClass(segment.tone))}
									height={segmentHeight}
									key={segment.label}
									rx="3"
									width={columnWidth}
									x={x}
									y={cursorY}
								/>
							)
						})}
						{options.showValues ? (
							<text
								className={concreteClassNames.chartValueLabel}
								textAnchor="middle"
								x={x + columnWidth / 2}
								y={plotBox.top - 7}
							>
								{formatChartValue(total)}
							</text>
						) : null}
					</g>
				)
			})}
		</svg>
	)
}

function renderStackedBarRails(
	groups: readonly { label: string; segments: readonly DataPoint[] }[],
	normalized: boolean,
	width: number,
	height: number,
	options: Pick<ReturnType<typeof stackedBarChartSchema.parse>, 'showValues'>
): ReactNode {
	const plotBox = createChartPlotBox(width, height, {
		bottom: 22,
		left: 92,
		right: 48,
		top: 22
	})
	const totals = groups.map(group => getStackedTotal(group))
	const maximumTotal = Math.max(...totals, 1)
	const rowStep = plotBox.height / Math.max(groups.length, 1)
	const barHeight = Math.min(14, Math.max(rowStep * 0.38, 8))

	return (
		<svg aria-hidden className={concreteClassNames.chartSvg} viewBox={`0 0 ${width} ${height}`}>
			<title>Stacked rail chart</title>
			<rect
				className={concreteClassNames.chartPlotBackground}
				height={plotBox.height}
				rx="8"
				width={plotBox.width}
				x={plotBox.left}
				y={plotBox.top}
			/>
			{groups.map((group, groupIndex) => {
				const total = getStackedTotal(group)
				const denominator = normalized ? total || 1 : maximumTotal
				const y = plotBox.top + groupIndex * rowStep + (rowStep - barHeight) / 2
				let cursorX = plotBox.left

				return (
					<g key={group.label}>
						<text
							className={concreteClassNames.chartRowLabel}
							textAnchor="end"
							x={plotBox.left - 10}
							y={y + barHeight}
						>
							{group.label}
						</text>
						<rect
							className={concreteClassNames.chartBarTrack}
							height={barHeight}
							rx={barHeight / 2}
							width={plotBox.width}
							x={plotBox.left}
							y={y}
						/>
						{group.segments.map(segment => {
							const segmentWidth = Math.max((segment.value / denominator) * plotBox.width, 1)
							const x = cursorX
							cursorX += segmentWidth

							return (
								<rect
									className={cn(concreteClassNames.chartStackSegment, getDataToneClass(segment.tone))}
									height={barHeight}
									key={segment.label}
									rx={barHeight / 2}
									width={segmentWidth}
									x={x}
									y={y}
								/>
							)
						})}
						{options.showValues ? (
							<text className={concreteClassNames.chartValueLabel} x={plotBox.right + 9} y={y + barHeight}>
								{formatChartValue(total)}
							</text>
						) : null}
					</g>
				)
			})}
		</svg>
	)
}
