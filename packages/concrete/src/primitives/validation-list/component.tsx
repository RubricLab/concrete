import type { HTMLAttributes, ReactNode } from 'react'
import { ConcreteIcon } from '../../icons'
import type { FieldStatus } from '../../schemas'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

export type ValidationListItem = {
	href?: string | undefined
	id: string
	label: ReactNode
	message: ReactNode
	status?: FieldStatus | undefined
}

export type ValidationListProps = Omit<HTMLAttributes<HTMLUListElement>, 'style'> & {
	items: readonly ValidationListItem[]
	status?: FieldStatus | undefined
}

export function ValidationList({
	className,
	items,
	status = 'error',
	...props
}: ValidationListProps) {
	return (
		<ul className={cn(concreteClassNames.validationList, className)} {...props}>
			{items.map(item => (
				<li
					className={concreteClassNames.validationListItem}
					data-status={item.status ?? status}
					key={item.id}
				>
					<ConcreteIcon
						className={concreteClassNames.validationListIcon}
						name={(item.status ?? status) === 'success' ? 'check' : 'x'}
					/>
					<span className={concreteClassNames.validationListCopy}>
						{item.href ? <a href={item.href}>{item.label}</a> : <b>{item.label}</b>}
						<small>{item.message}</small>
					</span>
				</li>
			))}
		</ul>
	)
}
