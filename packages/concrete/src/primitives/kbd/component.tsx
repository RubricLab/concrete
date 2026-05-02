import type { HTMLAttributes } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

export type KbdProps = HTMLAttributes<HTMLElement> & {
	intent?: 'default' | 'inverse'
}

export function Kbd({ children, className, intent = 'default', ...props }: KbdProps) {
	return (
		<kbd
			className={cn(
				concreteClassNames.kbd,
				intent === 'inverse' && concreteClassNames.kbdDark,
				className
			)}
			{...props}
		>
			{children}
		</kbd>
	)
}
