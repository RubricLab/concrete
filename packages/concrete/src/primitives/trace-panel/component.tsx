import type { DetailsHTMLAttributes, HTMLAttributes, ReactNode } from 'react'
import { ConcreteIcon } from '../../icons'
import type { MessageStatus } from '../../schemas'
import { concreteClassNames } from '../../styles/class-names'
import { Spinner } from '../spinner'
import { cn } from '../utils'

export type TracePanelProps = Omit<DetailsHTMLAttributes<HTMLDetailsElement>, 'children'> & {
	children: ReactNode
	status?: MessageStatus | undefined
	stepCount: number
	summary: ReactNode
	title: ReactNode
}

export type TraceStepsProps = HTMLAttributes<HTMLOListElement> & {
	children: ReactNode
}

export type TraceStepProps = HTMLAttributes<HTMLLIElement> & {
	detail?: ReactNode
	label: ReactNode
	open?: boolean | undefined
	status?: MessageStatus | undefined
}

export function TracePanel({
	children,
	className,
	status = 'streaming',
	stepCount,
	summary,
	title,
	...props
}: TracePanelProps) {
	return (
		<details className={cn(concreteClassNames.trace, className)} data-status={status} {...props}>
			<summary>
				<span className={concreteClassNames.traceStatus}>
					<TraceStatusMark status={status} />
				</span>
				<span className={concreteClassNames.traceSummaryMain}>
					<span>{title}</span>
					<small>
						{stepCount} {stepCount === 1 ? 'step' : 'steps'}
					</small>
				</span>
				<span className={concreteClassNames.traceSummaryText}>{summary}</span>
				<ConcreteIcon name="chevron-down" />
			</summary>
			{children}
		</details>
	)
}

export function TraceSteps({ children, className, ...props }: TraceStepsProps) {
	return (
		<ol className={cn(concreteClassNames.traceSteps, className)} {...props}>
			{children}
		</ol>
	)
}

export function TraceStep({ detail, label, open, status = 'pending', ...props }: TraceStepProps) {
	return (
		<li data-status={status} {...props}>
			{detail ? (
				<details open={open ?? status === 'streaming'}>
					<summary>
						<TraceStatusMark status={status} />
						<span>{label}</span>
						<ConcreteIcon name="chevron-down" />
					</summary>
					<p>{detail}</p>
				</details>
			) : (
				<span>
					<TraceStatusMark status={status} />
					<span>{label}</span>
				</span>
			)}
		</li>
	)
}

function TraceStatusMark({ status }: { status: MessageStatus }) {
	switch (status) {
		case 'complete':
			return <ConcreteIcon name="check" />
		case 'error':
			return <ConcreteIcon name="circle-alert" />
		case 'pending':
		case 'streaming':
			return <Spinner density="compact" />
	}
}
