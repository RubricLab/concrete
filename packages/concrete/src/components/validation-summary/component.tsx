import type { HTMLAttributes, ReactNode } from 'react'
import { FeedbackPanel, type FeedbackPanelItem, type FeedbackPanelStatus } from '../../primitives'
import type { FieldStatus } from '../../schemas'

export type ValidationSummaryItem = {
	href?: string | undefined
	id: string
	label: ReactNode
	message: ReactNode
	status?: FieldStatus | undefined
}

export type ValidationSummaryProps = HTMLAttributes<HTMLDivElement> & {
	action?: ReactNode | undefined
	description?: ReactNode | undefined
	items?: readonly ValidationSummaryItem[] | undefined
	status?: FieldStatus | undefined
	title?: ReactNode | undefined
}

export function ValidationSummary({
	action,
	className,
	description,
	items = [],
	status = 'error',
	title = status === 'success' ? 'Ready to save' : 'Review required',
	...props
}: ValidationSummaryProps) {
	const feedbackStatus = toFeedbackStatus(status, 'error')

	return (
		<FeedbackPanel
			action={action}
			className={className}
			description={description}
			items={items.map(item => toFeedbackPanelItem(item, feedbackStatus))}
			status={feedbackStatus}
			title={title}
			{...props}
		/>
	)
}

function toFeedbackPanelItem(
	item: ValidationSummaryItem,
	fallbackStatus: FeedbackPanelStatus
): FeedbackPanelItem {
	return {
		...item,
		status: toFeedbackStatus(item.status, fallbackStatus)
	}
}

function toFeedbackStatus(
	status: FieldStatus | undefined,
	fallbackStatus: FeedbackPanelStatus
): FeedbackPanelStatus {
	switch (status) {
		case 'error':
		case 'success':
			return status
		case 'default':
		case undefined:
			return fallbackStatus
	}
}
