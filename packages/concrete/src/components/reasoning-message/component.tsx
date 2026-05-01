import type { ReactNode } from 'react'
import { TracePanel, TraceStep, TraceSteps } from '../../primitives'
import type { ReasoningStep as ReasoningStepData } from '../../schemas'
import { Message, type MessageProps } from '../message/component'

export type ReasoningMessageStep = ReasoningStepData & {
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
			<TracePanel open={open} status={status} stepCount={steps.length} summary={summary} title={title}>
				<TraceSteps>
					{steps.map(step => (
						<TraceStep detail={step.detail} key={step.id} label={step.label} status={step.status} />
					))}
				</TraceSteps>
			</TracePanel>
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
