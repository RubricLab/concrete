import type { HTMLAttributes, ReactNode } from 'react'
import { ConcreteIcon } from '../../icons'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

export type FeedbackPanelStatus = 'error' | 'success'

export type FeedbackPanelItem = {
	href?: string | undefined
	id: string
	label: ReactNode
	message: ReactNode
	status?: FeedbackPanelStatus | undefined
}

export type FeedbackPanelProps = HTMLAttributes<HTMLDivElement> & {
	action?: ReactNode | undefined
	description?: ReactNode | undefined
	items?: readonly FeedbackPanelItem[] | undefined
	status?: FeedbackPanelStatus | undefined
	title?: ReactNode | undefined
}

export function FeedbackPanel({
	action,
	className,
	description,
	items = [],
	status = 'error',
	title = status === 'success' ? 'Ready to save' : 'Review required',
	...props
}: FeedbackPanelProps) {
	return (
		<div
			className={cn(concreteClassNames.validationSummary, className)}
			data-status={status}
			{...props}
		>
			<div className={concreteClassNames.validationSummaryIcon}>
				<ConcreteIcon name={status === 'success' ? 'check' : 'x'} />
			</div>
			<div className={concreteClassNames.validationSummaryBody}>
				<div className={concreteClassNames.validationSummaryHead}>
					<div>
						<b>{title}</b>
						{description ? <p>{description}</p> : null}
					</div>
					{action ? <div className={concreteClassNames.validationSummaryAction}>{action}</div> : null}
				</div>
				{items.length > 0 ? <FeedbackList items={items} status={status} /> : null}
			</div>
		</div>
	)
}

export type FeedbackListProps = HTMLAttributes<HTMLUListElement> & {
	items: readonly FeedbackPanelItem[]
	status?: FeedbackPanelStatus | undefined
}

export function FeedbackList({ className, items, status = 'error', ...props }: FeedbackListProps) {
	return (
		<ul className={cn(concreteClassNames.validationList, className)} {...props}>
			{items.map(item => (
				<FeedbackListItem item={item} key={item.id} status={item.status ?? status} />
			))}
		</ul>
	)
}

export type FeedbackListItemProps = HTMLAttributes<HTMLLIElement> & {
	item: FeedbackPanelItem
	status?: FeedbackPanelStatus | undefined
}

export function FeedbackListItem({
	className,
	item,
	status = 'error',
	...props
}: FeedbackListItemProps) {
	return (
		<li className={className} data-status={status} {...props}>
			<ConcreteIcon name={status === 'success' ? 'check' : 'x'} />
			<span>
				{item.href ? <a href={item.href}>{item.label}</a> : <b>{item.label}</b>}
				<small>{item.message}</small>
			</span>
		</li>
	)
}
