'use client'

import type { PointerEvent, WheelEvent } from 'react'
import { useId, useMemo, useState } from 'react'
import {
	DiagramControls,
	DiagramEdgePath,
	DiagramEdges,
	DiagramElement,
	DiagramElementButton,
	DiagramFooter,
	DiagramHeader,
	DiagramItem,
	DiagramLegend,
	DiagramMiniMap,
	DiagramNode,
	DiagramRail,
	DiagramShell,
	DiagramStage,
	DiagramViewport
} from '../../primitives'
import {
	type DiagramCanvasGraph,
	type DiagramCanvasProps,
	diagramCanvasPropsSchema
} from '../../schemas'
import {
	clampDiagramViewport,
	createDiagramCanvasBox,
	type DiagramCanvasBox,
	type DiagramViewport as DiagramViewportState,
	routeDiagramCanvasEdge
} from '../../utilities/diagram-geometry'

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
	const [viewport, setViewport] = useState<DiagramViewportState>({ x: 0, y: 0, zoom: 1 })
	const [selectedId, setSelectedId] = useState(parsedProps.selectedId)
	const [panOrigin, setPanOrigin] = useState<{
		pointerId: number
		startX: number
		startY: number
		viewport: DiagramViewportState
	} | null>(null)
	const activeSelectedId = parsedProps.selectedId ?? selectedId
	const graphBoxes = useMemo(
		() => getDiagramCanvasGraphBoxes(parsedProps.graph, parsedProps.width, parsedProps.height),
		[parsedProps.graph, parsedProps.height, parsedProps.width]
	)
	const transform = getDiagramCanvasTransform(viewport)

	function commitViewport(nextViewport: DiagramViewportState) {
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
		<DiagramShell className={className}>
			<DiagramHeader description={parsedProps.description} title={parsedProps.title} />
			<DiagramViewport
				onPointerCancel={handlePointerEnd}
				onPointerDown={handlePointerDown}
				onPointerMove={handlePointerMove}
				onPointerUp={handlePointerEnd}
				onWheel={handleWheel}
				panning={Boolean(panOrigin)}
			>
				{parsedProps.controls ? <DiagramRail /> : null}
				<DiagramStage height={parsedProps.height} transform={transform} width={parsedProps.width}>
					<DiagramEdges
						height={parsedProps.height}
						markerId={markerId}
						reverseMarkerId={reverseMarkerId}
						width={parsedProps.width}
					>
						{parsedProps.graph.edges.map(edge => {
							const fromBox = graphBoxes.get(edge.from)
							const toBox = graphBoxes.get(edge.to)

							if (!fromBox || !toBox) {
								return null
							}

							const route = routeDiagramCanvasEdge(fromBox, toBox, edge)
							const selected = edge.selected || activeSelectedId === edge.id

							return (
								<DiagramEdgePath
									key={edge.id}
									label={edge.label}
									labelPoint={route.label}
									markerEnd={`url(#${markerId})`}
									markerStart={edge.relation === 'bidirectional' ? `url(#${reverseMarkerId})` : undefined}
									path={route.path}
									selected={selected}
									intent={edge.intent}
									relation={edge.relation}
								/>
							)
						})}
					</DiagramEdges>
					{parsedProps.graph.nodes.map(node => (
						<DiagramElement height={node.height} key={node.id} width={node.width} x={node.x} y={node.y}>
							<DiagramNode
								meta={node.meta}
								muted={node.muted}
								onClick={() => selectElement(node.id)}
								role={node.role}
								selected={node.selected || activeSelectedId === node.id}
								title={node.title}
							/>
						</DiagramElement>
					))}
					{parsedProps.graph.items.map(item => (
						<DiagramElementButton
							height={item.height}
							key={item.id}
							onClick={() => selectElement(item.id)}
							width={item.width}
							x={item.x}
							y={item.y}
						>
							<DiagramItem
								body={item.body}
								kind={item.kind}
								meta={item.meta}
								muted={item.muted}
								selected={item.selected || activeSelectedId === item.id}
								title={item.title}
								intent={item.intent}
								value={item.value}
							/>
						</DiagramElementButton>
					))}
				</DiagramStage>
				{parsedProps.minimap ? (
					<DiagramMiniMap nodes={parsedProps.graph.nodes} selectedId={activeSelectedId} />
				) : null}
			</DiagramViewport>
			<DiagramFooter>
				<DiagramLegend />
				{parsedProps.controls ? (
					<DiagramControls
						disabled={!parsedProps.zoomable}
						onReset={() => commitViewport({ x: 0, y: 0, zoom: 1 })}
						onZoomIn={() => zoomFromCenter(1.14)}
						onZoomOut={() => zoomFromCenter(1 / 1.14)}
						zoom={viewport.zoom}
					/>
				) : null}
			</DiagramFooter>
		</DiagramShell>
	)
}

function getDiagramCanvasGraphBoxes(
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

function getDiagramCanvasTransform(viewport: DiagramViewportState): string {
	return `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`
}
