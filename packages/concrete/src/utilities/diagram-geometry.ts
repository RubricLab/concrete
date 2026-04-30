import type {
	DiagramAnchor,
	DiagramCanvasEdge,
	DiagramCanvasItem,
	DiagramCanvasNode
} from '../schemas'
import { clamp } from './data-geometry'

export type DiagramCanvasPoint = {
	x: number
	y: number
}

export type DiagramCanvasBox = {
	height: number
	id: string
	width: number
	x: number
	y: number
}

export type DiagramViewport = {
	x: number
	y: number
	zoom: number
}

export type RoutedDiagramCanvasEdge = {
	label: DiagramCanvasPoint
	path: string
}

const edgeGap = 8

export function createDiagramCanvasBox(
	element: DiagramCanvasNode | DiagramCanvasItem,
	width: number,
	height: number
): DiagramCanvasBox {
	return {
		height: element.height,
		id: element.id,
		width: element.width,
		x: (element.x / 100) * width,
		y: (element.y / 100) * height
	}
}

export function routeDiagramCanvasEdge(
	fromBox: DiagramCanvasBox,
	toBox: DiagramCanvasBox,
	edge: DiagramCanvasEdge
): RoutedDiagramCanvasEdge {
	const from = getAnchorPoint(fromBox, edge.fromAnchor)
	const to = getAnchorPoint(toBox, edge.toAnchor)
	const label = {
		x: round((from.x + to.x) / 2),
		y: round((from.y + to.y) / 2)
	}

	switch (edge.variant) {
		case 'branch':
		case 'control':
			return {
				label,
				path: createStepPath(from, to)
			}
		case 'reference':
			return {
				label,
				path: createReferencePath(from, to)
			}
		case 'bidirectional':
		case 'dashed':
		case 'dotted':
		case 'solid':
			return {
				label,
				path: createCurvePath(from, to)
			}
	}
}

export function clampDiagramViewport(
	viewport: DiagramViewport,
	width: number,
	height: number
): DiagramViewport {
	const zoom = clamp(Number(viewport.zoom.toFixed(2)), 0.72, 1.64)
	const overflow = Math.max(zoom - 1, 0)
	const xBound = Math.round(width * (0.18 + overflow * 0.2))
	const yBound = Math.round(height * (0.16 + overflow * 0.16))

	return {
		x: clamp(Math.round(viewport.x), -xBound, xBound),
		y: clamp(Math.round(viewport.y), -yBound, yBound),
		zoom
	}
}

function getAnchorPoint(box: DiagramCanvasBox, anchor: DiagramAnchor): DiagramCanvasPoint {
	switch (anchor) {
		case 'bottom':
			return { x: box.x, y: box.y + box.height / 2 + edgeGap }
		case 'center':
			return { x: box.x, y: box.y }
		case 'left':
			return { x: box.x - box.width / 2 - edgeGap, y: box.y }
		case 'right':
			return { x: box.x + box.width / 2 + edgeGap, y: box.y }
		case 'top':
			return { x: box.x, y: box.y - box.height / 2 - edgeGap }
	}
}

function createCurvePath(from: DiagramCanvasPoint, to: DiagramCanvasPoint): string {
	const distance = Math.max(Math.abs(to.x - from.x), 1)
	const controlDistance = clamp(distance * 0.5, 42, 92)

	return [
		`M${round(from.x)} ${round(from.y)}`,
		`C${round(from.x + controlDistance)} ${round(from.y)}`,
		`${round(to.x - controlDistance)} ${round(to.y)}`,
		`${round(to.x)} ${round(to.y)}`
	].join(' ')
}

function createReferencePath(from: DiagramCanvasPoint, to: DiagramCanvasPoint): string {
	const controlY = from.y + Math.max((to.y - from.y) * 0.72, 36)

	return [
		`M${round(from.x)} ${round(from.y)}`,
		`C${round(from.x)} ${round(controlY)}`,
		`${round(to.x + 42)} ${round(to.y)}`,
		`${round(to.x)} ${round(to.y)}`
	].join(' ')
}

function createStepPath(from: DiagramCanvasPoint, to: DiagramCanvasPoint): string {
	const middleX = round((from.x + to.x) / 2)

	return `M${round(from.x)} ${round(from.y)} H${middleX} V${round(to.y)} H${round(to.x)}`
}

function round(value: number): number {
	return Math.round(value * 10) / 10
}
