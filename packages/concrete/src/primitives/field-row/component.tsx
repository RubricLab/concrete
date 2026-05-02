import type { HTMLAttributes, ReactNode } from 'react'
import type { FieldStatus } from '../../schemas'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'
import type { FieldRowAlign } from './schema'

export type FieldRowProps = Omit<HTMLAttributes<HTMLDivElement>, 'style'> & {
	align?: FieldRowAlign | undefined
	children?: ReactNode | undefined
	control?: ReactNode | undefined
	description?: ReactNode | undefined
	interactive?: boolean | undefined
	label?: ReactNode | undefined
	meta?: ReactNode | undefined
	status?: FieldStatus | undefined
}

export function FieldRow({
	align = 'center',
	children,
	className,
	control,
	description,
	interactive = false,
	label,
	meta,
	status = 'default',
	...props
}: FieldRowProps) {
	const resolvedLabel = label ?? children

	return (
		<div
			className={cn(concreteClassNames.fieldRow, className)}
			data-align={align}
			data-interactive={interactive ? true : undefined}
			data-status={status}
			{...props}
		>
			<div className={concreteClassNames.fieldRowCopy}>
				<span className={concreteClassNames.fieldRowLabel}>{resolvedLabel}</span>
				{description ? (
					<span className={concreteClassNames.fieldRowDescription}>{description}</span>
				) : null}
			</div>
			{meta ? <span className={concreteClassNames.fieldRowMeta}>{meta}</span> : null}
			<div className={concreteClassNames.fieldRowControl}>{control ?? children}</div>
		</div>
	)
}
