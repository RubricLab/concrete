import type { HTMLAttributes, ReactNode } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'
import type { ScrollAreaSize } from './schema'

type ScrollAreaElementProps = Omit<HTMLAttributes<HTMLDivElement>, 'style'>

export type ScrollAreaProps = ScrollAreaElementProps & {
	children?: ReactNode
	size?: ScrollAreaSize
}

export function ScrollArea({ children, className, size = 'medium', ...props }: ScrollAreaProps) {
	return (
		<div className={cn(concreteClassNames.scrollArea, className)} data-size={size} {...props}>
			{children}
		</div>
	)
}
