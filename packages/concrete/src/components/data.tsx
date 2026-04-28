'use client'

import type { ChangeEvent, CSSProperties, PointerEvent, ReactNode } from 'react'
import { Fragment, useId, useMemo, useState } from 'react'
import { ConcreteIcon } from '../icons'
import { Card, Delta, Indicator, Progress, ProgressRing, Sparkline, Stat } from '../primitives'
import { cn } from '../primitives/utils'
import {
	type AreaChartProps,
	areaChartSchema,
	type BarChartProps,
	barChartSchema,
	type ChartProps,
	chartSchema,
	type DataPoint,
	type DataTableProps,
	type DataTableRow,
	type DataTableSort,
	type DataTableToolbarAction,
	type DataTone,
	type DonutChartProps,
	dataTableSchema,
	donutChartSchema,
	type FlowDiagramEdge,
	type FlowDiagramNode,
	type FlowDiagramProps,
	flowDiagramPropsSchema,
	type HeatmapProps,
	heatmapChartSchema,
	type LineChartProps,
	lineChartSchema,
	type MeterProps,
	type MetricCardProps,
	meterSchema,
	metricCardSchema,
	type StackedBarChartProps,
	stackedBarChartSchema
} from '../schemas'
import classes from './components.module.css'
import {
	clamp,
	createChartTicks,
	createDonutSegments,
	createLinearScale,
	createSmoothAreaPath,
	createSmoothPath,
	formatPercent,
	getNumericExtent,
	normalizeRangeValue,
	routeDiagramEdge,
	sortDataTableRows
} from './data-geometry'

type ComponentShellProps = {
	className?: string
}

export function MetricCard({ className, ...props }: MetricCardProps & ComponentShellProps) {
	const parsedProps = metricCardSchema.parse(props)
	const trendTone = parsedProps.trendTone ?? getMetricTrendTone(parsedProps.delta?.intent)

	return (
		<Card
			className={cn(classes.metricCard, parsedProps.compact && classes.metricCardCompact, className)}
			variant="raised"
		>
			<div className={classes.metricHeader}>
				<span className={classes.metricLabel}>{parsedProps.label}</span>
				{parsedProps.status ? (
					<Indicator tone={toIndicatorTone(parsedProps.status.tone)}>
						{parsedProps.status.label}
					</Indicator>
				) : null}
			</div>
			<Stat
				delta={
					parsedProps.delta ? (
						<Delta
							basis={parsedProps.delta.basis}
							intent={parsedProps.delta.intent}
							size="small"
							value={parsedProps.delta.value}
						/>
					) : undefined
				}
				size={parsedProps.compact ? 'large' : 'xlarge'}
				unit={parsedProps.unit}
				value={parsedProps.value}
				variant="lockup"
			/>
			{parsedProps.trend.length > 0 ? (
				<Sparkline
					area
					className={classes.metricSparkline}
					showEndpoint={false}
					tone={toSparklineTone(trendTone)}
					values={parsedProps.trend}
				/>
			) : null}
			{parsedProps.description ? (
				<p className={classes.metricDescription}>{parsedProps.description}</p>
			) : null}
		</Card>
	)
}

export function Meter({ className, ...props }: MeterProps & ComponentShellProps) {
	const parsedProps = meterSchema.parse(props)
	const normalizedValue = normalizeRangeValue(
		parsedProps.value.value,
		parsedProps.value.min,
		parsedProps.value.max
	)
	const percent = Math.round(normalizedValue * 100)
	const formattedValue =
		parsedProps.unit === '%' ? `${percent}%` : `${parsedProps.value.value}${parsedProps.unit}`

	return (
		<Card
			className={cn(
				classes.meterCard,
				parsedProps.variant === 'ring' && classes.meterRingCard,
				className
			)}
			variant="raised"
		>
			<header className={classes.meterHeader}>
				<span>{parsedProps.label}</span>
				<b>{formattedValue}</b>
			</header>
			{parsedProps.variant === 'ring' ? (
				<ProgressRing
					size={parsedProps.compact ? 70 : 88}
					strokeWidth={parsedProps.compact ? 6 : 7}
					tone={toProgressTone(parsedProps.tone)}
					value={percent}
				/>
			) : (
				<Progress
					size={parsedProps.compact ? 'thin' : 'medium'}
					tone={toProgressTone(parsedProps.tone)}
					value={percent}
				/>
			)}
			{parsedProps.description || parsedProps.target !== undefined ? (
				<footer className={classes.meterFooter}>
					{parsedProps.target !== undefined ? <span>Target {parsedProps.target}</span> : null}
					{parsedProps.description ? <span>{parsedProps.description}</span> : null}
				</footer>
			) : null}
		</Card>
	)
}

export function Chart({ className, ...props }: ChartProps & ComponentShellProps) {
	const parsedProps = chartSchema.parse(props)

	return renderParsedChart(parsedProps, className)
}

export function LineChart({ className, ...props }: LineChartProps & ComponentShellProps) {
	const parsedProps = lineChartSchema.parse({ ...props, variant: 'line' })

	return renderParsedChart(parsedProps, className)
}

export function AreaChart({ className, ...props }: AreaChartProps & ComponentShellProps) {
	const parsedProps = areaChartSchema.parse({ ...props, variant: 'area' })

	return renderParsedChart(parsedProps, className)
}

export function BarChart({ className, ...props }: BarChartProps & ComponentShellProps) {
	const parsedProps = barChartSchema.parse({ ...props, variant: 'bar' })

	return renderParsedChart(parsedProps, className)
}

export function StackedBarChart({
	className,
	...props
}: StackedBarChartProps & ComponentShellProps) {
	const parsedProps = stackedBarChartSchema.parse({ ...props, variant: 'stacked-bar' })

	return renderParsedChart(parsedProps, className)
}

export function DonutChart({ className, ...props }: DonutChartProps & ComponentShellProps) {
	const parsedProps = donutChartSchema.parse({ ...props, variant: 'donut' })

	return renderParsedChart(parsedProps, className)
}

export function Heatmap({ className, ...props }: HeatmapProps & ComponentShellProps) {
	const parsedProps = heatmapChartSchema.parse({ ...props, variant: 'heatmap' })

	return renderParsedChart(parsedProps, className)
}

function renderParsedChart(
	parsedProps: ReturnType<typeof chartSchema.parse>,
	className: string | undefined
): ReactNode {
	const legendItems = getChartLegendItems(parsedProps)

	return (
		<Card className={cn(classes.chartCard, className)} variant="raised">
			{parsedProps.showHeader ? (
				<header className={classes.dataCardHeader}>
					<div>
						<h3>{parsedProps.title}</h3>
						{parsedProps.description ? <p>{parsedProps.description}</p> : null}
					</div>
					<Indicator tone={getChartStateTone(parsedProps.state)}>{parsedProps.state}</Indicator>
				</header>
			) : null}
			<div
				className={classes.chartSurface}
				data-surface={parsedProps.surface}
				data-variant={parsedProps.variant}
				style={{ '--chart-height': `${parsedProps.height}px` } as CSSProperties}
			>
				{renderChartBody(parsedProps)}
			</div>
			{parsedProps.legend && legendItems.length > 0 ? (
				<div className={classes.chartLegend}>
					{legendItems.map(item => (
						<Indicator key={item.label} tone={toIndicatorTone(item.tone)}>
							{item.label}
							{item.value === undefined ? null : <span>{item.value}</span>}
						</Indicator>
					))}
				</div>
			) : null}
		</Card>
	)
}

export function DataTable<Row extends DataTableRow>({
	className,
	getRowId,
	onFilterChange,
	onPageChange,
	onRowSelectionChange,
	onSearchChange,
	onSortChange,
	onToolbarAction,
	...props
}: DataTableProps<Row> & ComponentShellProps) {
	const [internalSearchValue, setInternalSearchValue] = useState(props.searchValue ?? '')
	const [internalSelectedRowIds, setInternalSelectedRowIds] = useState<readonly string[]>(
		props.selectedRowIds ?? []
	)
	const [internalFilterValues, setInternalFilterValues] = useState<Record<string, string>>(() =>
		Object.fromEntries(
			(props.filters ?? []).flatMap(filter => (filter.value ? [[filter.id, filter.value]] : []))
		)
	)
	const [internalPage, setInternalPage] = useState(props.pagination?.page ?? 1)
	const activeFilters = (props.filters ?? []).map(filter => ({
		...filter,
		value: filter.value ?? internalFilterValues[filter.id]
	}))
	const parsedProps = dataTableSchema.parse({
		...props,
		columns: [...props.columns],
		filters: activeFilters,
		pagination: props.pagination
			? { ...props.pagination, page: props.pagination.page ?? internalPage }
			: undefined,
		rows: [...props.rows],
		searchValue: props.searchValue ?? internalSearchValue,
		selectedRowIds: props.selectedRowIds ?? [...internalSelectedRowIds]
	})
	const [internalSort, setInternalSort] = useState<DataTableSort | null>(parsedProps.sort ?? null)
	const activeSort = parsedProps.sort ?? internalSort
	const rows = useMemo(() => {
		const filteredRows = filterDataTableRows(props.rows, parsedProps.searchValue, parsedProps.filters)

		if (!activeSort) {
			return filteredRows
		}

		return sortDataTableRows(filteredRows, activeSort.key, activeSort.direction)
	}, [activeSort, parsedProps.filters, parsedProps.searchValue, props.rows])
	const selectedRowIds = parsedProps.selectedRowIds
	const pagination = parsedProps.pagination
	const totalRows = pagination?.totalRows ?? rows.length
	const pageCount = pagination ? Math.max(Math.ceil(totalRows / pagination.pageSize), 1) : 1
	const visibleRows = pagination
		? rows.slice((pagination.page - 1) * pagination.pageSize, pagination.page * pagination.pageSize)
		: rows

	function updateSort(column: (typeof parsedProps.columns)[number]) {
		if (!column.sortable) {
			return
		}

		const nextSort = getNextSort(activeSort, column.key)
		setInternalSort(nextSort)
		onSortChange?.(nextSort)
	}

	function toggleRow(row: Row, rowIndex: number) {
		const rowId = getResolvedRowId(row, rowIndex, getRowId)
		const nextSelection = selectedRowIds.includes(rowId)
			? selectedRowIds.filter(id => id !== rowId)
			: [...selectedRowIds, rowId]

		if (props.selectedRowIds === undefined) {
			setInternalSelectedRowIds(nextSelection)
		}

		onRowSelectionChange?.(nextSelection)
	}

	function updateSearch(value: string) {
		if (props.searchValue === undefined) {
			setInternalSearchValue(value)
		}

		if (props.pagination?.page === undefined) {
			setInternalPage(1)
		}

		onSearchChange?.(value)
	}

	function updateFilter(filterId: string, value: string) {
		setInternalFilterValues(currentValues => ({
			...currentValues,
			[filterId]: value
		}))
		if (props.pagination?.page === undefined) {
			setInternalPage(1)
		}
		onFilterChange?.(filterId, value)
	}

	function updatePage(page: number, pageSize: number) {
		if (props.pagination?.page === undefined) {
			setInternalPage(page)
		}

		onPageChange?.(page, pageSize)
	}

	return (
		<Card className={cn(classes.dataTableCard, className)} variant="raised">
			<header className={classes.dataTableHeader}>
				<div>
					{parsedProps.title ? <h3>{parsedProps.title}</h3> : null}
					{parsedProps.caption ? <p>{parsedProps.caption}</p> : null}
				</div>
				<div className={classes.dataTableToolbar}>
					{parsedProps.searchPlaceholder ? (
						<label className={classes.dataTableSearch}>
							<ConcreteIcon name="search" />
							<input
								onChange={(event: ChangeEvent<HTMLInputElement>) => updateSearch(event.currentTarget.value)}
								placeholder={parsedProps.searchPlaceholder}
								value={parsedProps.searchValue}
							/>
						</label>
					) : null}
					{parsedProps.filters.map(filter => (
						<label className={classes.dataTableFilter} key={filter.id}>
							<span>{filter.label}</span>
							<select
								onChange={(event: ChangeEvent<HTMLSelectElement>) =>
									updateFilter(filter.id, event.currentTarget.value)
								}
								value={filter.value ?? ''}
							>
								<option value="">All</option>
								{filter.options.map(option => (
									<option key={option.value} value={option.value}>
										{option.label}
										{option.count === undefined ? '' : ` (${option.count})`}
									</option>
								))}
							</select>
						</label>
					))}
					{parsedProps.toolbarActions.map(action =>
						renderTableToolbarAction(action, selectedRowIds, onToolbarAction)
					)}
				</div>
			</header>
			<div className={classes.dataTableScroll} style={getTableScrollStyle(parsedProps.maxHeight)}>
				<table className={classes.dataTable}>
					<thead>
						<tr>
							{parsedProps.selectable ? <th className={classes.dataTableSelectionCell} /> : null}
							{parsedProps.columns.map(column => (
								<th
									aria-sort={activeSort?.key === column.key ? activeSort.direction : undefined}
									className={cn(
										column.align === 'right' && classes.dataTableAlignRight,
										column.align === 'center' && classes.dataTableAlignCenter,
										column.frozen && classes.dataTableFrozen
									)}
									key={column.key}
									style={{ width: column.width }}
								>
									<button
										className={classes.dataTableSort}
										disabled={!column.sortable}
										onClick={() => updateSort(column)}
										type="button"
									>
										{column.header}
										{column.sortable ? <SortGlyph activeSort={activeSort} columnKey={column.key} /> : null}
									</button>
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{visibleRows.length === 0 ? (
							<tr>
								<td colSpan={parsedProps.columns.length + (parsedProps.selectable ? 1 : 0)}>
									<div className={classes.dataTableEmpty}>{parsedProps.emptyLabel}</div>
								</td>
							</tr>
						) : (
							visibleRows.map(row => {
								const rowIndex = Math.max(rows.indexOf(row), 0)
								const rowId = getResolvedRowId(row, rowIndex, getRowId)
								const selected = selectedRowIds.includes(rowId)

								return (
									<tr data-selected={selected ? true : undefined} key={rowId}>
										{parsedProps.selectable ? (
											<td className={classes.dataTableSelectionCell}>
												<input
													aria-label={`Select row ${rowId}`}
													checked={selected}
													onChange={() => toggleRow(row, rowIndex)}
													type="checkbox"
												/>
											</td>
										) : null}
										{parsedProps.columns.map(column => (
											<td
												className={cn(
													column.align === 'right' && classes.dataTableAlignRight,
													column.align === 'center' && classes.dataTableAlignCenter,
													column.frozen && classes.dataTableFrozen
												)}
												key={column.key}
												style={{ width: column.width }}
											>
												{renderTableCell(row[column.key])}
											</td>
										))}
									</tr>
								)
							})
						)}
					</tbody>
				</table>
			</div>
			{pagination ? (
				<footer className={classes.dataTablePagination}>
					<button
						disabled={pagination.page <= 1}
						onClick={() => updatePage(pagination.page - 1, pagination.pageSize)}
						type="button"
					>
						<ConcreteIcon name="chevron-left" />
					</button>
					<span>
						Page {pagination.page} / {pageCount}
					</span>
					<span>{selectedRowIds.length} selected</span>
					<button
						disabled={pagination.page >= pageCount}
						onClick={() => updatePage(pagination.page + 1, pagination.pageSize)}
						type="button"
					>
						<ConcreteIcon name="chevron-right" />
					</button>
				</footer>
			) : null}
		</Card>
	)
}

export function FlowDiagram({
	className,
	onNodeMove,
	onNodeSelect,
	onViewportChange,
	...props
}: FlowDiagramProps & ComponentShellProps) {
	const parsedProps = flowDiagramPropsSchema.parse(props)
	const gridId = `concrete-diagram-grid-${useId().replace(/:/g, '')}`
	const [zoom, setZoom] = useState(1)
	const [pan, setPan] = useState({ x: 0, y: 0 })
	const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>({})
	const nodes = parsedProps.flow.nodes.map(node => ({
		...node,
		...(positions[node.id] ?? {})
	}))
	const nodeMap = new Map(nodes.map(node => [node.id, node]))
	const viewBox = `${pan.x} ${pan.y} ${parsedProps.width / zoom} ${parsedProps.height / zoom}`

	function moveNode(node: FlowDiagramNode, event: PointerEvent<SVGGElement>) {
		if (!parsedProps.draggableNodes) {
			return
		}

		const nextPosition = {
			x: Math.round(node.x + event.movementX / zoom),
			y: Math.round(node.y + event.movementY / zoom)
		}

		setPositions(currentPositions => ({
			...currentPositions,
			[node.id]: nextPosition
		}))
		onNodeMove?.(node.id, nextPosition)
	}

	function updateZoom(nextZoom: number) {
		const clampedZoom = clamp(nextZoom, 0.75, 1.5)
		setZoom(clampedZoom)
		onViewportChange?.({ ...pan, zoom: clampedZoom })
	}

	return (
		<Card className={cn(classes.flowDiagramCard, className)} variant="raised">
			<header className={classes.dataCardHeader}>
				<div>
					<h3>{parsedProps.title}</h3>
					{parsedProps.description ? <p>{parsedProps.description}</p> : null}
				</div>
				{parsedProps.controls ? (
					<div className={classes.flowDiagramControls}>
						<button onClick={() => updateZoom(zoom - 0.1)} type="button">
							-
						</button>
						<button
							onClick={() => {
								setPan({ x: 0, y: 0 })
								updateZoom(1)
							}}
							type="button"
						>
							1x
						</button>
						<button onClick={() => updateZoom(zoom + 0.1)} type="button">
							+
						</button>
					</div>
				) : null}
			</header>
			<div className={classes.flowDiagramViewport}>
				<svg
					aria-label={parsedProps.title}
					className={classes.flowDiagramCanvas}
					role="img"
					style={{ '--diagram-height': `${parsedProps.height}px` } as CSSProperties}
					viewBox={viewBox}
				>
					<defs>
						<pattern height="18" id={gridId} patternUnits="userSpaceOnUse" width="18">
							<path d="M 18 0 L 0 0 0 18" fill="none" />
						</pattern>
					</defs>
					<rect
						className={classes.flowDiagramGrid}
						height="100%"
						style={{ fill: `url(#${gridId})` }}
						width="100%"
						x={pan.x}
						y={pan.y}
					/>
					{parsedProps.flow.edges.map(edge => {
						const fromNode = nodeMap.get(edge.from)
						const toNode = nodeMap.get(edge.to)

						if (!fromNode || !toNode) {
							return null
						}

						const route = routeDiagramEdge(fromNode, toNode, edge)
						const selected = edge.selected || parsedProps.selectedEdgeId === edge.id

						return (
							<g
								className={cn(
									classes.flowDiagramEdge,
									selected && classes.flowDiagramEdgeSelected,
									getFlowEdgeVariantClass(edge.variant),
									getDataToneClass(edge.tone)
								)}
								key={edge.id}
							>
								<path d={route.path} />
								{edge.label ? (
									<text x={route.label.x} y={route.label.y - 6}>
										{edge.label}
									</text>
								) : null}
							</g>
						)
					})}
					{nodes.map(node => {
						const selected = node.selected || parsedProps.selectedNodeId === node.id

						return (
							// biome-ignore lint/a11y/noStaticElementInteractions: SVG nodes expose canvas hit areas.
							<g
								className={cn(
									classes.flowDiagramNode,
									selected && classes.flowDiagramNodeSelected,
									node.tone === 'accent' && classes.flowDiagramNodeAccent,
									node.tone === 'inverse' && classes.flowDiagramNodeInverse
								)}
								key={node.id}
								onClick={() => onNodeSelect?.(node.id)}
								onPointerMove={event => moveNode(node, event)}
							>
								<rect height={node.height} rx="8" width={node.width} x={node.x} y={node.y} />
								<text className={classes.flowDiagramNodeTitle} x={node.x + 14} y={node.y + 27}>
									{node.title}
								</text>
								{node.subtitle ? (
									<text className={classes.flowDiagramNodeSubtitle} x={node.x + 14} y={node.y + 47}>
										{node.subtitle}
									</text>
								) : null}
							</g>
						)
					})}
				</svg>
			</div>
			{parsedProps.legend.length > 0 ? (
				<footer className={classes.chartLegend}>
					{parsedProps.legend.map(item => (
						<Indicator key={item.label} tone={toIndicatorTone(item.tone)}>
							{item.label}
						</Indicator>
					))}
				</footer>
			) : null}
		</Card>
	)
}

function renderChartBody(parsedProps: ReturnType<typeof chartSchema.parse>): ReactNode {
	if (parsedProps.state !== 'ready') {
		return (
			<div className={classes.chartMessage}>
				{parsedProps.message ?? getChartStateMessage(parsedProps.state)}
			</div>
		)
	}

	switch (parsedProps.variant) {
		case 'area':
		case 'line':
			return renderLineChart(parsedProps)
		case 'bar':
			return renderBarChart(
				parsedProps.points,
				parsedProps.comparisonPoints,
				parsedProps.orientation,
				parsedProps.height,
				parsedProps
			)
		case 'donut':
			return renderDonutChart(
				parsedProps.segments,
				parsedProps.centerLabel,
				parsedProps.showCenterLabel,
				parsedProps.thickness
			)
		case 'heatmap':
			return renderHeatmapChart(parsedProps.cells, parsedProps.showValues)
		case 'stacked-bar':
			return renderStackedBarChart(
				parsedProps.groups,
				parsedProps.normalized,
				parsedProps.orientation,
				parsedProps.height,
				parsedProps
			)
	}
}

function renderLineChart(
	parsedProps: Extract<ReturnType<typeof chartSchema.parse>, { variant: 'area' | 'line' }>
): ReactNode {
	const width = 640
	const height = parsedProps.height
	const plotBox = createChartPlotBox(width, height, {
		bottom: 34,
		left: 46,
		right: 18,
		top: 22
	})
	const allValues = parsedProps.series.flatMap(series => series.points.map(point => point.value))
	const extent = getPaddedChartExtent([
		...allValues,
		...(parsedProps.target === undefined ? [] : [parsedProps.target])
	])
	const scaleY = createLinearScale(extent, [plotBox.bottom, plotBox.top])
	const xLabels = createSparseXAxisLabels(parsedProps.series[0]?.points ?? [], plotBox)

	if (allValues.length === 0) {
		return <div className={classes.chartMessage}>No data</div>
	}

	return (
		<svg aria-hidden className={classes.chartSvg} viewBox={`0 0 ${width} ${height}`}>
			<title>Line chart</title>
			{renderCartesianGrid(plotBox, extent, xLabels, parsedProps)}
			{parsedProps.target === undefined ? null : renderTarget(parsedProps.target, extent, plotBox)}
			{parsedProps.series.map(series => {
				const points = createScaledChartPoints(series.points, plotBox, scaleY)
				const endpoint = points.at(-1)

				return (
					<g className={getDataToneClass(series.tone)} key={series.id}>
						{parsedProps.variant === 'area' ? (
							<path className={classes.chartArea} d={createSmoothAreaPath(points, plotBox.bottom)} />
						) : null}
						<path className={classes.chartLine} d={createSmoothPath(points)} />
						{parsedProps.showDots
							? points.map((point, pointIndex) => (
									<circle
										className={classes.chartPoint}
										cx={point.x}
										cy={point.y}
										key={`${series.id}-${point.label}-${pointIndex}`}
										r="2"
									/>
								))
							: null}
						{endpoint ? (
							<circle className={classes.chartEndpoint} cx={endpoint.x} cy={endpoint.y} r="3" />
						) : null}
						{endpoint && parsedProps.showEndLabels ? (
							<text
								className={classes.chartEndLabel}
								textAnchor="end"
								x={plotBox.right}
								y={clamp(endpoint.y - 8, plotBox.top + 4, plotBox.bottom - 4)}
							>
								{formatChartValue(endpoint.value)}
							</text>
						) : null}
					</g>
				)
			})}
		</svg>
	)
}

function renderBarChart(
	points: readonly DataPoint[],
	comparisonPoints: readonly DataPoint[],
	orientation: 'horizontal' | 'vertical',
	height: number,
	options: Pick<
		ReturnType<typeof barChartSchema.parse>,
		'baseline' | 'showGrid' | 'showValues' | 'showXAxis' | 'showYAxis'
	>
): ReactNode {
	const width = 640

	if (points.length === 0) {
		return <div className={classes.chartMessage}>No data</div>
	}

	if (orientation === 'horizontal') {
		return renderHorizontalBarChart(points, width, height, options)
	}

	const plotBox = createChartPlotBox(width, height, {
		bottom: 34,
		left: 46,
		right: 18,
		top: 22
	})
	const extent = getPaddedChartExtent(
		[...points, ...comparisonPoints].map(point => point.value),
		options.baseline
	)
	const scaleY = createLinearScale(extent, [plotBox.bottom, plotBox.top])
	const zero = scaleY(options.baseline)
	const slotWidth = plotBox.width / Math.max(points.length, 1)
	const barWidth = Math.max(slotWidth * (comparisonPoints.length > 0 ? 0.26 : 0.42), 4)
	const comparisonWidth = Math.max(slotWidth * 0.5, 6)
	const xLabels = points.map((point, pointIndex) => ({
		label: point.label,
		x: plotBox.left + pointIndex * slotWidth + slotWidth / 2
	}))

	return (
		<svg aria-hidden className={classes.chartSvg} viewBox={`0 0 ${width} ${height}`}>
			<title>Bar chart</title>
			{renderCartesianGrid(plotBox, extent, xLabels, options)}
			<line
				className={classes.chartBaseline}
				x1={plotBox.left}
				x2={plotBox.right}
				y1={zero}
				y2={zero}
			/>
			{comparisonPoints.map((point, pointIndex) => {
				const x = plotBox.left + pointIndex * slotWidth + (slotWidth - comparisonWidth) / 2
				const rect = createChartBarRectangle(point.value, x, comparisonWidth, scaleY, zero)

				return (
					<rect
						className={classes.chartBarComparison}
						height={rect.height}
						key={`comparison-${point.label}`}
						rx="3"
						width={rect.width}
						x={rect.x}
						y={rect.y}
					/>
				)
			})}
			{points.map((point, pointIndex) => {
				const x = plotBox.left + pointIndex * slotWidth + (slotWidth - barWidth) / 2
				const rect = createChartBarRectangle(point.value, x, barWidth, scaleY, zero)

				return (
					<g className={getDataToneClass(point.tone)} key={point.label}>
						<rect
							className={classes.chartBar}
							height={rect.height}
							rx="3"
							width={rect.width}
							x={rect.x}
							y={rect.y}
						/>
						{options.showValues ? (
							<text
								className={classes.chartValueLabel}
								textAnchor="middle"
								x={x + barWidth / 2}
								y={rect.y - 7}
							>
								{formatChartValue(point.value)}
							</text>
						) : null}
					</g>
				)
			})}
		</svg>
	)
}

function renderHorizontalBarChart(
	points: readonly DataPoint[],
	width: number,
	height: number,
	options: Pick<ReturnType<typeof barChartSchema.parse>, 'showValues'>
): ReactNode {
	const plotBox = createChartPlotBox(width, height, {
		bottom: 20,
		left: 98,
		right: 54,
		top: 20
	})
	const extent = getPaddedChartExtent(
		points.map(point => point.value),
		0
	)
	const scaleX = createLinearScale([0, extent[1]], [plotBox.left, plotBox.right])
	const rowStep = plotBox.height / Math.max(points.length, 1)
	const barHeight = Math.min(12, Math.max(rowStep * 0.36, 7))

	return (
		<svg aria-hidden className={classes.chartSvg} viewBox={`0 0 ${width} ${height}`}>
			<title>Horizontal bar chart</title>
			<rect
				className={classes.chartPlotBackground}
				height={plotBox.height}
				rx="8"
				width={plotBox.width}
				x={plotBox.left}
				y={plotBox.top}
			/>
			{points.map((point, pointIndex) => {
				const y = plotBox.top + pointIndex * rowStep + (rowStep - barHeight) / 2
				const barWidth = Math.max(scaleX(point.value) - plotBox.left, 1)

				return (
					<g className={getDataToneClass(point.tone)} key={point.label}>
						<text
							className={classes.chartRowLabel}
							textAnchor="end"
							x={plotBox.left - 10}
							y={y + barHeight}
						>
							{point.label}
						</text>
						<rect
							className={classes.chartBarTrack}
							height={barHeight}
							rx={barHeight / 2}
							width={plotBox.width}
							x={plotBox.left}
							y={y}
						/>
						<rect
							className={classes.chartBar}
							height={barHeight}
							rx={barHeight / 2}
							width={barWidth}
							x={plotBox.left}
							y={y}
						/>
						{options.showValues ? (
							<text className={classes.chartValueLabel} x={plotBox.right + 9} y={y + barHeight}>
								{formatChartValue(point.value)}
							</text>
						) : null}
					</g>
				)
			})}
		</svg>
	)
}

function renderStackedBarChart(
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
		return <div className={classes.chartMessage}>No data</div>
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
		<svg aria-hidden className={classes.chartSvg} viewBox={`0 0 ${width} ${height}`}>
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
							className={classes.chartBarTrack}
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
									className={cn(classes.chartStackSegment, getDataToneClass(segment.tone))}
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
								className={classes.chartValueLabel}
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
		<svg aria-hidden className={classes.chartSvg} viewBox={`0 0 ${width} ${height}`}>
			<title>Stacked rail chart</title>
			<rect
				className={classes.chartPlotBackground}
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
							className={classes.chartRowLabel}
							textAnchor="end"
							x={plotBox.left - 10}
							y={y + barHeight}
						>
							{group.label}
						</text>
						<rect
							className={classes.chartBarTrack}
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
									className={cn(classes.chartStackSegment, getDataToneClass(segment.tone))}
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
							<text className={classes.chartValueLabel} x={plotBox.right + 9} y={y + barHeight}>
								{formatChartValue(total)}
							</text>
						) : null}
					</g>
				)
			})}
		</svg>
	)
}

function renderDonutChart(
	segments: readonly DataPoint[],
	centerLabel: string | undefined,
	showCenterLabel: boolean,
	thickness: 'medium' | 'thick' | 'thin'
): ReactNode {
	const renderedSegments = createDonutSegments(segments)

	if (renderedSegments.length === 0) {
		return <div className={classes.chartMessage}>No data</div>
	}

	return (
		<div
			className={classes.donutChart}
			data-thickness={thickness}
			style={{ '--donut-stroke-width': `${getDonutStrokeWidth(thickness)}px` } as CSSProperties}
		>
			<svg aria-hidden viewBox="0 0 120 120">
				<title>Donut chart</title>
				<circle className={classes.donutTrack} cx="60" cy="60" r="42" />
				{renderedSegments.map((segment, index) => (
					<circle
						className={cn(classes.donutSegment, getDataToneClass(segments[index]?.tone))}
						cx="60"
						cy="60"
						key={segment.label}
						pathLength="100"
						r="42"
						strokeDasharray={segment.dashArray}
						strokeDashoffset={segment.dashOffset}
					/>
				))}
			</svg>
			{showCenterLabel ? (
				<div className={classes.donutCenter}>
					<b>{centerLabel ?? formatPercent(renderedSegments[0]?.percent ?? 0)}</b>
					<span>{segments[0]?.label ?? 'Total'}</span>
				</div>
			) : null}
		</div>
	)
}

function renderHeatmapChart(
	cells: readonly { label?: string | undefined; value: number; x: string; y: string }[],
	showValues: boolean
): ReactNode {
	const xLabels = [...new Set(cells.map(cell => cell.x))]
	const yLabels = [...new Set(cells.map(cell => cell.y))]
	const maximum = Math.max(...cells.map(cell => cell.value), 1)

	return (
		<div
			className={classes.heatmapChart}
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
								className={classes.heatmapCell}
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

type ChartPlotBox = {
	bottom: number
	height: number
	left: number
	right: number
	top: number
	width: number
}

type ChartPlotPadding = {
	bottom: number
	left: number
	right: number
	top: number
}

type ChartAxisLabel = {
	label: string
	x: number
}

type ScaledChartPoint = DataPoint & {
	x: number
	y: number
}

type ChartBarRectangle = {
	height: number
	width: number
	x: number
	y: number
}

function createChartPlotBox(
	width: number,
	height: number,
	padding: ChartPlotPadding
): ChartPlotBox {
	const left = padding.left
	const right = width - padding.right
	const top = padding.top
	const bottom = height - padding.bottom

	return {
		bottom,
		height: bottom - top,
		left,
		right,
		top,
		width: right - left
	}
}

function getPaddedChartExtent(
	values: readonly number[],
	baseline?: number
): readonly [number, number] {
	const numericValues = baseline === undefined ? values : [...values, baseline]
	const extent = getNumericExtent(numericValues.length > 0 ? numericValues : [0, 1])
	const range = extent[1] - extent[0]
	const padding = range * 0.08

	return [extent[0] - padding, extent[1] + padding]
}

function createScaledChartPoints(
	points: readonly DataPoint[],
	plotBox: ChartPlotBox,
	scaleY: (value: number) => number
): readonly ScaledChartPoint[] {
	const scaleX = createLinearScale(
		[0, Math.max(points.length - 1, 1)],
		[plotBox.left, plotBox.right]
	)

	return points.map((point, pointIndex) => ({
		...point,
		x: scaleX(pointIndex),
		y: scaleY(point.value)
	}))
}

function createSparseXAxisLabels(
	points: readonly DataPoint[],
	plotBox: ChartPlotBox
): readonly ChartAxisLabel[] {
	if (points.length === 0) {
		return []
	}

	const scaleX = createLinearScale(
		[0, Math.max(points.length - 1, 1)],
		[plotBox.left, plotBox.right]
	)
	const indexes = new Set<number>([0, Math.floor((points.length - 1) / 2), points.length - 1])

	if (points.length <= 4) {
		points.forEach((_point, pointIndex) => {
			indexes.add(pointIndex)
		})
	}

	return [...indexes]
		.sort((firstIndex, secondIndex) => firstIndex - secondIndex)
		.map(pointIndex => ({
			label: points[pointIndex]?.label ?? '',
			x: scaleX(pointIndex)
		}))
}

function createChartBarRectangle(
	value: number,
	x: number,
	width: number,
	scaleY: (value: number) => number,
	zero: number
): ChartBarRectangle {
	const y = scaleY(value)

	return {
		height: Math.max(Math.abs(zero - y), 1),
		width,
		x,
		y: Math.min(y, zero)
	}
}

function getStackedTotal(group: { segments: readonly DataPoint[] }): number {
	return group.segments.reduce((sum, segment) => sum + Math.max(segment.value, 0), 0)
}

function renderCartesianGrid(
	plotBox: ChartPlotBox,
	extent: readonly [number, number],
	xLabels: readonly ChartAxisLabel[] = [],
	options: {
		showGrid?: boolean
		showXAxis?: boolean
		showYAxis?: boolean
	} = {}
): ReactNode {
	const scaleY = createLinearScale(extent, [plotBox.bottom, plotBox.top])
	const ticks = createChartTicks(extent, 4)
	const showGrid = options.showGrid ?? true
	const showXAxis = options.showXAxis ?? true
	const showYAxis = options.showYAxis ?? true

	return (
		<g className={classes.chartGrid}>
			<rect
				className={classes.chartPlotBackground}
				height={plotBox.height}
				rx="8"
				width={plotBox.width}
				x={plotBox.left}
				y={plotBox.top}
			/>
			{ticks.map(tick => {
				const y = scaleY(tick)

				return (
					<g key={tick}>
						{showGrid ? <line x1={plotBox.left} x2={plotBox.right} y1={y} y2={y} /> : null}
						{showYAxis ? (
							<text className={classes.chartTickLabel} textAnchor="end" x={plotBox.left - 9} y={y + 3}>
								{formatChartValue(tick)}
							</text>
						) : null}
					</g>
				)
			})}
			{showXAxis ? (
				<line
					className={classes.chartAxis}
					x1={plotBox.left}
					x2={plotBox.right}
					y1={plotBox.bottom}
					y2={plotBox.bottom}
				/>
			) : null}
			{showXAxis
				? xLabels.map(label => (
						<text
							className={classes.chartAxisLabel}
							key={`${label.label}-${label.x}`}
							textAnchor="middle"
							x={label.x}
							y={plotBox.bottom + 18}
						>
							{label.label}
						</text>
					))
				: null}
		</g>
	)
}

function renderTarget(
	target: number,
	extent: readonly [number, number],
	plotBox: ChartPlotBox
): ReactNode {
	const scaleY = createLinearScale(extent, [plotBox.bottom, plotBox.top])
	const y = scaleY(target)

	return (
		<g className={classes.chartTarget}>
			<line x1={plotBox.left} x2={plotBox.right} y1={y} y2={y} />
			<text textAnchor="end" x={plotBox.right - 4} y={y - 7}>
				target {formatChartValue(target)}
			</text>
		</g>
	)
}

function formatChartValue(value: number): string {
	const absoluteValue = Math.abs(value)

	if (absoluteValue >= 1000) {
		return `${Math.round(value / 100) / 10}k`
	}

	if (Number.isInteger(value)) {
		return String(value)
	}

	return value.toFixed(1)
}

function getDonutStrokeWidth(thickness: 'medium' | 'thick' | 'thin'): number {
	switch (thickness) {
		case 'thin':
			return 7
		case 'medium':
			return 10
		case 'thick':
			return 14
	}
}

function renderTableCell(value: unknown): ReactNode {
	if (value === null || value === undefined) {
		return <span className={classes.dataTableEmptyCell}>-</span>
	}

	if (typeof value === 'number') {
		return new Intl.NumberFormat('en-US').format(value)
	}

	if (typeof value === 'string' || typeof value === 'boolean') {
		return String(value)
	}

	if (typeof value !== 'object') {
		return null
	}

	const cell = value as { kind?: string }

	switch (cell.kind) {
		case 'delta': {
			const deltaCell = value as {
				delta: { basis?: string; intent: 'negative' | 'neutral' | 'positive'; value: string }
			}
			return (
				<Delta
					basis={deltaCell.delta.basis}
					intent={deltaCell.delta.intent}
					value={deltaCell.delta.value}
				/>
			)
		}
		case 'meter': {
			const meterCell = value as { tone: DataTone; value: { max: number; min: number; value: number } }
			const percent =
				normalizeRangeValue(meterCell.value.value, meterCell.value.min, meterCell.value.max) * 100

			return <Progress size="thin" tone={toProgressTone(meterCell.tone)} value={percent} />
		}
		case 'sparkline': {
			const sparklineCell = value as { tone: DataTone; values?: readonly number[] | undefined }

			return (
				<Sparkline
					showEndpoint={false}
					tone={toSparklineTone(sparklineCell.tone)}
					values={sparklineCell.values ?? []}
				/>
			)
		}
		case 'status': {
			const statusCell = value as { label: string; tone: DataTone }

			return <Indicator tone={toIndicatorTone(statusCell.tone)}>{statusCell.label}</Indicator>
		}
		default:
			return null
	}
}

function renderTableToolbarAction(
	action: DataTableToolbarAction,
	selectedRowIds: readonly string[],
	onToolbarAction: ((actionId: string, selectedRowIds: readonly string[]) => void) | undefined
): ReactNode {
	return (
		<button
			className={cn(classes.dataTableAction, getDataToneClass(action.tone))}
			disabled={action.disabled}
			key={action.id}
			onClick={() => onToolbarAction?.(action.id, selectedRowIds)}
			type="button"
		>
			{action.icon ? <TableActionIcon icon={action.icon} /> : null}
			{action.label}
		</button>
	)
}

function TableActionIcon({ icon }: { icon: NonNullable<DataTableToolbarAction['icon']> }) {
	switch (icon) {
		case 'download':
			return <ConcreteIcon name="download" />
		case 'inspect':
			return <ConcreteIcon name="search" />
		case 'more':
			return <ConcreteIcon name="more-horizontal" />
	}
}

function SortGlyph({
	activeSort,
	columnKey
}: {
	activeSort: DataTableSort | null
	columnKey: string
}) {
	if (activeSort?.key !== columnKey) {
		return <ConcreteIcon name="chevrons-up-down" />
	}

	return <ConcreteIcon name={activeSort.direction === 'ascending' ? 'chevron-up' : 'chevron-down'} />
}

function getNextSort(activeSort: DataTableSort | null, key: string): DataTableSort | null {
	if (activeSort?.key !== key) {
		return { direction: 'ascending', key }
	}

	if (activeSort.direction === 'ascending') {
		return { direction: 'descending', key }
	}

	return null
}

function getResolvedRowId<Row extends DataTableRow>(
	row: Row,
	rowIndex: number,
	getRowId: ((row: Row, rowIndex: number) => string) | undefined
): string {
	return getRowId?.(row, rowIndex) ?? String(row.id ?? rowIndex)
}

function filterDataTableRows<Row extends DataTableRow>(
	rows: readonly Row[],
	searchValue: string,
	filters: readonly { id: string; value?: string | undefined }[]
): readonly Row[] {
	const normalizedSearch = searchValue.trim().toLowerCase()

	return rows.filter(row => {
		const matchesSearch =
			normalizedSearch.length === 0 ||
			Object.values(row).some(value => getDataTableCellText(value).includes(normalizedSearch))
		const matchesFilters = filters.every(filter => {
			if (!filter.value) {
				return true
			}

			return getDataTableCellText(row[filter.id]) === filter.value.toLowerCase()
		})

		return matchesSearch && matchesFilters
	})
}

function getDataTableCellText(value: DataTableRow[string] | undefined): string {
	if (value === null || value === undefined) {
		return ''
	}

	if (typeof value === 'number' || typeof value === 'string' || typeof value === 'boolean') {
		return String(value).toLowerCase()
	}

	switch (value.kind) {
		case 'delta':
			return `${value.delta.value} ${value.delta.basis ?? ''}`.toLowerCase()
		case 'meter':
			return String(value.value.value).toLowerCase()
		case 'sparkline':
			return (value.values ?? []).join(' ').toLowerCase()
		case 'status':
			return value.label.toLowerCase()
	}
}

function getTableScrollStyle(maxHeight: string | undefined): CSSProperties | undefined {
	if (!maxHeight) {
		return undefined
	}

	return { maxHeight }
}

function getChartStateMessage(state: 'empty' | 'error' | 'loading' | 'ready'): string {
	switch (state) {
		case 'empty':
			return 'No data'
		case 'error':
			return 'Chart failed'
		case 'loading':
			return 'Loading data'
		case 'ready':
			return ''
	}
}

function getChartStateTone(
	state: 'empty' | 'error' | 'loading' | 'ready'
): 'error' | 'muted' | 'sky' | 'terminal' {
	switch (state) {
		case 'empty':
			return 'muted'
		case 'error':
			return 'error'
		case 'loading':
			return 'sky'
		case 'ready':
			return 'terminal'
	}
}

function getChartLegendItems(
	parsedProps: ReturnType<typeof chartSchema.parse>
): { label: string; tone: DataTone; value?: string | undefined }[] {
	switch (parsedProps.variant) {
		case 'area':
		case 'line':
			return parsedProps.series.map(series => ({
				label: series.label,
				tone: series.tone
			}))
		case 'bar':
			return parsedProps.points.slice(0, 4).map(point => ({
				label: point.label,
				tone: point.tone
			}))
		case 'donut':
			return parsedProps.segments.map(segment => ({
				label: segment.label,
				tone: segment.tone,
				value: String(segment.value)
			}))
		case 'heatmap':
			return []
		case 'stacked-bar':
			return (
				parsedProps.groups[0]?.segments.map(segment => ({
					label: segment.label,
					tone: segment.tone
				})) ?? []
			)
	}
}

function getMetricTrendTone(intent: 'negative' | 'neutral' | 'positive' | undefined): DataTone {
	switch (intent) {
		case 'negative':
			return 'error'
		case 'positive':
			return 'terminal'
		case 'neutral':
		case undefined:
			return 'sky'
	}
}

function toProgressTone(tone: DataTone): 'default' | 'error' | 'sky' | 'terminal' | 'ultra' {
	switch (tone) {
		case 'error':
			return 'error'
		case 'sky':
			return 'sky'
		case 'terminal':
			return 'terminal'
		case 'ultra':
			return 'ultra'
		case 'ink':
		case 'muted':
			return 'default'
	}
}

function toIndicatorTone(
	tone: DataTone
): 'default' | 'error' | 'muted' | 'sky' | 'terminal' | 'ultra' {
	switch (tone) {
		case 'error':
			return 'error'
		case 'muted':
			return 'muted'
		case 'sky':
			return 'sky'
		case 'terminal':
			return 'terminal'
		case 'ultra':
			return 'ultra'
		case 'ink':
			return 'default'
	}
}

function toSparklineTone(tone: DataTone): 'error' | 'neutral' | 'sky' | 'terminal' {
	switch (tone) {
		case 'error':
			return 'error'
		case 'terminal':
			return 'terminal'
		case 'ink':
		case 'muted':
		case 'ultra':
			return 'neutral'
		case 'sky':
			return 'sky'
	}
}

function getDataToneClass(tone: DataTone | undefined): string | undefined {
	switch (tone) {
		case 'error':
			return classes.dataToneError
		case 'muted':
			return classes.dataToneMuted
		case 'sky':
			return classes.dataToneSky
		case 'terminal':
			return classes.dataToneTerminal
		case 'ultra':
			return classes.dataToneUltra
		case 'ink':
		case undefined:
			return undefined
	}
}

function getFlowEdgeVariantClass(variant: FlowDiagramEdge['variant']): string | undefined {
	switch (variant) {
		case 'dashed':
			return classes.flowDiagramEdgeDashed
		case 'dotted':
			return classes.flowDiagramEdgeDotted
		case 'pulse':
			return classes.flowDiagramEdgePulse
		case 'solid':
		case 'step':
			return undefined
	}
}
