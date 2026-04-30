import type { HTMLAttributes, ReactNode } from 'react'
import { Alert, Stack, ValidationList, type ValidationListItem } from '../../primitives'
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
	const validationStatus = toValidationStatus(status, 'error')

	return (
		<Stack className={className} density="compact" {...props}>
			<Alert action={action} status={validationStatus} title={title}>
				{description}
			</Alert>
			{items.length ? (
				<ValidationList
					items={items.map(item => toValidationListItem(item, validationStatus))}
					status={validationStatus}
				/>
			) : null}
		</Stack>
	)
}

function toValidationListItem(
	item: ValidationSummaryItem,
	fallbackStatus: FieldStatus
): ValidationListItem {
	return {
		...item,
		status: toValidationStatus(item.status, fallbackStatus)
	}
}

function toValidationStatus(
	status: FieldStatus | undefined,
	fallbackStatus: FieldStatus
): FieldStatus {
	switch (status) {
		case 'error':
		case 'success':
		case 'default':
			return status
		case undefined:
			return fallbackStatus
	}
}
