import { describe, expect, test } from 'bun:test'
import {
	chartSchema,
	createDataTableColumns,
	type DataTableRow,
	dataTableSchema,
	dataToneSchema,
	flowDiagramSchema,
	meterSchema,
	metricCardSchema
} from '..'
import {
	createAreaPath,
	createBarRectangles,
	createChartPoints,
	createDonutSegments,
	createPath,
	getNumericExtent,
	routeDiagramEdge,
	sortDataTableRows
} from '../utilities/data-geometry'

describe('Concrete data components', () => {
	test('keeps warning out of the data intent model', () => {
		expect(dataToneSchema.safeParse('warning').success).toBe(false)
		expect(dataToneSchema.parse('terminal')).toBe('terminal')
	})

	test('parses metric, meter, chart, table, and flow schemas', () => {
		expect(
			metricCardSchema.parse({
				delta: { intent: 'positive', value: '+18%' },
				label: 'Runs',
				value: '14.8k'
			})
		).toMatchObject({
			compact: false,
			label: 'Runs',
			trend: []
		})
		expect(meterSchema.parse({ label: 'Usage', value: { value: 72 } })).toMatchObject({
			display: 'bar',
			intent: 'sky'
		})
		expect(
			chartSchema.parse({
				cells: [{ value: 42, x: 'Mon', y: 'AM' }],
				kind: 'heatmap',
				title: 'Intensity'
			})
		).toMatchObject({
			kind: 'heatmap',
			state: 'ready'
		})
		expect(
			dataTableSchema.parse({
				columns: [{ header: 'Run', key: 'run', sortable: true }],
				rows: [{ id: 'a', run: 'Router' }]
			})
		).toMatchObject({
			compact: true,
			searchPlaceholder: 'Search rows'
		})
		expect(
			flowDiagramSchema.safeParse({
				edges: [{ from: 'missing', id: 'edge', to: 'answer' }],
				nodes: [{ id: 'answer', title: 'Answer', x: 0, y: 0 }]
			}).success
		).toBe(false)
	})

	test('creates deterministic chart geometry', () => {
		const points = createChartPoints([2, 4, 3], 120, 80, 12)
		const bars = createBarRectangles([2, 4, 3], 120, 80, 12)
		const segments = createDonutSegments([
			{ label: 'Search', value: 30 },
			{ label: 'Tools', value: 70 }
		])

		expect(getNumericExtent([4, 4])).toEqual([3, 5])
		expect(createPath(points)).toStartWith('M12,68')
		expect(createAreaPath(points, 68)).toContain('Z')
		expect(bars).toHaveLength(3)
		expect(segments.map(segment => segment.percent)).toEqual([0.3, 0.7])
	})

	test('sorts typed table rows and preserves column keys', () => {
		type Row = DataTableRow & {
			id: string
			run: string
			score: { kind: 'meter'; value: { max: number; min: number; value: number } }
		}

		const columns = createDataTableColumns<Row>()([
			{ header: 'Run', key: 'run', sortable: true },
			{ header: 'Score', key: 'score', sortable: true }
		])
		const rows: Row[] = [
			{ id: 'b', run: 'Memory', score: { kind: 'meter', value: { max: 100, min: 0, value: 42 } } },
			{ id: 'a', run: 'Router', score: { kind: 'meter', value: { max: 100, min: 0, value: 86 } } }
		]

		expect(columns.map(column => column.key)).toEqual(['run', 'score'])
		expect(sortDataTableRows(rows, 'score', 'descending').map(row => row.id)).toEqual(['a', 'b'])
	})

	test('routes diagram edges from node bounds', () => {
		const route = routeDiagramEdge(
			{
				height: 64,
				hierarchy: 'surface',
				id: 'a',
				selected: false,
				title: 'A',
				width: 120,
				x: 10,
				y: 20
			},
			{
				height: 64,
				hierarchy: 'surface',
				id: 'b',
				selected: false,
				title: 'B',
				width: 120,
				x: 240,
				y: 84
			},
			{ from: 'a', id: 'edge', intent: 'sky', relation: 'step', selected: false, to: 'b' }
		)

		expect(route.path).toContain('H')
		expect(route.label.x).toBeGreaterThan(100)
	})
})
