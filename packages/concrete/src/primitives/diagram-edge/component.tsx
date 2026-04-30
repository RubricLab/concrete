import type { SVGAttributes } from 'react'
import type {
	DataTone,
	DiagramCanvasEdge as DiagramCanvasEdgeShape,
	DiagramTone,
	FlowDiagramEdge as FlowDiagramEdgeShape
} from '../../schemas'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

type DiagramEdgeLabel = {
	x: number
	y: number
}

export type DiagramCanvasEdgesProps = SVGAttributes<SVGSVGElement> & {
	height: number
	markerId: string
	reverseMarkerId: string
	width: number
}

export function DiagramCanvasEdges({
	children,
	className,
	height,
	markerId,
	reverseMarkerId,
	width,
	...props
}: DiagramCanvasEdgesProps) {
	return (
		<svg
			aria-hidden="true"
			className={cn(concreteClassNames.diagramCanvasEdges, className)}
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

export type DiagramCanvasEdgePathProps = SVGAttributes<SVGGElement> & {
	label?: string | undefined
	labelPoint: DiagramEdgeLabel
	markerEnd?: string | undefined
	markerStart?: string | undefined
	path: string
	selected?: boolean | undefined
	tone?: DiagramTone | undefined
	variant?: DiagramCanvasEdgeShape['variant'] | undefined
}

export function DiagramCanvasEdgePath({
	className,
	label,
	labelPoint,
	markerEnd,
	markerStart,
	path,
	selected = false,
	tone = 'muted',
	variant = 'solid',
	...props
}: DiagramCanvasEdgePathProps) {
	return (
		<g
			className={cn(
				concreteClassNames.diagramCanvasEdge,
				selected && concreteClassNames.diagramCanvasEdgeSelected,
				getDiagramCanvasEdgeVariantClass(variant),
				getDiagramCanvasToneClass(tone),
				className
			)}
			{...props}
		>
			<path d={path} markerEnd={markerEnd} markerStart={markerStart} />
			{label ? (
				<text x={labelPoint.x} y={labelPoint.y}>
					{label}
				</text>
			) : null}
		</g>
	)
}

export type FlowDiagramEdgePathProps = SVGAttributes<SVGGElement> & {
	label?: string | undefined
	labelPoint: DiagramEdgeLabel
	path: string
	selected?: boolean | undefined
	tone?: DataTone | undefined
	variant?: FlowDiagramEdgeShape['variant'] | undefined
}

export function FlowDiagramEdgePath({
	className,
	label,
	labelPoint,
	path,
	selected = false,
	tone = 'muted',
	variant = 'solid',
	...props
}: FlowDiagramEdgePathProps) {
	return (
		<g
			className={cn(
				concreteClassNames.flowDiagramEdge,
				selected && concreteClassNames.flowDiagramEdgeSelected,
				getFlowDiagramEdgeVariantClass(variant),
				getDataToneClass(tone),
				className
			)}
			{...props}
		>
			<path d={path} />
			{label ? (
				<text x={labelPoint.x} y={labelPoint.y}>
					{label}
				</text>
			) : null}
		</g>
	)
}

function getDiagramCanvasEdgeVariantClass(
	variant: DiagramCanvasEdgeShape['variant']
): string | undefined {
	switch (variant) {
		case 'bidirectional':
		case 'solid':
			return undefined
		case 'branch':
		case 'control':
			return concreteClassNames.diagramCanvasEdgeStep
		case 'dashed':
			return concreteClassNames.diagramCanvasEdgeDashed
		case 'dotted':
			return concreteClassNames.diagramCanvasEdgeDotted
		case 'reference':
			return concreteClassNames.diagramCanvasEdgeReference
	}
}

function getFlowDiagramEdgeVariantClass(
	variant: FlowDiagramEdgeShape['variant']
): string | undefined {
	switch (variant) {
		case 'dashed':
			return concreteClassNames.flowDiagramEdgeDashed
		case 'dotted':
			return concreteClassNames.flowDiagramEdgeDotted
		case 'pulse':
			return concreteClassNames.flowDiagramEdgePulse
		case 'solid':
		case 'step':
			return undefined
	}
}

function getDiagramCanvasToneClass(tone: DiagramTone): string | undefined {
	switch (tone) {
		case 'error':
			return concreteClassNames.diagramCanvasToneError
		case 'ink':
			return concreteClassNames.diagramCanvasToneInk
		case 'muted':
			return undefined
		case 'sky':
			return concreteClassNames.diagramCanvasToneSky
		case 'terminal':
			return concreteClassNames.diagramCanvasToneTerminal
		case 'ultra':
			return concreteClassNames.diagramCanvasToneUltra
	}
}

function getDataToneClass(tone: DataTone): string | undefined {
	switch (tone) {
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
