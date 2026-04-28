'use client'

import type { HTMLAttributes, ReactNode } from 'react'
import { ConcreteIcon, type IconName } from '../icons'
import { Avatar, Badge, Bubble, CodeBlock, Spinner } from '../primitives'
import { cn } from '../primitives/utils'
import type {
	MessageRole,
	MessageStatus,
	MessageSurface,
	ReasoningStep,
	ToolCallStatus
} from '../schemas'
import classes from './components.module.css'

export type MessageProps = HTMLAttributes<HTMLDivElement> & {
	actions?: ReactNode
	author?: ReactNode
	avatar?: ReactNode
	avatarAlt?: string
	avatarInitials?: string
	avatarSrc?: string
	grouped?: boolean
	messageRole?: MessageRole
	meta?: ReactNode
	showAvatar?: boolean
	showStatus?: boolean
	status?: MessageStatus
	surface?: MessageSurface
}

export function Message({
	actions,
	author,
	avatar,
	avatarAlt,
	avatarInitials,
	avatarSrc,
	children,
	className,
	grouped = false,
	messageRole = 'assistant',
	meta,
	showAvatar,
	showStatus = true,
	status = 'complete',
	surface = 'bubble',
	...props
}: MessageProps) {
	const direction = messageRole === 'user' ? 'outbound' : 'inbound'
	const shouldRenderAvatar =
		!grouped && (showAvatar ?? Boolean(avatar || avatarInitials || avatarSrc))

	return (
		<article
			className={cn(classes.message, className)}
			data-grouped={grouped ? true : undefined}
			data-role={messageRole}
			data-status={status}
			data-surface={surface}
			{...props}
		>
			{shouldRenderAvatar ? (
				<span className={classes.messageAvatar}>{avatar ?? renderMessageAvatar()}</span>
			) : null}
			<div className={classes.messageStack}>
				{author || meta || (showStatus && status !== 'complete') ? (
					<header className={classes.messageMeta}>
						<span>{author ?? getMessageRoleLabel(messageRole)}</span>
						{meta ? <span>{meta}</span> : null}
						{showStatus && status !== 'complete' ? (
							<Badge signal={getMessageStatusSignal(status)}>{status}</Badge>
						) : null}
					</header>
				) : null}
				{surface === 'bubble' ? (
					<Bubble className={classes.messageBubble} direction={direction}>
						{children}
					</Bubble>
				) : (
					<div className={classes.messagePlain}>{children}</div>
				)}
				{actions ? <div className={classes.messageActions}>{actions}</div> : null}
			</div>
		</article>
	)

	function renderMessageAvatar() {
		return (
			<Avatar
				alt={avatarAlt ?? stringifyReactNode(author)}
				initials={avatarInitials ?? getMessageInitials(author, messageRole)}
				size="small"
				{...(avatarSrc ? { src: avatarSrc } : {})}
			/>
		)
	}
}

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
			<details className={classes.reasoning} data-status={status} open={open}>
				<summary>
					<span className={classes.reasoningStatus}>
						{status === 'streaming' || status === 'pending' ? (
							<Spinner size={12} tone="default" />
						) : (
							<ConcreteIcon name={status === 'error' ? 'circle-alert' : 'check'} />
						)}
					</span>
					<span className={classes.reasoningSummaryMain}>
						<span>{title}</span>
						<small>
							{steps.length} {steps.length === 1 ? 'step' : 'steps'}
						</small>
					</span>
					<span className={classes.reasoningSummaryText}>{summary}</span>
					<ConcreteIcon name="chevron-down" />
				</summary>
				<ol className={classes.reasoningSteps}>
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
			<details className={classes.toolCall} data-status={status} open={open ?? status === 'running'}>
				<summary>
					<span>
						<ConcreteIcon name={toolIcon} />
						<b>{name}</b>
					</span>
					<span>
						<span className={classes.toolCallStatus} data-status={status}>
							<ToolStatusIcon status={status} />
							{status}
						</span>
						{duration ? <small>{duration}</small> : null}
						<ConcreteIcon name="chevron-down" />
					</span>
				</summary>
				<div className={classes.toolCallBody}>
					{input ? (
						<CodeBlock
							className={classes.toolCodeBlock}
							code={input}
							language={language}
							showLineNumbers={false}
						/>
					) : null}
					{output ? <div className={classes.toolOutput}>{output}</div> : null}
				</div>
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

function getMessageInitials(author: ReactNode, role: MessageRole): string {
	const text = stringifyReactNode(author)

	if (!text) {
		return getMessageRoleLabel(role).slice(0, 1)
	}

	return text
		.split(/\s+/)
		.filter(Boolean)
		.slice(0, 2)
		.map(part => part.slice(0, 1).toUpperCase())
		.join('')
}

function getMessageRoleLabel(role: MessageRole): string {
	switch (role) {
		case 'assistant':
			return 'Assistant'
		case 'system':
			return 'System'
		case 'tool':
			return 'Tool'
		case 'user':
			return 'You'
	}
}

function getMessageStatusSignal(status: MessageStatus): 'error' | 'terminal' | 'ultra' {
	switch (status) {
		case 'error':
			return 'error'
		case 'pending':
		case 'streaming':
			return 'ultra'
		case 'complete':
			return 'terminal'
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

function stringifyReactNode(node: ReactNode): string {
	switch (typeof node) {
		case 'bigint':
		case 'boolean':
		case 'number':
		case 'string':
			return String(node)
		case 'object':
		case 'function':
		case 'symbol':
		case 'undefined':
			return ''
	}
}
