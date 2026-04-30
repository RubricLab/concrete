import type { HTMLAttributes, ReactNode } from 'react'
import { ConcreteIcon } from '../../icons'
import type { FieldStatus } from '../../schemas'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

export type AlertProps = Omit<HTMLAttributes<HTMLDivElement>, 'style' | 'title'> & {
	action?: ReactNode | undefined
	children?: ReactNode | undefined
	status?: FieldStatus | undefined
	title: ReactNode
}

export function Alert({
	action,
	children,
	className,
	status = 'default',
	title,
	...props
}: AlertProps) {
	return (
		<div
			className={cn(concreteClassNames.alert, className)}
			data-status={status}
			role="status"
			{...props}
		>
			<span className={concreteClassNames.alertIcon}>
				<ConcreteIcon
					name={status === 'success' ? 'circle-check' : status === 'error' ? 'circle-alert' : 'info'}
				/>
			</span>
			<span className={concreteClassNames.alertBody}>
				<b>{title}</b>
				{children ? <small>{children}</small> : null}
			</span>
			{action ? <span className={concreteClassNames.alertAction}>{action}</span> : null}
		</div>
	)
}
