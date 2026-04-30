import type { HTMLAttributes } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

export type KbdProps = HTMLAttributes<HTMLElement> & {
	tone?: 'dark' | 'default'
}

export function Kbd({ children, className, tone = 'default', ...props }: KbdProps) {
	return (
		<kbd
			className={cn(concreteClassNames.kbd, tone === 'dark' && concreteClassNames.kbdDark, className)}
			{...props}
		>
			{children}
		</kbd>
	)
}
