import type { CSSProperties } from 'react'
import type { DiagramCanvasGraph } from '../schemas'
import {
	createDiagramCanvasBox,
	type DiagramCanvasBox,
	type DiagramViewport
} from './diagram-geometry'

type DiagramCanvasStageStyleInput = {
	height: number
	transform: string
	width: number
}

type DiagramCanvasElementPlacement = {
	height: number
	width: number
	x: number
	y: number
}

export function getDiagramCanvasGraphBoxes(
	graph: DiagramCanvasGraph,
	width: number,
	height: number
): Map<string, DiagramCanvasBox> {
	return new Map(
		[...graph.nodes, ...graph.items].map(element => [
			element.id,
			createDiagramCanvasBox(element, width, height)
		])
	)
}

export function getDiagramCanvasTransform(viewport: DiagramViewport): string {
	return `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`
}

export function getDiagramCanvasStageStyle({
	height,
	transform,
	width
}: DiagramCanvasStageStyleInput): CSSProperties {
	return {
		'--diagram-canvas-height': `${height}px`,
		'--diagram-canvas-transform': transform,
		'--diagram-canvas-width': `${width}px`
	} as CSSProperties
}

export function getDiagramCanvasElementStyle(
	element: DiagramCanvasElementPlacement
): CSSProperties {
	return {
		'--diagram-element-height': `${element.height}px`,
		'--diagram-element-width': `${element.width}px`,
		left: `${element.x}%`,
		top: `${element.y}%`
	} as CSSProperties
}
