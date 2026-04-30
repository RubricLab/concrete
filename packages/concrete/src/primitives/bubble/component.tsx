import type { HTMLAttributes } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

export type BubbleDirection = 'inbound' | 'outbound'

export type BubbleProps = HTMLAttributes<HTMLDivElement> & {
	direction?: BubbleDirection
}

export function Bubble({ children, className, direction = 'inbound', ...props }: BubbleProps) {
	return (
		<div
			className={cn(
				concreteClassNames.bubble,
				direction === 'outbound' && concreteClassNames.bubbleOutbound,
				className
			)}
			{...props}
		>
			{children}
		</div>
	)
}
