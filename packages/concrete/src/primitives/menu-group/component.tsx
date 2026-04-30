import type { HTMLAttributes, ReactNode } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

export type MenuGroupProps = Omit<HTMLAttributes<HTMLElement>, 'style' | 'title'> & {
	children: ReactNode
	title: ReactNode
}

export function MenuGroup({ children, className, title, ...props }: MenuGroupProps) {
	return (
		<section className={cn(concreteClassNames.menuGroup, className)} {...props}>
			<div className={concreteClassNames.menuGroupTitle}>{title}</div>
			<div className={concreteClassNames.menuGroupItems}>{children}</div>
		</section>
	)
}
