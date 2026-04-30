import type { HTMLAttributes, ReactNode } from 'react'
import type { FieldStatus } from '../../schemas'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

export type FieldProps = HTMLAttributes<HTMLDivElement> & {
	children: ReactNode
	count?: number | undefined
	description?: ReactNode | undefined
	error?: ReactNode | undefined
	help?: ReactNode | undefined
	htmlFor?: string | undefined
	label?: ReactNode | undefined
	limit?: number | undefined
	optional?: boolean | undefined
	required?: boolean | undefined
	status?: FieldStatus | undefined
	success?: ReactNode | undefined
}

export function Field({
	children,
	className,
	count,
	description,
	error,
	help,
	htmlFor,
	label,
	limit,
	optional = false,
	required = false,
	status = 'default',
	success,
	...props
}: FieldProps) {
	const resolvedStatus = error ? 'error' : success ? 'success' : status
	const message = error ?? success ?? help
	const countText =
		count === undefined ? undefined : limit === undefined ? String(count) : `${count} / ${limit}`

	return (
		<div
			className={cn(concreteClassNames.formField, className)}
			data-status={resolvedStatus}
			{...props}
		>
			{label || description || optional || required ? (
				<div className={concreteClassNames.formFieldHead}>
					{label ? (
						<label className={concreteClassNames.formFieldLabel} htmlFor={htmlFor}>
							{label}
							{required ? <span aria-hidden> *</span> : null}
						</label>
					) : null}
					{optional ? <span className={concreteClassNames.formFieldMeta}>Optional</span> : null}
				</div>
			) : null}
			{description ? (
				<div className={concreteClassNames.formFieldDescription}>{description}</div>
			) : null}
			{children}
			{message || countText ? (
				<div className={concreteClassNames.formFieldFoot}>
					{message ? (
						<span className={concreteClassNames.formFieldMessage} data-status={resolvedStatus}>
							{message}
						</span>
					) : (
						<span />
					)}
					{countText ? <span className={concreteClassNames.formFieldCount}>{countText}</span> : null}
				</div>
			) : null}
		</div>
	)
}
