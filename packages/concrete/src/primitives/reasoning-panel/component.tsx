import type { DetailsHTMLAttributes, HTMLAttributes, ReactNode } from 'react'
import { ConcreteIcon } from '../../icons'
import type { MessageStatus } from '../../schemas'
import { concreteClassNames } from '../../styles/class-names'
import { Spinner } from '../spinner'
import { cn } from '../utils'

export type ReasoningPanelProps = Omit<DetailsHTMLAttributes<HTMLDetailsElement>, 'children'> & {
	children: ReactNode
	status?: MessageStatus | undefined
	stepCount: number
	summary: ReactNode
	title: ReactNode
}

export type ReasoningStepsProps = HTMLAttributes<HTMLOListElement> & {
	children: ReactNode
}

export type ReasoningPanelStepProps = HTMLAttributes<HTMLLIElement> & {
	detail?: ReactNode
	label: ReactNode
	open?: boolean | undefined
	status?: MessageStatus | undefined
}

export function ReasoningPanel({
	children,
	className,
	status = 'streaming',
	stepCount,
	summary,
	title,
	...props
}: ReasoningPanelProps) {
	return (
		<details className={cn(concreteClassNames.reasoning, className)} data-status={status} {...props}>
			<summary>
				<span className={concreteClassNames.reasoningStatus}>
					<ReasoningStatusMark status={status} />
				</span>
				<span className={concreteClassNames.reasoningSummaryMain}>
					<span>{title}</span>
					<small>
						{stepCount} {stepCount === 1 ? 'step' : 'steps'}
					</small>
				</span>
				<span className={concreteClassNames.reasoningSummaryText}>{summary}</span>
				<ConcreteIcon name="chevron-down" />
			</summary>
			{children}
		</details>
	)
}

export function ReasoningSteps({ children, className, ...props }: ReasoningStepsProps) {
	return (
		<ol className={cn(concreteClassNames.reasoningSteps, className)} {...props}>
			{children}
		</ol>
	)
}

export function ReasoningPanelStep({
	detail,
	label,
	open,
	status = 'pending',
	...props
}: ReasoningPanelStepProps) {
	return (
		<li data-status={status} {...props}>
			{detail ? (
				<details open={open ?? status === 'streaming'}>
					<summary>
						<ReasoningStatusMark status={status} />
						<span>{label}</span>
						<ConcreteIcon name="chevron-down" />
					</summary>
					<p>{detail}</p>
				</details>
			) : (
				<span>
					<ReasoningStatusMark status={status} />
					<span>{label}</span>
				</span>
			)}
		</li>
	)
}

function ReasoningStatusMark({ status }: { status: MessageStatus }) {
	switch (status) {
		case 'complete':
			return <ConcreteIcon name="check" />
		case 'error':
			return <ConcreteIcon name="circle-alert" />
		case 'pending':
		case 'streaming':
			return <Spinner size={11} tone="default" />
	}
}
