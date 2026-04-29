import { ConcreteIcon, type IconName } from '../icons'
import { Button, DiagramItem, DiagramNode } from '../primitives'
import { cn } from '../primitives/utils'
import type { DiagramCanvasGraph, DiagramTone } from '../schemas'
import { concreteClassNames } from '../styles/class-names'
import { getDiagramCanvasElementStyle } from './diagram-canvas-logic'
import {
	type DiagramCanvasBox,
	type DiagramViewport,
	routeDiagramCanvasEdge
} from './diagram-geometry'

type DiagramCanvasGraphLayerProps = {
	activeSelectedId: string | undefined
	graph: DiagramCanvasGraph
	graphBoxes: ReadonlyMap<string, DiagramCanvasBox>
	height: number
	markerId: string
	onSelectElement: (nextSelectedId: string) => void
	reverseMarkerId: string
	width: number
}

type DiagramCanvasControlsProps = {
	disabled: boolean
	onFit: () => void
	onZoomIn: () => void
	onZoomOut: () => void
	viewport: DiagramViewport
}

export function DiagramCanvasRail() {
	const tools: readonly IconName[] = [
		'arrow-right',
		'square',
		'circle',
		'git-branch',
		'activity',
		'bar-chart-3'
	]

	return (
		<div aria-hidden="true" className={concreteClassNames.diagramCanvasRail}>
			{tools.map((tool, index) => (
				<span
					className={index === 0 ? concreteClassNames.diagramCanvasRailActive : undefined}
					key={tool}
				>
					<ConcreteIcon name={tool} />
				</span>
			))}
		</div>
	)
}

export function DiagramCanvasGraphLayer({
	activeSelectedId,
	graph,
	graphBoxes,
	height,
	markerId,
	onSelectElement,
	reverseMarkerId,
	width
}: DiagramCanvasGraphLayerProps) {
	return (
		<>
			<svg
				aria-hidden="true"
				className={concreteClassNames.diagramCanvasEdges}
				viewBox={`0 0 ${width} ${height}`}
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
				{graph.edges.map(edge => {
					const fromBox = graphBoxes.get(edge.from)
					const toBox = graphBoxes.get(edge.to)

					if (!fromBox || !toBox) {
						return null
					}

					const route = routeDiagramCanvasEdge(fromBox, toBox, edge)
					const selected = edge.selected || activeSelectedId === edge.id

					return (
						<g
							className={cn(
								concreteClassNames.diagramCanvasEdge,
								selected && concreteClassNames.diagramCanvasEdgeSelected,
								getDiagramCanvasEdgeVariantClass(edge.variant),
								getDiagramCanvasToneClass(edge.tone)
							)}
							key={edge.id}
						>
							<path
								d={route.path}
								markerEnd={`url(#${markerId})`}
								markerStart={edge.variant === 'bidirectional' ? `url(#${reverseMarkerId})` : undefined}
							/>
							{edge.label ? (
								<text x={route.label.x} y={route.label.y - 8}>
									{edge.label}
								</text>
							) : null}
						</g>
					)
				})}
			</svg>
			{graph.nodes.map(node => (
				<div
					className={concreteClassNames.diagramCanvasElement}
					data-diagram-element
					key={node.id}
					style={getDiagramCanvasElementStyle(node)}
				>
					<DiagramNode
						meta={node.meta}
						muted={node.muted}
						onClick={() => onSelectElement(node.id)}
						role={node.role}
						selected={node.selected || activeSelectedId === node.id}
						title={node.title}
					/>
				</div>
			))}
			{graph.items.map(item => (
				<button
					className={cn(
						concreteClassNames.diagramCanvasElement,
						concreteClassNames.diagramCanvasItemButton
					)}
					data-diagram-element
					key={item.id}
					onClick={() => onSelectElement(item.id)}
					style={getDiagramCanvasElementStyle(item)}
					type="button"
				>
					<DiagramItem
						body={item.body}
						kind={item.kind}
						meta={item.meta}
						muted={item.muted}
						selected={item.selected || activeSelectedId === item.id}
						title={item.title}
						tone={item.tone}
						value={item.value}
					/>
				</button>
			))}
		</>
	)
}

export function DiagramCanvasMiniMap({
	graph,
	selectedId
}: {
	graph: DiagramCanvasGraph
	selectedId: string | undefined
}) {
	return (
		<div aria-hidden="true" className={concreteClassNames.diagramCanvasMinimap}>
			{graph.nodes.map(node => (
				<span
					className={cn(
						concreteClassNames.diagramCanvasMinimapNode,
						(node.selected || selectedId === node.id) && concreteClassNames.diagramCanvasMinimapSelected
					)}
					key={node.id}
					style={{ left: `${node.x}%`, top: `${node.y}%` }}
				/>
			))}
		</div>
	)
}

export function DiagramCanvasLegend() {
	return (
		<div aria-hidden="true" className={concreteClassNames.diagramCanvasLegend}>
			<span>
				<i className={concreteClassNames.diagramCanvasLegendCompute} />
				Compute node
			</span>
			<span>
				<i className={concreteClassNames.diagramCanvasLegendData} />
				Data / service
			</span>
			<span>
				<b className={concreteClassNames.diagramCanvasLegendFlow} />
				Flow
			</span>
			<span>
				<b className={concreteClassNames.diagramCanvasLegendEvent} />
				Event
			</span>
			<span>
				<b className={concreteClassNames.diagramCanvasLegendReference} />
				Context
			</span>
		</div>
	)
}

export function DiagramCanvasControls({
	disabled,
	onFit,
	onZoomIn,
	onZoomOut,
	viewport
}: DiagramCanvasControlsProps) {
	return (
		<div className={concreteClassNames.diagramCanvasControls}>
			<Button
				aria-label="Zoom out"
				disabled={disabled}
				iconOnly
				onClick={onZoomOut}
				size="tiny"
				variant="secondary"
			>
				-
			</Button>
			<Button aria-label="Fit diagram" onClick={onFit} size="tiny" variant="secondary">
				{Math.round(viewport.zoom * 100)}%
			</Button>
			<Button
				aria-label="Zoom in"
				disabled={disabled}
				iconOnly
				onClick={onZoomIn}
				size="tiny"
				variant="secondary"
			>
				+
			</Button>
		</div>
	)
}

function getDiagramCanvasEdgeVariantClass(
	variant: DiagramCanvasGraph['edges'][number]['variant']
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
