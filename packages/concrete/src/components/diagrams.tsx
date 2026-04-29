'use client'

import type { CSSProperties, PointerEvent, WheelEvent } from 'react'
import { useId, useMemo, useState } from 'react'
import { ConcreteIcon, type IconName } from '../icons'
import { Button, Card, DiagramItem, DiagramNode } from '../primitives'
import { cn } from '../primitives/utils'
import {
	type DiagramCanvasGraph,
	type DiagramCanvasProps,
	type DiagramTone,
	diagramCanvasPropsSchema
} from '../schemas'
import classes from './components.module.css'
import {
	clampDiagramViewport,
	createDiagramCanvasBox,
	type DiagramViewport,
	routeDiagramCanvasEdge
} from './diagram-geometry'

type ComponentShellProps = {
	className?: string
}

export function DiagramCanvas({
	className,
	onSelectionChange,
	onViewportChange,
	...props
}: DiagramCanvasProps & ComponentShellProps) {
	const parsedProps = diagramCanvasPropsSchema.parse(props)
	const markerId = `concrete-diagram-arrow-${useId().replace(/:/g, '')}`
	const reverseMarkerId = `${markerId}-reverse`
	const [viewport, setViewport] = useState<DiagramViewport>({ x: 0, y: 0, zoom: 1 })
	const [selectedId, setSelectedId] = useState(parsedProps.selectedId)
	const [panOrigin, setPanOrigin] = useState<{
		pointerId: number
		startX: number
		startY: number
		viewport: DiagramViewport
	} | null>(null)
	const activeSelectedId = parsedProps.selectedId ?? selectedId
	const graphBoxes = useMemo(
		() => getGraphBoxes(parsedProps.graph, parsedProps.width, parsedProps.height),
		[parsedProps.graph, parsedProps.height, parsedProps.width]
	)
	const transform = `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`

	function commitViewport(nextViewport: DiagramViewport) {
		const clampedViewport = clampDiagramViewport(nextViewport, parsedProps.width, parsedProps.height)
		setViewport(clampedViewport)
		onViewportChange?.(clampedViewport)
	}

	function selectElement(nextSelectedId: string) {
		setSelectedId(nextSelectedId)
		onSelectionChange?.(nextSelectedId)
	}

	function zoomFromCenter(multiplier: number) {
		if (!parsedProps.zoomable) {
			return
		}

		commitViewport({ ...viewport, zoom: viewport.zoom * multiplier })
	}

	function handleWheel(event: WheelEvent<HTMLDivElement>) {
		if (!parsedProps.zoomable || (!event.metaKey && !event.ctrlKey)) {
			return
		}

		event.preventDefault()
		commitViewport({
			...viewport,
			zoom: viewport.zoom * Math.exp(-event.deltaY * 0.00135)
		})
	}

	function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
		if (!parsedProps.pannable || event.button !== 0) {
			return
		}

		const target = event.target

		if (target instanceof HTMLElement && target.closest('[data-diagram-element]')) {
			return
		}

		event.currentTarget.setPointerCapture(event.pointerId)
		setPanOrigin({
			pointerId: event.pointerId,
			startX: event.clientX,
			startY: event.clientY,
			viewport
		})
	}

	function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
		if (!panOrigin || panOrigin.pointerId !== event.pointerId) {
			return
		}

		commitViewport({
			...panOrigin.viewport,
			x: panOrigin.viewport.x + event.clientX - panOrigin.startX,
			y: panOrigin.viewport.y + event.clientY - panOrigin.startY
		})
	}

	function handlePointerEnd(event: PointerEvent<HTMLDivElement>) {
		if (!panOrigin || panOrigin.pointerId !== event.pointerId) {
			return
		}

		setPanOrigin(null)
		event.currentTarget.releasePointerCapture(event.pointerId)
	}

	return (
		<Card className={cn(classes.diagramCanvasCard, className)} variant="raised">
			<header className={classes.diagramCanvasHeader}>
				<div className={classes.diagramCanvasTitleBlock}>
					<h3>{parsedProps.title}</h3>
				</div>
				{parsedProps.description ? (
					<p className={classes.diagramCanvasStatus}>
						<span />
						{parsedProps.description}
					</p>
				) : null}
			</header>
			<div
				className={cn(classes.diagramCanvasViewport, panOrigin && classes.diagramCanvasPanning)}
				onPointerCancel={handlePointerEnd}
				onPointerDown={handlePointerDown}
				onPointerMove={handlePointerMove}
				onPointerUp={handlePointerEnd}
				onWheel={handleWheel}
			>
				<DiagramCanvasRail />
				<div
					className={classes.diagramCanvasStage}
					style={
						{
							'--diagram-canvas-height': `${parsedProps.height}px`,
							'--diagram-canvas-transform': transform,
							'--diagram-canvas-width': `${parsedProps.width}px`
						} as CSSProperties
					}
				>
					<svg
						aria-hidden="true"
						className={classes.diagramCanvasEdges}
						viewBox={`0 0 ${parsedProps.width} ${parsedProps.height}`}
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
						{parsedProps.graph.edges.map(edge => {
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
										classes.diagramCanvasEdge,
										selected && classes.diagramCanvasEdgeSelected,
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
					{parsedProps.graph.nodes.map(node => (
						<div
							className={classes.diagramCanvasElement}
							data-diagram-element
							key={node.id}
							style={getDiagramElementStyle(node)}
						>
							<DiagramNode
								meta={node.meta}
								muted={node.muted}
								onClick={() => selectElement(node.id)}
								role={node.role}
								selected={node.selected || activeSelectedId === node.id}
								title={node.title}
							/>
						</div>
					))}
					{parsedProps.graph.items.map(item => (
						<button
							className={cn(classes.diagramCanvasElement, classes.diagramCanvasItemButton)}
							data-diagram-element
							key={item.id}
							onClick={() => selectElement(item.id)}
							style={getDiagramElementStyle(item)}
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
				</div>
				{parsedProps.minimap ? (
					<MiniMap graph={parsedProps.graph} selectedId={activeSelectedId} />
				) : null}
			</div>
			<footer className={classes.diagramCanvasFooter}>
				<DiagramCanvasLegend />
				{parsedProps.controls ? (
					<div className={classes.diagramCanvasControls}>
						<Button
							aria-label="Zoom out"
							disabled={!parsedProps.zoomable}
							iconOnly
							onClick={() => zoomFromCenter(1 / 1.14)}
							size="tiny"
							variant="secondary"
						>
							-
						</Button>
						<Button
							aria-label="Fit diagram"
							onClick={() => commitViewport({ x: 0, y: 0, zoom: 1 })}
							size="tiny"
							variant="secondary"
						>
							{Math.round(viewport.zoom * 100)}%
						</Button>
						<Button
							aria-label="Zoom in"
							disabled={!parsedProps.zoomable}
							iconOnly
							onClick={() => zoomFromCenter(1.14)}
							size="tiny"
							variant="secondary"
						>
							+
						</Button>
					</div>
				) : null}
			</footer>
		</Card>
	)
}

function DiagramCanvasRail() {
	const tools: readonly IconName[] = [
		'arrow-right',
		'square',
		'circle',
		'git-branch',
		'activity',
		'bar-chart-3'
	]

	return (
		<div aria-hidden="true" className={classes.diagramCanvasRail}>
			{tools.map((tool, index) => (
				<span className={index === 0 ? classes.diagramCanvasRailActive : undefined} key={tool}>
					<ConcreteIcon name={tool} />
				</span>
			))}
		</div>
	)
}

function DiagramCanvasLegend() {
	return (
		<div aria-hidden="true" className={classes.diagramCanvasLegend}>
			<span>
				<i className={classes.diagramCanvasLegendCompute} />
				Compute node
			</span>
			<span>
				<i className={classes.diagramCanvasLegendData} />
				Data / service
			</span>
			<span>
				<b className={classes.diagramCanvasLegendFlow} />
				Flow
			</span>
			<span>
				<b className={classes.diagramCanvasLegendEvent} />
				Event
			</span>
			<span>
				<b className={classes.diagramCanvasLegendReference} />
				Context
			</span>
		</div>
	)
}

function MiniMap({
	graph,
	selectedId
}: {
	graph: DiagramCanvasGraph
	selectedId: string | undefined
}) {
	return (
		<div aria-hidden="true" className={classes.diagramCanvasMinimap}>
			{graph.nodes.map(node => (
				<span
					className={cn(
						classes.diagramCanvasMinimapNode,
						(node.selected || selectedId === node.id) && classes.diagramCanvasMinimapSelected
					)}
					key={node.id}
					style={{ left: `${node.x}%`, top: `${node.y}%` }}
				/>
			))}
		</div>
	)
}

function getGraphBoxes(
	graph: DiagramCanvasGraph,
	width: number,
	height: number
): Map<string, ReturnType<typeof createDiagramCanvasBox>> {
	return new Map(
		[...graph.nodes, ...graph.items].map(element => [
			element.id,
			createDiagramCanvasBox(element, width, height)
		])
	)
}

function getDiagramElementStyle(element: { height: number; width: number; x: number; y: number }) {
	return {
		'--diagram-element-height': `${element.height}px`,
		'--diagram-element-width': `${element.width}px`,
		left: `${element.x}%`,
		top: `${element.y}%`
	} as CSSProperties
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
			return classes.diagramCanvasEdgeStep
		case 'dashed':
			return classes.diagramCanvasEdgeDashed
		case 'dotted':
			return classes.diagramCanvasEdgeDotted
		case 'reference':
			return classes.diagramCanvasEdgeReference
	}
}

function getDiagramCanvasToneClass(tone: DiagramTone): string | undefined {
	switch (tone) {
		case 'error':
			return classes.diagramCanvasToneError
		case 'ink':
			return classes.diagramCanvasToneInk
		case 'muted':
			return undefined
		case 'sky':
			return classes.diagramCanvasToneSky
		case 'terminal':
			return classes.diagramCanvasToneTerminal
		case 'ultra':
			return classes.diagramCanvasToneUltra
	}
}
