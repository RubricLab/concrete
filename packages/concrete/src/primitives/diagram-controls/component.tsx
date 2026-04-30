import type { ButtonHTMLAttributes, HTMLAttributes } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { Button } from '../button'
import { cn } from '../utils'

export type DiagramCanvasControlsProps = HTMLAttributes<HTMLDivElement> & {
	disabled?: boolean | undefined
	onFit?: (() => void) | undefined
	onZoomIn?: (() => void) | undefined
	onZoomOut?: (() => void) | undefined
	zoom: number
}

export function DiagramCanvasControls({
	className,
	disabled = false,
	onFit,
	onZoomIn,
	onZoomOut,
	zoom,
	...props
}: DiagramCanvasControlsProps) {
	return (
		<div className={cn(concreteClassNames.diagramCanvasControls, className)} {...props}>
			<Button
				aria-label="Zoom out"
				disabled={disabled}
				iconOnly
				{...(onZoomOut ? { onClick: onZoomOut } : {})}
				size="tiny"
				variant="secondary"
			>
				-
			</Button>
			<Button
				aria-label="Fit diagram"
				{...(onFit ? { onClick: onFit } : {})}
				size="tiny"
				variant="secondary"
			>
				{Math.round(zoom * 100)}%
			</Button>
			<Button
				aria-label="Zoom in"
				disabled={disabled}
				iconOnly
				{...(onZoomIn ? { onClick: onZoomIn } : {})}
				size="tiny"
				variant="secondary"
			>
				+
			</Button>
		</div>
	)
}

export type FlowDiagramControlsProps = HTMLAttributes<HTMLDivElement> & {
	onReset?: (() => void) | undefined
	onZoomIn?: (() => void) | undefined
	onZoomOut?: (() => void) | undefined
	zoomLabel?: string | undefined
}

export function FlowDiagramControls({
	className,
	onReset,
	onZoomIn,
	onZoomOut,
	zoomLabel = '1x',
	...props
}: FlowDiagramControlsProps) {
	return (
		<div className={cn(concreteClassNames.flowDiagramControls, className)} {...props}>
			<FlowDiagramControlButton aria-label="Zoom out" {...(onZoomOut ? { onClick: onZoomOut } : {})}>
				-
			</FlowDiagramControlButton>
			<FlowDiagramControlButton
				aria-label="Reset diagram viewport"
				{...(onReset ? { onClick: onReset } : {})}
			>
				{zoomLabel}
			</FlowDiagramControlButton>
			<FlowDiagramControlButton aria-label="Zoom in" {...(onZoomIn ? { onClick: onZoomIn } : {})}>
				+
			</FlowDiagramControlButton>
		</div>
	)
}

export type FlowDiagramControlButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export function FlowDiagramControlButton({
	className,
	type = 'button',
	...props
}: FlowDiagramControlButtonProps) {
	return <button className={className} type={type} {...props} />
}
