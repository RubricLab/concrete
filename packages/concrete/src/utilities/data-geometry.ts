import type { DataTableCellValue, DataTableRow, FlowDiagramEdge, FlowDiagramNode } from '../schemas'

export type Point = { x: number; y: number }

export type Rectangle = {
	height: number
	label: string
	value: number
	width: number
	x: number
	y: number
}

export type DonutSegment = {
	dashArray: string
	dashOffset: number
	label: string
	percent: number
	value: number
}

export type RoutedDiagramEdge = { label: Point; path: string }

export function clamp(value: number, minimum: number, maximum: number): number {
	return Math.min(Math.max(value, minimum), maximum)
}

export function normalizeRangeValue(value: number, minimum: number, maximum: number): number {
	if (maximum <= minimum) {
		return 0
	}

	return (clamp(value, minimum, maximum) - minimum) / (maximum - minimum)
}

export function formatPercent(value: number): string {
	return `${Math.round(value * 100)}%`
}

export function getNumericExtent(values: readonly number[]): readonly [number, number] {
	if (values.length === 0) {
		return [0, 1]
	}

	let minimum = Number.POSITIVE_INFINITY
	let maximum = Number.NEGATIVE_INFINITY

	for (const value of values) {
		minimum = Math.min(minimum, value)
		maximum = Math.max(maximum, value)
	}

	if (minimum === maximum) {
		return [minimum - 1, maximum + 1]
	}

	return [minimum, maximum]
}

export function createLinearScale(
	domain: readonly [number, number],
	range: readonly [number, number]
): (value: number) => number {
	const domainSize = domain[1] - domain[0]
	const rangeSize = range[1] - range[0]

	return function scaleLinear(value: number): number {
		if (domainSize === 0) {
			return range[0]
		}

		return range[0] + ((value - domain[0]) / domainSize) * rangeSize
	}
}

export function createPath(points: readonly Point[]): string {
	return points
		.map((point, pointIndex) => `${pointIndex === 0 ? 'M' : 'L'}${round(point.x)},${round(point.y)}`)
		.join(' ')
}

export function createAreaPath(points: readonly Point[], baseline: number): string {
	return closeAreaPath(createPath(points), points, baseline)
}

export function createSmoothPath(points: readonly Point[]): string {
	if (points.length < 3) {
		return createPath(points)
	}

	return points
		.map((point, pointIndex) => {
			if (pointIndex === 0) {
				return `M${round(point.x)},${round(point.y)}`
			}

			const previousPoint = points[pointIndex - 1] ?? point
			const nextPoint = points[pointIndex + 1] ?? point
			const controlDistance = (nextPoint.x - previousPoint.x) * 0.18

			return `C${round(previousPoint.x + controlDistance)},${round(previousPoint.y)} ${round(point.x - controlDistance)},${round(point.y)} ${round(point.x)},${round(point.y)}`
		})
		.join(' ')
}

export function createSmoothAreaPath(points: readonly Point[], baseline: number): string {
	return closeAreaPath(createSmoothPath(points), points, baseline)
}

export function createChartTicks(extent: readonly [number, number], count = 4): readonly number[] {
	if (count <= 1) {
		return [extent[0]]
	}

	const range = extent[1] - extent[0]

	if (range <= 0) {
		return [extent[0]]
	}

	const step = createNiceStep(range / (count - 1))
	const start = Math.ceil(extent[0] / step) * step
	const end = Math.floor(extent[1] / step) * step
	const ticks: number[] = []

	for (let tick = start; tick <= end + step / 10; tick += step) {
		ticks.push(round(tick))
	}

	if (ticks.length > 1) {
		return ticks
	}

	return Array.from({ length: count }, (_, index) =>
		round(extent[0] + (range / (count - 1)) * index)
	)
}

export function createChartPoints(
	values: readonly number[],
	width: number,
	height: number,
	padding: number
): readonly Point[] {
	const scaleX = createLinearScale([0, Math.max(values.length - 1, 1)], [padding, width - padding])
	const scaleY = createLinearScale(getNumericExtent(values), [height - padding, padding])

	return values.map((value, index) => ({
		x: scaleX(index),
		y: scaleY(value)
	}))
}

export function createBarRectangles(
	values: readonly number[],
	width: number,
	height: number,
	padding: number,
	baseline = 0
): readonly Rectangle[] {
	const extent = getNumericExtent([...values, baseline])
	const scaleY = createLinearScale(extent, [height - padding, padding])
	const zero = scaleY(baseline)
	const slot = (width - padding * 2) / Math.max(values.length, 1)
	const barWidth = Math.max(slot * 0.58, 2)

	return values.map((value, index) => {
		const y = scaleY(value)

		return {
			height: Math.max(Math.abs(zero - y), 1),
			label: String(index + 1),
			value,
			width: barWidth,
			x: padding + index * slot + (slot - barWidth) / 2,
			y: Math.min(y, zero)
		}
	})
}

export function createDonutSegments(
	points: readonly { label: string; value: number }[]
): readonly DonutSegment[] {
	const total = points.reduce((sum, point) => sum + Math.max(point.value, 0), 0)
	let offset = 0

	if (total <= 0) {
		return []
	}

	return points.map(point => {
		const percent = Math.max(point.value, 0) / total
		const segment = {
			dashArray: `${round(percent * 100)} ${round(100 - percent * 100)}`,
			dashOffset: -round(offset * 100),
			label: point.label,
			percent,
			value: point.value
		}
		offset += percent

		return segment
	})
}

export function routeDiagramEdge(
	fromNode: FlowDiagramNode,
	toNode: FlowDiagramNode,
	edge: FlowDiagramEdge
): RoutedDiagramEdge {
	const from = {
		x: fromNode.x + fromNode.width,
		y: fromNode.y + fromNode.height / 2
	}
	const to = {
		x: toNode.x,
		y: toNode.y + toNode.height / 2
	}
	const middleX = round((from.x + to.x) / 2)
	const label = {
		x: middleX,
		y: round((from.y + to.y) / 2)
	}
	const path = `M${round(from.x)},${round(from.y)} C${middleX},${round(from.y)} ${middleX},${round(to.y)} ${round(to.x)},${round(to.y)}`

	return {
		label,
		path:
			edge.variant === 'step'
				? `M${round(from.x)},${round(from.y)} H${middleX} V${round(to.y)} H${round(to.x)}`
				: path
	}
}

export function sortDataTableRows<Row extends DataTableRow>(
	rows: readonly Row[],
	key: string,
	direction: 'ascending' | 'descending'
): readonly Row[] {
	const multiplier = direction === 'ascending' ? 1 : -1

	return [...rows].sort((firstRow, secondRow) => {
		const firstValue = getSortableValue(firstRow[key])
		const secondValue = getSortableValue(secondRow[key])
		const order = firstValue < secondValue ? -1 : firstValue > secondValue ? 1 : 0

		return order * multiplier
	})
}

export function getSortableValue(value: DataTableCellValue | undefined): number | string {
	if (typeof value === 'number' || typeof value === 'string') {
		return value
	}

	if (typeof value === 'boolean') {
		return Number(value)
	}

	if (!value || typeof value !== 'object') {
		return ''
	}

	switch (value.kind) {
		case 'delta':
			return value.delta.value
		case 'meter':
			return value.value.value
		case 'sparkline':
			return value.values?.at(-1) ?? 0
		case 'status':
			return value.label
	}
}

function round(value: number): number {
	return Math.round(value * 100) / 100
}

function closeAreaPath(path: string, points: readonly Point[], baseline: number): string {
	const firstPoint = points[0]
	const lastPoint = points.at(-1)

	return firstPoint && lastPoint
		? `${path} L${round(lastPoint.x)},${round(baseline)} L${round(firstPoint.x)},${round(baseline)} Z`
		: ''
}

function createNiceStep(value: number): number {
	const exponent = Math.floor(Math.log10(value))
	const fraction = value / 10 ** exponent
	const niceFraction =
		fraction <= 1 ? 1 : fraction <= 2 ? 2 : fraction <= 2.5 ? 2.5 : fraction <= 5 ? 5 : 10

	return niceFraction * 10 ** exponent
}
