import type { HTMLAttributes } from 'react'
import { ConcreteIcon } from '../../icons'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

export type CaretDirection = 'down' | 'right' | 'up'
export type CaretScale = 'large' | 'medium' | 'small'

export type CaretProps = HTMLAttributes<HTMLSpanElement> & {
	direction?: CaretDirection
	open?: boolean
	scale?: CaretScale
}

export function Caret({
	className,
	direction = 'right',
	open = false,
	scale = 'medium',
	...props
}: CaretProps) {
	return (
		<span
			aria-hidden
			className={cn(
				concreteClassNames.caret,
				open && concreteClassNames.caretOpen,
				direction === 'up' && concreteClassNames.caretUp,
				direction === 'down' && concreteClassNames.caretDown,
				scale === 'small' && concreteClassNames.caretSmall,
				scale === 'large' && concreteClassNames.caretLarge,
				className
			)}
			{...props}
		>
			<ConcreteIcon name="chevron-right" />
		</span>
	)
}
