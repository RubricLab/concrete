import type { HTMLAttributes, ReactNode } from 'react'
import { ConcreteIcon } from '../../icons'
import { cn } from '../../primitives/utils'
import type { FieldStatus } from '../../schemas'
import { concreteClassNames } from '../../styles/class-names'

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
				{items.length > 0 ? (
					<ul className={concreteClassNames.validationList}>
						{items.map(item => (
							<li data-status={item.status ?? status} key={item.id}>
								<ConcreteIcon name={item.status === 'success' ? 'check' : 'x'} />
								<span>
									{item.href ? <a href={item.href}>{item.label}</a> : <b>{item.label}</b>}
									<small>{item.message}</small>
								</span>
							</li>
						))}
					</ul>
				) : null}
			</div>
		</div>
	)
}
