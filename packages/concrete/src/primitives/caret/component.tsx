import type { HTMLAttributes } from 'react'
import { ConcreteIcon } from '../../icons'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

export type CaretDirection = 'down' | 'right' | 'up'
export type CaretSize = 'large' | 'medium' | 'small'

export type CaretProps = HTMLAttributes<HTMLSpanElement> & {
	direction?: CaretDirection
	open?: boolean
	size?: CaretSize
}

export function Caret({
	className,
	direction = 'right',
	open = false,
	size = 'medium',
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
				size === 'small' && concreteClassNames.caretSmall,
				size === 'large' && concreteClassNames.caretLarge,
				className
			)}
			{...props}
		>
			<ConcreteIcon name="chevron-right" />
		</span>
	)
}
