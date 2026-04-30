'use client'

import type { PointerEvent } from 'react'
import { useId, useState } from 'react'
import {
	ChartLegend,
	ChartLegendItem,
	DataCardHeader,
	FlowDiagramControls,
	FlowDiagramEdgePath,
	FlowDiagramShell,
	FlowDiagramSvg,
	FlowDiagramViewport,
	FlowNode
} from '../../primitives'
import { type FlowDiagramNode, type FlowDiagramProps, flowDiagramPropsSchema } from '../../schemas'
import { clamp, routeDiagramEdge } from '../../utilities/data-geometry'
import { toIndicatorTone } from '../../utilities/data-tone'

type ComponentShellProps = {
	className?: string
}

export function FlowDiagram({
	className,
	onNodeMove,
	onNodeSelect,
	onViewportChange,
	...props
}: FlowDiagramProps & ComponentShellProps) {
	const parsedProps = flowDiagramPropsSchema.parse(props)
	const gridId = `concrete-diagram-grid-${useId().replace(/:/g, '')}`
	const [zoom, setZoom] = useState(1)
	const [pan, setPan] = useState({ x: 0, y: 0 })
	const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>({})
	const nodes = parsedProps.flow.nodes.map(node => ({
		...node,
		...(positions[node.id] ?? {})
	}))
	const nodeMap = new Map(nodes.map(node => [node.id, node]))
	const viewBox = `${pan.x} ${pan.y} ${parsedProps.width / zoom} ${parsedProps.height / zoom}`

	function moveNode(node: FlowDiagramNode, event: PointerEvent<SVGGElement>) {
		if (!parsedProps.draggableNodes) {
			return
		}

		const nextPosition = {
			x: Math.round(node.x + event.movementX / zoom),
			y: Math.round(node.y + event.movementY / zoom)
		}

		setPositions(currentPositions => ({
			...currentPositions,
			[node.id]: nextPosition
		}))
		onNodeMove?.(node.id, nextPosition)
	}

	function updateZoom(nextZoom: number) {
		const clampedZoom = clamp(nextZoom, 0.75, 1.5)
		setZoom(clampedZoom)
		onViewportChange?.({ ...pan, zoom: clampedZoom })
	}

	return (
		<FlowDiagramShell className={className}>
			<DataCardHeader
				description={parsedProps.description}
				end={
					parsedProps.controls ? (
						<FlowDiagramControls
							onReset={() => {
								setPan({ x: 0, y: 0 })
								updateZoom(1)
							}}
							onZoomIn={() => updateZoom(zoom + 0.1)}
							onZoomOut={() => updateZoom(zoom - 0.1)}
						/>
					) : null
				}
				title={parsedProps.title}
			/>
			<FlowDiagramViewport>
				<FlowDiagramSvg
					gridId={gridId}
					height={parsedProps.height}
					panX={pan.x}
					panY={pan.y}
					title={parsedProps.title}
					viewBox={viewBox}
				>
					{parsedProps.flow.edges.map(edge => {
						const fromNode = nodeMap.get(edge.from)
						const toNode = nodeMap.get(edge.to)

						if (!fromNode || !toNode) {
							return null
						}

						const route = routeDiagramEdge(fromNode, toNode, edge)
						const selected = edge.selected || parsedProps.selectedEdgeId === edge.id

						return (
							<FlowDiagramEdgePath
								key={edge.id}
								label={edge.label}
								labelPoint={route.label}
								path={route.path}
								selected={selected}
								tone={edge.tone}
								variant={edge.variant}
							/>
						)
					})}
					{nodes.map(node => {
						const selected = node.selected || parsedProps.selectedNodeId === node.id

						return (
							<FlowNode
								height={node.height}
								key={node.id}
								onClick={() => onNodeSelect?.(node.id)}
								onPointerMove={event => moveNode(node, event)}
								selected={selected}
								subtitle={node.subtitle}
								title={node.title}
								tone={node.tone}
								width={node.width}
								x={node.x}
								y={node.y}
							/>
						)
					})}
				</FlowDiagramSvg>
			</FlowDiagramViewport>
			{parsedProps.legend.length > 0 ? (
				<ChartLegend>
					{parsedProps.legend.map(item => (
						<ChartLegendItem key={item.label} label={item.label} tone={toIndicatorTone(item.tone)} />
					))}
				</ChartLegend>
			) : null}
		</FlowDiagramShell>
	)
}
