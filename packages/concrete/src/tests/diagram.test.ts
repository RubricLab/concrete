import { describe, expect, test } from 'bun:test'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import {
	ConceptConnector,
	ConceptFrame,
	ContextFrame,
	conceptConnectorKindSchema,
	conceptFrameKindSchema,
	contextFramePropsSchema,
	DiagramCanvas,
	type DiagramCanvasProps,
	DiagramItem,
	DiagramNode,
	diagramCanvasGraphSchema,
	diagramCanvasPropsSchema,
	diagramItemPropsSchema,
	diagramNodePropsSchema,
	diagramToneSchema
} from '..'
import {
	clampDiagramViewport,
	createDiagramCanvasBox,
	routeDiagramCanvasEdge
} from '../components/diagram-geometry'

describe('Concrete diagram language', () => {
	test('parses diagram primitive schemas without warning tones', () => {
		expect(conceptFrameKindSchema.parse('browser-window')).toBe('browser-window')
		expect(conceptConnectorKindSchema.parse('branch')).toBe('branch')
		expect(diagramToneSchema.safeParse('warning').success).toBe(false)
		expect(diagramNodePropsSchema.parse({ title: 'Router' })).toMatchObject({
			role: 'process',
			selected: false
		})
		expect(diagramItemPropsSchema.parse({ title: 'Trace', value: '184ms' })).toMatchObject({
			kind: 'note',
			tone: 'ink'
		})
		expect(contextFramePropsSchema.parse({})).toMatchObject({
			compact: false,
			kind: 'browser'
		})
	})

	test('validates diagram graph edge references', () => {
		expect(
			diagramCanvasGraphSchema.safeParse({
				edges: [{ from: 'input', id: 'edge', to: 'missing' }],
				nodes: [{ id: 'input', title: 'Input', x: 10, y: 50 }]
			}).success
		).toBe(false)
		expect(
			diagramCanvasPropsSchema.parse({
				graph: {
					edges: [{ from: 'input', id: 'edge', to: 'model' }],
					nodes: [
						{ id: 'input', title: 'Input', x: 10, y: 50 },
						{ id: 'model', title: 'Model', x: 70, y: 50 }
					]
				},
				title: 'Request flow'
			})
		).toMatchObject({
			controls: true,
			height: 360,
			title: 'Request flow'
		})
	})

	test('routes diagram canvas edges and clamps viewport', () => {
		const fromBox = createDiagramCanvasBox(
			{
				height: 56,
				id: 'input',
				muted: false,
				role: 'external',
				selected: false,
				title: 'Input',
				width: 180,
				x: 20,
				y: 50
			},
			1000,
			360
		)
		const toBox = createDiagramCanvasBox(
			{
				height: 56,
				id: 'model',
				muted: false,
				role: 'compute',
				selected: false,
				title: 'Model',
				width: 180,
				x: 70,
				y: 50
			},
			1000,
			360
		)
		const route = routeDiagramCanvasEdge(fromBox, toBox, {
			from: 'input',
			fromAnchor: 'right',
			id: 'edge',
			selected: false,
			to: 'model',
			toAnchor: 'left',
			tone: 'sky',
			variant: 'solid'
		})

		expect(route.path).toStartWith('M')
		expect(route.path).toContain('C')
		expect(clampDiagramViewport({ x: 1000, y: -1000, zoom: 4 }, 1000, 360)).toEqual({
			x: 308,
			y: -94,
			zoom: 1.64
		})
	})

	test('renders diagram primitives and components', () => {
		const graph = {
			edges: [{ from: 'input', id: 'edge', to: 'model' }],
			items: [],
			nodes: [
				{ id: 'input', title: 'Input', x: 20, y: 50 },
				{ id: 'model', role: 'compute', title: 'Model', x: 70, y: 50 }
			]
		} satisfies DiagramCanvasProps['graph']

		expect(renderToStaticMarkup(createElement(ConceptFrame, { kind: 'model-card' }))).toContain(
			'<svg'
		)
		expect(renderToStaticMarkup(createElement(ConceptConnector, { kind: 'branch' }))).toContain(
			'<svg'
		)
		expect(renderToStaticMarkup(createElement(DiagramNode, { title: 'Router' }))).toContain('Router')
		expect(renderToStaticMarkup(createElement(DiagramItem, { title: 'Trace' }))).toContain('Trace')
		expect(renderToStaticMarkup(createElement(ContextFrame, { title: 'Frame' }))).toContain('Frame')
		expect(renderToStaticMarkup(createElement(DiagramCanvas, { graph, title: 'Flow' }))).toContain(
			'Flow'
		)
	})
})
