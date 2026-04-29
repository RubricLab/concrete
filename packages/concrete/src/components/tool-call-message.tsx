import type { ReactNode } from 'react'
import { z } from 'zod/v4'
import { ConcreteIcon, type IconName } from '../icons'
import { CodeBlock, Spinner } from '../primitives'
import { selectControl, textControl } from '../registry/controls'
import { defineConcreteComponent } from '../registry/definition'
import { prop, states } from '../registry/props'
import {
	type MessageStatus,
	type ToolCallStatus,
	toolCallSchema,
	toolCallStatusSchema
} from '../schemas'
import { concreteClassNames } from '../styles/class-names'
import { Message, type MessageProps } from './message'

const toolCallStatusValues = ['error', 'queued', 'running', 'success'] as const

export type ToolCallMessageProps = Omit<
	MessageProps,
	'children' | 'messageRole' | 'status' | 'surface'
> & {
	duration?: ReactNode
	input?: string
	language?: string
	name: ReactNode
	open?: boolean
	output?: ReactNode
	status?: ToolCallStatus
	toolIcon?: IconName
}

export function ToolCallMessage({
	duration,
	input,
	language = 'ts',
	name,
	open,
	output,
	status = 'running',
	toolIcon = 'terminal',
	...props
}: ToolCallMessageProps) {
	return (
		<Message
			messageRole="tool"
			showStatus={false}
			status={getMessageStatusFromToolStatus(status)}
			surface="plain"
			{...props}
		>
			<details
				className={concreteClassNames.toolCall}
				data-status={status}
				open={open ?? status === 'running'}
			>
				<summary>
					<span>
						<ConcreteIcon name={toolIcon} />
						<b>{name}</b>
					</span>
					<span>
						<span className={concreteClassNames.toolCallStatus} data-status={status}>
							<ToolStatusIcon status={status} />
							{status}
						</span>
						{duration ? <small>{duration}</small> : null}
						<ConcreteIcon name="chevron-down" />
					</span>
				</summary>
				<div className={concreteClassNames.toolCallBody}>
					{input ? (
						<CodeBlock
							className={concreteClassNames.toolCodeBlock}
							code={input}
							language={language}
							showLineNumbers={false}
						/>
					) : null}
					{output ? <div className={concreteClassNames.toolOutput}>{output}</div> : null}
				</div>
			</details>
		</Message>
	)
}

export const toolCallMessageComponentSchema = toolCallSchema
	.omit({ id: true })
	.extend({
		input: z.string().optional(),
		language: z.string().default('ts'),
		open: z.boolean().optional(),
		output: z.string().optional(),
		status: toolCallStatusSchema.default('running'),
		toolIcon: z.string().default('terminal')
	})
	.strict()

export const toolCallMessageComponentDefinition = defineConcreteComponent({
	category: 'feedback',
	component: ToolCallMessage,
	controls: [
		selectControl('fixture', 'Fixture', 'running', ['running', 'success', 'error']),
		textControl('name', 'Name', 'bun test'),
		selectControl('status', 'Status', 'running', toolCallStatusValues),
		textControl('duration', 'Duration', '1.8s')
	],
	description:
		'Collapsible tool execution artifact with status, duration, optional input code, and output.',
	guidance:
		'Tool call message makes agent work inspectable. The component renders status and artifacts; application code owns execution and permissions.',
	kind: 'component',
	name: 'Tool call message',
	pressure: ['generative', 'product'],
	props: [
		prop('name', 'ReactNode', 'Tool or function name.', undefined, true),
		prop('status', "'queued' | 'running' | 'success' | 'error'", 'Tool execution status.', 'running'),
		prop('open', 'boolean', 'Initial disclosure state. Running calls open by default.'),
		prop('duration', 'ReactNode', 'Elapsed time or latency label.'),
		prop('input', 'string', 'Optional input code block.'),
		prop('output', 'ReactNode', 'Result or error output slot.'),
		prop('toolIcon', 'IconName', 'Leading tool glyph.', 'terminal')
	],
	renderExample: renderToolCallMessageExample,
	schema: toolCallMessageComponentSchema,
	slug: 'tool-call-message',
	states: states([
		['running', 'Active tool call with indeterminate progress.'],
		['success', 'Completed call with output.'],
		['error', 'Failed call with error output.']
	])
})

function renderToolCallMessageExample(state = 'running'): ReactNode {
	switch (state) {
		case 'error':
			return (
				<MessageStage>
					<ToolCallMessage
						duration="420ms"
						name="bun test"
						output="Schema fixture is missing commandOptions[0].id."
						status="error"
					/>
				</MessageStage>
			)
		case 'success':
			return (
				<MessageStage>
					<ToolCallMessage
						duration="1.8s"
						input="bun run check"
						name="workspace check"
						open
						output="7 tests passed. TypeScript clean."
						status="success"
					/>
				</MessageStage>
			)
		default:
			return (
				<MessageStage>
					<ToolCallMessage input={'rg -n "composer" @rubriclab/concrete'} name="search workspace" />
				</MessageStage>
			)
	}
}

function MessageStage({ children }: { children: ReactNode }) {
	return <div style={{ display: 'grid', gap: 12, maxWidth: 680, width: '100%' }}>{children}</div>
}

function ToolStatusIcon({ status }: { status: ToolCallStatus }) {
	switch (status) {
		case 'error':
			return <ConcreteIcon name="circle-alert" />
		case 'queued':
			return <ConcreteIcon name="clock" />
		case 'running':
			return <Spinner size={11} tone="default" />
		case 'success':
			return <ConcreteIcon name="check" />
	}
}

function getMessageStatusFromToolStatus(status: ToolCallStatus): MessageStatus {
	switch (status) {
		case 'error':
			return 'error'
		case 'queued':
			return 'pending'
		case 'running':
			return 'streaming'
		case 'success':
			return 'complete'
	}
}
