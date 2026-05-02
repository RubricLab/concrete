import type { HTMLAttributes, ReactNode } from 'react'
import type { Density } from '../../foundations/state'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'
import type { SurfaceDepth, SurfaceElement, SurfaceIntent, SurfacePlacement } from './schema'

type SurfaceElementProps = Omit<HTMLAttributes<HTMLElement>, 'style'>

export type SurfaceProps = SurfaceElementProps & {
	as?: SurfaceElement
	children?: ReactNode
	density?: Density
	depth?: SurfaceDepth
	disabled?: boolean
	interactive?: boolean
	placement?: SurfacePlacement
	selected?: boolean
	intent?: SurfaceIntent
}

export function Surface({
	as = 'div',
	children,
	className,
	density = 'comfortable',
	depth = 'flat',
	disabled = false,
	interactive = false,
	placement = 'static',
	selected = false,
	intent = 'default',
	...props
}: SurfaceProps) {
	const SurfaceTag = as

	return (
		<SurfaceTag
			aria-disabled={disabled || undefined}
			className={cn(concreteClassNames.surface, className)}
			data-density={density}
			data-depth={depth}
			data-disabled={disabled ? 'true' : undefined}
			data-interactive={interactive ? 'true' : undefined}
			data-placement={placement}
			data-selected={selected ? 'true' : undefined}
			data-intent={intent}
			{...props}
		>
			{children}
		</SurfaceTag>
	)
}
