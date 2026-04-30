import type { ReactNode } from 'react'
import {
	ChartBarTrack,
	ChartMessage,
	ChartPlotBackground,
	ChartRowLabel,
	ChartStackSegment,
	ChartSvg,
	ChartValueLabel
} from '../primitives'
import type { DataPoint, stackedBarChartSchema } from '../schemas'
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
		return <ChartMessage>No data</ChartMessage>
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
		<ChartSvg title="Stacked bar chart" viewBox={`0 0 ${width} ${height}`}>
			{renderCartesianGrid(plotBox, extent, xLabels, options)}
			{groups.map((group, groupIndex) => {
				const total = getStackedTotal(group)
				const denominator = normalized ? total || 1 : maximumTotal
				const x = plotBox.left + groupIndex * slotWidth + (slotWidth - columnWidth) / 2
				let cursorY = plotBox.bottom

				return (
					<g key={group.label}>
						<ChartBarTrack height={plotBox.height} rx="4" width={columnWidth} x={x} y={plotBox.top} />
						{group.segments.map(segment => {
							const segmentHeight = Math.max((segment.value / denominator) * plotBox.height, 1)
							cursorY -= segmentHeight

							return (
								<ChartStackSegment
									className={getDataToneClass(segment.tone)}
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
							<ChartValueLabel textAnchor="middle" x={x + columnWidth / 2} y={plotBox.top - 7}>
								{formatChartValue(total)}
							</ChartValueLabel>
						) : null}
					</g>
				)
			})}
		</ChartSvg>
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
		<ChartSvg title="Stacked rail chart" viewBox={`0 0 ${width} ${height}`}>
			<ChartPlotBackground
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
						<ChartRowLabel textAnchor="end" x={plotBox.left - 10} y={y + barHeight}>
							{group.label}
						</ChartRowLabel>
						<ChartBarTrack
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
								<ChartStackSegment
									className={getDataToneClass(segment.tone)}
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
							<ChartValueLabel x={plotBox.right + 9} y={y + barHeight}>
								{formatChartValue(total)}
							</ChartValueLabel>
						) : null}
					</g>
				)
			})}
		</ChartSvg>
	)
}
