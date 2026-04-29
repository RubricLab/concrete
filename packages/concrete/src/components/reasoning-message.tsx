import type { ReactNode } from 'react'
import { z } from 'zod/v4'
import { ConcreteIcon } from '../icons'
import { Spinner } from '../primitives'
import { booleanControl, selectControl, textControl } from '../registry/controls'
import { defineConcreteComponent } from '../registry/definition'
import { prop, states } from '../registry/props'
import {
	type MessageStatus,
	messageStatusSchema,
	type ReasoningStep,
	reasoningStepSchema
} from '../schemas'
import { concreteClassNames } from '../styles/class-names'
import { Message, type MessageProps } from './message'

const reasoningStatusValues = ['complete', 'error', 'pending', 'streaming'] as const

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

export const reasoningMessageComponentSchema = z
	.object({
		open: z.boolean().default(false),
		status: messageStatusSchema.default('streaming'),
		steps: z.array(reasoningStepSchema).default([]),
		summary: z.string().min(1).optional(),
		title: z.string().min(1).default('Thinking')
	})
	.strict()

export const reasoningMessageComponentDefinition = defineConcreteComponent({
	category: 'feedback',
	component: ReasoningMessage,
	controls: [
		selectControl('fixture', 'Fixture', 'streaming', ['streaming', 'complete', 'collapsed']),
		textControl(
			'summary',
			'Summary',
			'Mapped failing logs to the evaluation fixture and isolated the change.'
		),
		selectControl('status', 'Status', 'streaming', reasoningStatusValues),
		booleanControl('open', 'Open', 'true')
	],
	description:
		'Subdued expandable reasoning line for visible agent progress, scoped steps, and streaming state.',
	guidance:
		'Reasoning message communicates process as a collapsible progress artifact. It stays visually below final answers and generated UI.',
	kind: 'component',
	name: 'Reasoning message',
	pressure: ['generative', 'product'],
	props: [
		prop('title', 'ReactNode', 'Reasoning artifact title.', 'Reasoning'),
		prop('summary', 'ReactNode', 'Visible process summary without private chain-of-thought.'),
		prop(
			'steps',
			'readonly ReasoningMessageStep[]',
			'Structured collapsible progress steps validated by reasoningStepSchema, with optional render detail.'
		),
		prop('open', 'boolean', 'Initial details disclosure state.', 'false'),
		prop('status', "'complete' | 'error' | 'pending' | 'streaming'", 'Reasoning status.', 'streaming')
	],
	renderExample: renderReasoningMessageExample,
	schema: reasoningMessageComponentSchema,
	slug: 'reasoning-message',
	states: states([
		['streaming', 'Open reasoning artifact with active step.'],
		['complete', 'Completed reasoning summary.'],
		['collapsed', 'Collapsed summary-only state.']
	])
})

function renderReasoningMessageExample(state = 'streaming'): ReactNode {
	return (
		<MessageStage>
			<ReasoningMessage
				open={state !== 'collapsed'}
				status={state === 'complete' ? 'complete' : 'streaming'}
				summary="Mapped failing logs to the evaluation fixture, checked schema boundaries, and isolated the change needed before rerunning."
			/>
		</MessageStage>
	)
}

function MessageStage({ children }: { children: ReactNode }) {
	return <div style={{ display: 'grid', gap: 12, maxWidth: 680, width: '100%' }}>{children}</div>
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
