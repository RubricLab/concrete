'use client'

import type { PointerEvent, WheelEvent } from 'react'
import { useId, useMemo, useState } from 'react'
import { Card } from '../primitives'
import { cn } from '../primitives/utils'
import { type DiagramCanvasProps, diagramCanvasPropsSchema } from '../schemas'
import { concreteClassNames } from '../styles/class-names'
import {
	getDiagramCanvasGraphBoxes,
	getDiagramCanvasStageStyle,
	getDiagramCanvasTransform
} from './diagram-canvas-logic'
import {
	DiagramCanvasControls,
	DiagramCanvasGraphLayer,
	DiagramCanvasLegend,
	DiagramCanvasMiniMap,
	DiagramCanvasRail
} from './diagram-canvas-rendering'
import { clampDiagramViewport, type DiagramViewport } from './diagram-geometry'

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
		() => getDiagramCanvasGraphBoxes(parsedProps.graph, parsedProps.width, parsedProps.height),
		[parsedProps.graph, parsedProps.height, parsedProps.width]
	)
	const transform = getDiagramCanvasTransform(viewport)

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
		<Card className={cn(concreteClassNames.diagramCanvasCard, className)} variant="raised">
			<header className={concreteClassNames.diagramCanvasHeader}>
				<div className={concreteClassNames.diagramCanvasTitleBlock}>
					<h3>{parsedProps.title}</h3>
				</div>
				{parsedProps.description ? (
					<p className={concreteClassNames.diagramCanvasStatus}>
						<span />
						{parsedProps.description}
					</p>
				) : null}
			</header>
			<div
				className={cn(
					concreteClassNames.diagramCanvasViewport,
					panOrigin && concreteClassNames.diagramCanvasPanning
				)}
				onPointerCancel={handlePointerEnd}
				onPointerDown={handlePointerDown}
				onPointerMove={handlePointerMove}
				onPointerUp={handlePointerEnd}
				onWheel={handleWheel}
			>
				<DiagramCanvasRail />
				<div
					className={concreteClassNames.diagramCanvasStage}
					style={getDiagramCanvasStageStyle({
						height: parsedProps.height,
						transform,
						width: parsedProps.width
					})}
				>
					<DiagramCanvasGraphLayer
						activeSelectedId={activeSelectedId}
						graph={parsedProps.graph}
						graphBoxes={graphBoxes}
						height={parsedProps.height}
						markerId={markerId}
						onSelectElement={selectElement}
						reverseMarkerId={reverseMarkerId}
						width={parsedProps.width}
					/>
				</div>
				{parsedProps.minimap ? (
					<DiagramCanvasMiniMap graph={parsedProps.graph} selectedId={activeSelectedId} />
				) : null}
			</div>
			<footer className={concreteClassNames.diagramCanvasFooter}>
				<DiagramCanvasLegend />
				{parsedProps.controls ? (
					<DiagramCanvasControls
						disabled={!parsedProps.zoomable}
						onFit={() => commitViewport({ x: 0, y: 0, zoom: 1 })}
						onZoomIn={() => zoomFromCenter(1.14)}
						onZoomOut={() => zoomFromCenter(1 / 1.14)}
						viewport={viewport}
					/>
				) : null}
			</footer>
		</Card>
	)
}
