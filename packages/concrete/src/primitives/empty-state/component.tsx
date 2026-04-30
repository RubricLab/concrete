import type { HTMLAttributes, ReactElement, ReactNode } from 'react'
import { ConcreteIcon, type IconName } from '../../icons'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

type EmptyStateIconSlot = IconName | ReactElement

export type EmptyStateSize = 'large' | 'medium' | 'small'
export type EmptyStateTone = 'default' | 'sky'

export type EmptyStateProps = Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
	action?: ReactNode
	body?: ReactNode
	icon?: EmptyStateIconSlot
	size?: EmptyStateSize
	title: ReactNode
	tone?: EmptyStateTone
}

const emptyStateSizeClassNames = {
	large: concreteClassNames.emptyStateLarge,
	medium: undefined,
	small: concreteClassNames.emptyStateSmall
} satisfies Record<EmptyStateSize, string | undefined>

export function EmptyState({
	action,
	body,
	className,
	icon = 'search',
	size = 'medium',
	title,
	tone = 'default',
	...props
}: EmptyStateProps) {
	return (
		<div
			className={cn(
				concreteClassNames.emptyState,
				emptyStateSizeClassNames[size],
				tone === 'sky' && concreteClassNames.emptyStateSky,
				className
			)}
			{...props}
		>
			<span className={concreteClassNames.mark}>{renderEmptyStateIconSlot(icon)}</span>
			<div>
				<h3 className={concreteClassNames.emptyTitle}>{title}</h3>
				{body ? <p className={concreteClassNames.emptyBody}>{body}</p> : null}
			</div>
			{action}
		</div>
	)
}

function renderEmptyStateIconSlot(icon: EmptyStateIconSlot | undefined): ReactNode {
	switch (typeof icon) {
		case 'string':
			return <ConcreteIcon name={icon} />
		default:
			return icon
	}
}
