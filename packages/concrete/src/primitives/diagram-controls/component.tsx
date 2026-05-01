import type { HTMLAttributes, ReactNode } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { Button } from '../button'
import { cn } from '../utils'

export type DiagramControlsProps = HTMLAttributes<HTMLDivElement> & {
	disabled?: boolean | undefined
	onReset?: (() => void) | undefined
	onZoomIn?: (() => void) | undefined
	onZoomOut?: (() => void) | undefined
	zoom?: number | undefined
	zoomLabel?: ReactNode
}

export function DiagramControls({
	className,
	disabled = false,
	onReset,
	onZoomIn,
	onZoomOut,
	zoom = 1,
	zoomLabel,
	...props
}: DiagramControlsProps) {
	const label = zoomLabel ?? `${Math.round(zoom * 100)}%`

	return (
		<div className={cn(concreteClassNames.diagramControls, className)} {...props}>
			<Button
				aria-label="Zoom out"
				disabled={disabled}
				density="tiny"
				hierarchy="secondary"
				iconOnly
				{...(onZoomOut ? { onClick: onZoomOut } : {})}
			>
				-
			</Button>
			<Button
				aria-label="Reset diagram viewport"
				density="tiny"
				hierarchy="secondary"
				{...(onReset ? { onClick: onReset } : {})}
			>
				{label}
			</Button>
			<Button
				aria-label="Zoom in"
				disabled={disabled}
				density="tiny"
				hierarchy="secondary"
				iconOnly
				{...(onZoomIn ? { onClick: onZoomIn } : {})}
			>
				+
			</Button>
		</div>
	)
}
