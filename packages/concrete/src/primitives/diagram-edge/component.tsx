import type { SVGAttributes } from 'react'
import type {
	DataIntent,
	DiagramCanvasEdge as DiagramCanvasEdgeShape,
	DiagramTone,
	FlowDiagramEdge as FlowDiagramEdgeShape
} from '../../schemas'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

export type DiagramEdgeDisplay = 'canvas' | 'flow'

type DiagramEdgeLabel = {
	x: number
	y: number
}

type DiagramEdgeRelation = DiagramCanvasEdgeShape['relation'] | FlowDiagramEdgeShape['relation']

export type DiagramEdgesProps = SVGAttributes<SVGSVGElement> & {
	height: number
	markerId: string
	reverseMarkerId: string
	width: number
}

export function DiagramEdges({
	children,
	className,
	height,
	markerId,
	reverseMarkerId,
	width,
	...props
}: DiagramEdgesProps) {
	return (
		<svg
			aria-hidden="true"
			className={cn(concreteClassNames.diagramEdges, className)}
			viewBox={`0 0 ${width} ${height}`}
			{...props}
		>
			<defs>
				<marker
					id={markerId}
					markerHeight="8"
					markerWidth="8"
					orient="auto"
					refX="7"
					refY="4"
					viewBox="0 0 8 8"
				>
					<path d="M1 1 7 4 1 7" />
				</marker>
				<marker
					id={reverseMarkerId}
					markerHeight="8"
					markerWidth="8"
					orient="auto-start-reverse"
					refX="1"
					refY="4"
					viewBox="0 0 8 8"
				>
					<path d="M7 1 1 4 7 7" />
				</marker>
			</defs>
			{children}
		</svg>
	)
}

export type DiagramEdgePathProps = SVGAttributes<SVGGElement> & {
	display?: DiagramEdgeDisplay | undefined
	label?: string | undefined
	labelPoint: DiagramEdgeLabel
	markerEnd?: string | undefined
	markerStart?: string | undefined
	path: string
	selected?: boolean | undefined
	intent?: DataIntent | DiagramTone | undefined
	relation?: DiagramEdgeRelation | undefined
}

export function DiagramEdgePath({
	className,
	display = 'canvas',
	label,
	labelPoint,
	markerEnd,
	markerStart,
	path,
	selected = false,
	intent = 'muted',
	relation = 'solid',
	...props
}: DiagramEdgePathProps) {
	return (
		<g
			className={cn(
				display === 'flow' ? concreteClassNames.diagramFlowEdge : concreteClassNames.diagramEdge,
				selected &&
					(display === 'flow'
						? concreteClassNames.diagramFlowEdgeSelected
						: concreteClassNames.diagramEdgeSelected),
				getDiagramEdgeRelationClass(display, relation),
				getDiagramIntentClass(display, intent),
				className
			)}
			{...props}
		>
			<path
				d={path}
				markerEnd={display === 'canvas' ? markerEnd : undefined}
				markerStart={display === 'canvas' ? markerStart : undefined}
			/>
			{label ? (
				<text x={labelPoint.x} y={labelPoint.y}>
					{label}
				</text>
			) : null}
		</g>
	)
}

function getDiagramEdgeRelationClass(
	display: DiagramEdgeDisplay,
	relation: DiagramEdgeRelation
): string | undefined {
	switch (display) {
		case 'canvas':
			return getCanvasDiagramEdgeRelationClass(relation as DiagramCanvasEdgeShape['relation'])
		case 'flow':
			return getFlowDiagramEdgeRelationClass(relation as FlowDiagramEdgeShape['relation'])
	}
}

function getCanvasDiagramEdgeRelationClass(
	relation: DiagramCanvasEdgeShape['relation']
): string | undefined {
	switch (relation) {
		case 'bidirectional':
		case 'solid':
			return undefined
		case 'branch':
		case 'control':
			return concreteClassNames.diagramEdgeStep
		case 'dashed':
			return concreteClassNames.diagramEdgeDashed
		case 'dotted':
			return concreteClassNames.diagramEdgeDotted
		case 'reference':
			return concreteClassNames.diagramEdgeReference
	}
}

function getFlowDiagramEdgeRelationClass(
	relation: FlowDiagramEdgeShape['relation']
): string | undefined {
	switch (relation) {
		case 'dashed':
			return concreteClassNames.diagramFlowEdgeDashed
		case 'dotted':
			return concreteClassNames.diagramFlowEdgeDotted
		case 'pulse':
			return concreteClassNames.diagramFlowEdgePulse
		case 'solid':
		case 'step':
			return undefined
	}
}

function getDiagramIntentClass(
	display: DiagramEdgeDisplay,
	intent: DataIntent | DiagramTone
): string | undefined {
	switch (display) {
		case 'canvas':
			return getCanvasDiagramIntentClass(intent)
		case 'flow':
			return getDataIntentClass(intent)
	}
}

function getCanvasDiagramIntentClass(intent: DiagramTone): string | undefined {
	switch (intent) {
		case 'error':
			return concreteClassNames.diagramEdgeToneError
		case 'ink':
			return concreteClassNames.diagramEdgeToneInk
		case 'muted':
			return undefined
		case 'sky':
			return concreteClassNames.diagramEdgeToneSky
		case 'terminal':
			return concreteClassNames.diagramEdgeToneTerminal
		case 'ultra':
			return concreteClassNames.diagramEdgeToneUltra
	}
}

function getDataIntentClass(intent: DataIntent): string | undefined {
	switch (intent) {
		case 'error':
			return concreteClassNames.dataToneError
		case 'muted':
			return concreteClassNames.dataToneMuted
		case 'sky':
			return concreteClassNames.dataToneSky
		case 'terminal':
			return concreteClassNames.dataToneTerminal
		case 'ultra':
			return concreteClassNames.dataToneUltra
		case 'ink':
			return undefined
	}
}
