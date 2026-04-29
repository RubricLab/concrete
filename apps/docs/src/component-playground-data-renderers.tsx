'use client'

import {
	AreaChart,
	BarChart,
	DiagramCanvas,
	DonutChart,
	Heatmap,
	LineChart,
	Meter,
	MetricCard,
	renderComponentExample,
	StackedBarChart
} from '@rubriclab/concrete'
import type { ReactNode } from 'react'
import { getQueryBoolean, getQueryNumber, getQueryValue } from '@/playground-controls'
import {
	playgroundChartPoints,
	playgroundChartSeries,
	playgroundComparisonPoints,
	playgroundDiagramGraph,
	playgroundHeatmapCells,
	playgroundStackedGroups
} from './component-playground-fixtures'
import { DataGridStage, DataWideStage } from './component-playground-stages'

export function renderMetricCardPlayground(searchParams: URLSearchParams): ReactNode {
	const fixture = getQueryValue(searchParams, 'fixture', 'default')
	const intent = getQueryValue(searchParams, 'intent', 'positive') as
		| 'negative'
		| 'neutral'
		| 'positive'

	return (
		<DataGridStage>
			<MetricCard
				compact={fixture === 'compact'}
				delta={{
					basis: 'vs last week',
					intent,
					value: getQueryValue(searchParams, 'delta', '+18.6%')
				}}
				description={
					fixture === 'compact' ? undefined : 'Accepted agent runs across production workspaces.'
				}
				label={getQueryValue(searchParams, 'label', 'Agent runs')}
				status={fixture === 'status' ? { label: 'Live', tone: 'terminal' } : undefined}
				trend={[42, 48, 45, 53, 58, 57, 64, 72, 76, 83]}
				value={getQueryValue(searchParams, 'value', '14,842')}
			/>
		</DataGridStage>
	)
}

export function renderMeterPlayground(searchParams: URLSearchParams): ReactNode {
	const value = getQueryNumber(searchParams, 'value', 72)

	return (
		<DataGridStage>
			<Meter
				compact={getQueryBoolean(searchParams, 'compact', false)}
				description="Workspace command budget"
				label={getQueryValue(searchParams, 'label', 'Usage')}
				target={80}
				tone={getQueryValue(searchParams, 'tone', 'sky') as 'error' | 'sky' | 'terminal' | 'ultra'}
				value={{ max: 100, min: 0, value }}
				variant={getQueryValue(searchParams, 'variant', 'bar') as 'bar' | 'ring'}
			/>
		</DataGridStage>
	)
}

export function renderLineChartPlayground(searchParams: URLSearchParams): ReactNode {
	const showAxis = getQueryBoolean(searchParams, 'showAxis', true)

	return (
		<DataWideStage>
			<LineChart
				description="Agent run volume with accepted output overlay."
				series={playgroundChartSeries}
				showDots={getQueryBoolean(searchParams, 'showDots', false)}
				showEndLabels={getQueryBoolean(searchParams, 'showEndLabels', true)}
				showGrid={getQueryBoolean(searchParams, 'showGrid', true)}
				showXAxis={showAxis}
				showYAxis={showAxis}
				surface={getChartSurface(searchParams)}
				target={58}
				title="Agent runs"
			/>
		</DataWideStage>
	)
}

export function renderAreaChartPlayground(searchParams: URLSearchParams): ReactNode {
	const showAxis = getQueryBoolean(searchParams, 'showAxis', true)

	return (
		<DataWideStage>
			<AreaChart
				description="Accepted runs and total executions."
				series={playgroundChartSeries}
				showDots={getQueryBoolean(searchParams, 'showDots', false)}
				showEndLabels={getQueryBoolean(searchParams, 'showEndLabels', true)}
				showGrid={getQueryBoolean(searchParams, 'showGrid', true)}
				showXAxis={showAxis}
				showYAxis={showAxis}
				surface={getChartSurface(searchParams)}
				target={58}
				title="Execution trend"
			/>
		</DataWideStage>
	)
}

export function renderBarChartPlayground(searchParams: URLSearchParams): ReactNode {
	return (
		<DataWideStage>
			<BarChart
				comparisonPoints={
					getQueryBoolean(searchParams, 'comparison', true) ? playgroundComparisonPoints : []
				}
				orientation={getChartOrientation(searchParams)}
				points={playgroundChartPoints}
				showGrid={getQueryBoolean(searchParams, 'showGrid', true)}
				showValues={getQueryBoolean(searchParams, 'showValues', true)}
				surface={getChartSurface(searchParams)}
				title="Capability score"
			/>
		</DataWideStage>
	)
}

export function renderStackedBarChartPlayground(searchParams: URLSearchParams): ReactNode {
	return (
		<DataWideStage>
			<StackedBarChart
				groups={playgroundStackedGroups}
				normalized={getQueryBoolean(searchParams, 'normalized', false)}
				orientation={getChartOrientation(searchParams)}
				showValues={getQueryBoolean(searchParams, 'showValues', true)}
				surface={getChartSurface(searchParams)}
				title="Run composition"
			/>
		</DataWideStage>
	)
}

export function renderDonutChartPlayground(searchParams: URLSearchParams): ReactNode {
	return (
		<DataWideStage>
			<DonutChart
				centerLabel="64%"
				segments={playgroundChartPoints.slice(0, 4)}
				showCenterLabel={getQueryBoolean(searchParams, 'showCenterLabel', true)}
				surface={getChartSurface(searchParams)}
				thickness={getChartThickness(searchParams)}
				title="Workload split"
			/>
		</DataWideStage>
	)
}

export function renderHeatmapPlayground(searchParams: URLSearchParams): ReactNode {
	return (
		<DataWideStage>
			<Heatmap
				cells={playgroundHeatmapCells}
				showValues={getQueryBoolean(searchParams, 'showValues', true)}
				surface={getChartSurface(searchParams)}
				title="Run intensity"
			/>
		</DataWideStage>
	)
}

function getChartSurface(searchParams: URLSearchParams): 'raised' | 'sunken' | 'transparent' {
	const surface = getQueryValue(searchParams, 'surface', 'raised')

	switch (surface) {
		case 'sunken':
		case 'transparent':
			return surface
		default:
			return 'raised'
	}
}

function getChartOrientation(searchParams: URLSearchParams): 'horizontal' | 'vertical' {
	const orientation = getQueryValue(searchParams, 'orientation', 'vertical')

	switch (orientation) {
		case 'horizontal':
			return 'horizontal'
		default:
			return 'vertical'
	}
}

function getChartThickness(searchParams: URLSearchParams): 'medium' | 'thick' | 'thin' {
	const thickness = getQueryValue(searchParams, 'thickness', 'medium')

	switch (thickness) {
		case 'thin':
		case 'thick':
			return thickness
		default:
			return 'medium'
	}
}

export function renderChartPlayground(searchParams: URLSearchParams, state: string): ReactNode {
	const variant = getQueryValue(searchParams, 'variant', 'line')

	return (
		<DataWideStage>
			{renderComponentExample('chart', state === 'default' ? variant : state)}
		</DataWideStage>
	)
}

export function renderDataTablePlayground(searchParams: URLSearchParams, state: string): ReactNode {
	const fixture = getQueryValue(searchParams, 'fixture', 'default')

	return (
		<DataWideStage>
			{renderComponentExample('data-table', state === 'default' ? fixture : state)}
		</DataWideStage>
	)
}

export function renderFlowDiagramPlayground(
	searchParams: URLSearchParams,
	state: string
): ReactNode {
	const fixture = getQueryValue(searchParams, 'fixture', 'default')

	return (
		<DataWideStage>
			{renderComponentExample('flow-diagram', state === 'default' ? fixture : state)}
		</DataWideStage>
	)
}

export function renderDiagramCanvasPlayground(
	searchParams: URLSearchParams,
	state: string
): ReactNode {
	const fixture = getQueryValue(searchParams, 'fixture', 'default')
	const activeState = state === 'default' ? fixture : state

	if (activeState === 'compact') {
		return (
			<DataWideStage>
				<DiagramCanvas
					controls={getQueryBoolean(searchParams, 'controls', false)}
					graph={{
						edges: playgroundDiagramGraph.edges.slice(0, 2),
						items: [],
						nodes: playgroundDiagramGraph.nodes.slice(0, 3)
					}}
					height={260}
					minimap={getQueryBoolean(searchParams, 'minimap', false)}
					title="Compact concept flow"
					width={720}
				/>
			</DataWideStage>
		)
	}

	return (
		<DataWideStage>
			<DiagramCanvas
				controls={getQueryBoolean(searchParams, 'controls', true)}
				description="Editable local diagram state for educational and editorial explainers."
				graph={playgroundDiagramGraph}
				minimap={getQueryBoolean(searchParams, 'minimap', activeState === 'interactive')}
				selectedId={
					activeState === 'selected' ? 'model' : activeState === 'interactive' ? 'synthesize' : undefined
				}
				title="Request flow"
				width={820}
			/>
		</DataWideStage>
	)
}
