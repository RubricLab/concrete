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
	summary = 'Checking schema and render boundaries before patching.',
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
		detail: 'Read the transcript, active scope, and current render route.',
		id: 'context',
		label: 'Context',
		status: 'complete'
	},
	{
		detail: 'Selected the smallest commands needed to verify the change.',
		id: 'tools',
		label: 'Tools',
		status: 'complete'
	},
	{
		detail: 'Applying the focused interface change.',
		id: 'work',
		label: 'Patch',
		status: 'streaming'
	}
] as const satisfies readonly ReasoningMessageStep[]
