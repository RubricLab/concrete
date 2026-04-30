'use client'

import type { CSSProperties, PointerEvent } from 'react'
import { useId, useState } from 'react'
import { Card, Indicator } from '../../primitives'
import { cn } from '../../primitives/utils'
import {
	type FlowDiagramEdge,
	type FlowDiagramNode,
	type FlowDiagramProps,
	flowDiagramPropsSchema
} from '../../schemas'
import { concreteClassNames } from '../../styles/class-names'
import { clamp, routeDiagramEdge } from '../../utilities/data-geometry'
import { getDataToneClass, toIndicatorTone } from '../../utilities/data-tone'

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
		<Card className={cn(concreteClassNames.flowDiagramCard, className)} variant="raised">
			<header className={concreteClassNames.dataCardHeader}>
				<div>
					<h3>{parsedProps.title}</h3>
					{parsedProps.description ? <p>{parsedProps.description}</p> : null}
				</div>
				{parsedProps.controls ? (
					<div className={concreteClassNames.flowDiagramControls}>
						<button onClick={() => updateZoom(zoom - 0.1)} type="button">
							-
						</button>
						<button
							onClick={() => {
								setPan({ x: 0, y: 0 })
								updateZoom(1)
							}}
							type="button"
						>
							1x
						</button>
						<button onClick={() => updateZoom(zoom + 0.1)} type="button">
							+
						</button>
					</div>
				) : null}
			</header>
			<div className={concreteClassNames.flowDiagramViewport}>
				<svg
					aria-label={parsedProps.title}
					className={concreteClassNames.flowDiagramCanvas}
					role="img"
					style={{ '--diagram-height': `${parsedProps.height}px` } as CSSProperties}
					viewBox={viewBox}
				>
					<defs>
						<pattern height="18" id={gridId} patternUnits="userSpaceOnUse" width="18">
							<path d="M 18 0 L 0 0 0 18" fill="none" />
						</pattern>
					</defs>
					<rect
						className={concreteClassNames.flowDiagramGrid}
						height="100%"
						style={{ fill: `url(#${gridId})` }}
						width="100%"
						x={pan.x}
						y={pan.y}
					/>
					{parsedProps.flow.edges.map(edge => {
						const fromNode = nodeMap.get(edge.from)
						const toNode = nodeMap.get(edge.to)

						if (!fromNode || !toNode) {
							return null
						}

						const route = routeDiagramEdge(fromNode, toNode, edge)
						const selected = edge.selected || parsedProps.selectedEdgeId === edge.id

						return (
							<g
								className={cn(
									concreteClassNames.flowDiagramEdge,
									selected && concreteClassNames.flowDiagramEdgeSelected,
									getFlowEdgeVariantClass(edge.variant),
									getDataToneClass(edge.tone)
								)}
								key={edge.id}
							>
								<path d={route.path} />
								{edge.label ? (
									<text x={route.label.x} y={route.label.y - 6}>
										{edge.label}
									</text>
								) : null}
							</g>
						)
					})}
					{nodes.map(node => {
						const selected = node.selected || parsedProps.selectedNodeId === node.id

						return (
							// biome-ignore lint/a11y/noStaticElementInteractions: SVG nodes expose canvas hit areas.
							<g
								className={cn(
									concreteClassNames.flowDiagramNode,
									selected && concreteClassNames.flowDiagramNodeSelected,
									node.tone === 'accent' && concreteClassNames.flowDiagramNodeAccent,
									node.tone === 'inverse' && concreteClassNames.flowDiagramNodeInverse
								)}
								key={node.id}
								onClick={() => onNodeSelect?.(node.id)}
								onPointerMove={event => moveNode(node, event)}
							>
								<rect height={node.height} rx="8" width={node.width} x={node.x} y={node.y} />
								<text className={concreteClassNames.flowDiagramNodeTitle} x={node.x + 14} y={node.y + 27}>
									{node.title}
								</text>
								{node.subtitle ? (
									<text
										className={concreteClassNames.flowDiagramNodeSubtitle}
										x={node.x + 14}
										y={node.y + 47}
									>
										{node.subtitle}
									</text>
								) : null}
							</g>
						)
					})}
				</svg>
			</div>
			{parsedProps.legend.length > 0 ? (
				<footer className={concreteClassNames.chartLegend}>
					{parsedProps.legend.map(item => (
						<Indicator key={item.label} tone={toIndicatorTone(item.tone)}>
							{item.label}
						</Indicator>
					))}
				</footer>
			) : null}
		</Card>
	)
}

function getFlowEdgeVariantClass(variant: FlowDiagramEdge['variant']): string | undefined {
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
