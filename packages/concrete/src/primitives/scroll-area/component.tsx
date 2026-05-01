import type { HTMLAttributes, ReactNode } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'
import type { ScrollAreaExtent } from './schema'

type ScrollAreaElementProps = Omit<HTMLAttributes<HTMLDivElement>, 'style'>

export type ScrollAreaProps = ScrollAreaElementProps & {
	children?: ReactNode
	extent?: ScrollAreaExtent
}

export function ScrollArea({ children, className, extent = 'medium', ...props }: ScrollAreaProps) {
	return (
		<div className={cn(concreteClassNames.scrollArea, className)} data-extent={extent} {...props}>
			{children}
		</div>
	)
}
