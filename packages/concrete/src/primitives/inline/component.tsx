import type { HTMLAttributes, ReactNode } from 'react'
import type { Density } from '../../foundations/state'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'
import type { InlineAlign, InlineJustify } from './schema'

type InlineElementProps = Omit<HTMLAttributes<HTMLDivElement>, 'style'>

export type InlineProps = InlineElementProps & {
	align?: InlineAlign
	children?: ReactNode
	density?: Density
	justify?: InlineJustify
}

export function Inline({
	align = 'center',
	children,
	className,
	density = 'comfortable',
	justify = 'start',
	...props
}: InlineProps) {
	return (
		<div
			className={cn(concreteClassNames.inline, className)}
			data-align={align}
			data-density={density}
			data-justify={justify}
			{...props}
		>
			{children}
		</div>
	)
}
