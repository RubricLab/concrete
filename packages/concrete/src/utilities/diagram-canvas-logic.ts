import type { DiagramCanvasGraph } from '../schemas'
import {
	createDiagramCanvasBox,
	type DiagramCanvasBox,
	type DiagramViewport
} from './diagram-geometry'

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
