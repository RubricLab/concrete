import type { HTMLAttributes, ReactNode } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

export type DataCardHeaderProps = Omit<HTMLAttributes<HTMLElement>, 'title'> & {
	align?: 'center' | 'start' | undefined
	description?: ReactNode
	end?: ReactNode
	title?: ReactNode
}

export function DataCardHeader({
	align = 'start',
	className,
	description,
	end,
	title,
	...props
}: DataCardHeaderProps) {
	return (
		<header
			className={cn(concreteClassNames.dataCardHeader, className)}
			data-align={align}
			{...props}
		>
			<div className={concreteClassNames.dataCardHeaderBody}>
				{title ? <h3 className={concreteClassNames.dataCardHeaderTitle}>{title}</h3> : null}
				{description ? (
					<p className={concreteClassNames.dataCardHeaderDescription}>{description}</p>
				) : null}
			</div>
			{end}
		</header>
	)
}
