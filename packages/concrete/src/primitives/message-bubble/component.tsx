import type { HTMLAttributes } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

export type MessageBubbleDirection = 'inbound' | 'outbound'

export type MessageBubbleProps = HTMLAttributes<HTMLDivElement> & {
	direction?: MessageBubbleDirection
}

export function MessageBubble({
	children,
	className,
	direction = 'inbound',
	...props
}: MessageBubbleProps) {
	return (
		<div
			className={cn(
				concreteClassNames.messageBubble,
				direction === 'outbound' && concreteClassNames.messageBubbleOutbound,
				className
			)}
			{...props}
		>
			{children}
		</div>
	)
}
