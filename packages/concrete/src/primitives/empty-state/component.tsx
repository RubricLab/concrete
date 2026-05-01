import type { HTMLAttributes, ReactElement, ReactNode } from 'react'
import { ConcreteIcon, type IconName } from '../../icons'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

type EmptyStateIconSlot = IconName | ReactElement

export type EmptyStateDensity = 'compact' | 'comfortable' | 'editorial'
export type EmptyStateIntent = 'neutral' | 'sky'

export type EmptyStateProps = Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
	action?: ReactNode
	body?: ReactNode
	density?: EmptyStateDensity
	icon?: EmptyStateIconSlot
	intent?: EmptyStateIntent
	title: ReactNode
}

const emptyStateDensityClassNames = {
	comfortable: undefined,
	compact: concreteClassNames.emptyStateSmall,
	editorial: concreteClassNames.emptyStateLarge
} satisfies Record<EmptyStateDensity, string | undefined>

export function EmptyState({
	action,
	body,
	className,
	density = 'comfortable',
	icon = 'search',
	intent = 'neutral',
	title,
	...props
}: EmptyStateProps) {
	return (
		<div
			className={cn(
				concreteClassNames.emptyState,
				emptyStateDensityClassNames[density],
				intent === 'sky' && concreteClassNames.emptyStateSky,
				className
			)}
			data-density={density}
			data-intent={intent}
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
