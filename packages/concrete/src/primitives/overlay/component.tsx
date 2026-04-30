import type { HTMLAttributes, ReactNode } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'
import type { OverlayPlacement, OverlayPresentation } from './schema'

export type OverlayProps = Omit<HTMLAttributes<HTMLDivElement>, 'style'> & {
	children: ReactNode
	open?: boolean
	placement?: OverlayPlacement
	presentation?: OverlayPresentation
	scrim?: boolean
}

export function Overlay({
	children,
	className,
	open = true,
	placement = 'center',
	presentation = 'inline',
	scrim = false,
	...props
}: OverlayProps) {
	return (
		<div
			className={cn(concreteClassNames.overlay, className)}
			data-open={open ? true : undefined}
			data-placement={placement}
			data-presentation={presentation}
			data-scrim={scrim ? true : undefined}
			hidden={open ? undefined : true}
			{...props}
		>
			{children}
		</div>
	)
}
