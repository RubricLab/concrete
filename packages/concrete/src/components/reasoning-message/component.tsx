import type { ReactNode } from 'react'
import { ConcreteIcon } from '../../icons'
import { Spinner } from '../../primitives'
import { Message, type MessageProps } from '../../primitives/internal/message'
import type { MessageStatus, ReasoningStep } from '../../schemas'
import { concreteClassNames } from '../../styles/class-names'

export type ReasoningMessageStep = ReasoningStep & {
	detail?: ReactNode
}

export type ReasoningMessageProps = Omit<MessageProps, 'children' | 'messageRole' | 'surface'> & {
	open?: boolean
	steps?: readonly ReasoningMessageStep[]
	summary?: ReactNode
	title?: ReactNode
}

export function ReasoningMessage({
	open = false,
	status = 'streaming',
	steps = defaultReasoningSteps,
	summary = 'Inspecting context and selecting the next deterministic action.',
	title = 'Thinking',
	...props
}: ReasoningMessageProps) {
	return (
		<Message messageRole="assistant" showStatus={false} status={status} surface="plain" {...props}>
			<details className={concreteClassNames.reasoning} data-status={status} open={open}>
				<summary>
					<span className={concreteClassNames.reasoningStatus}>
						{status === 'streaming' || status === 'pending' ? (
							<Spinner size={12} tone="default" />
						) : (
							<ConcreteIcon name={status === 'error' ? 'circle-alert' : 'check'} />
						)}
					</span>
					<span className={concreteClassNames.reasoningSummaryMain}>
						<span>{title}</span>
						<small>
							{steps.length} {steps.length === 1 ? 'step' : 'steps'}
						</small>
					</span>
					<span className={concreteClassNames.reasoningSummaryText}>{summary}</span>
					<ConcreteIcon name="chevron-down" />
				</summary>
				<ol className={concreteClassNames.reasoningSteps}>
					{steps.map(step => (
						<li data-status={step.status} key={step.id}>
							{step.detail ? (
								<details open={step.status === 'streaming'}>
									<summary>
										<ReasoningStepMark status={step.status} />
										<span>{step.label}</span>
										<ConcreteIcon name="chevron-down" />
									</summary>
									<p>{step.detail}</p>
								</details>
							) : (
								<span>
									<ReasoningStepMark status={step.status} />
									<span>{step.label}</span>
								</span>
							)}
						</li>
					))}
				</ol>
			</details>
		</Message>
	)
}

const defaultReasoningSteps = [
	{
		detail: 'Read the transcript, active scopes, and the command surface state before touching code.',
		id: 'context',
		label: 'Context loaded',
		status: 'complete'
	},
	{
		detail:
			'Selected the smallest local tools needed to verify behavior and avoid product policy drift.',
		id: 'tools',
		label: 'Tool plan selected',
		status: 'complete'
	},
	{
		detail: 'Applying the focused interface change and keeping the final answer hierarchy stronger.',
		id: 'work',
		label: 'Running focused action',
		status: 'streaming'
	}
] as const satisfies readonly ReasoningMessageStep[]

function ReasoningStepMark({ status }: { status: MessageStatus }) {
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
