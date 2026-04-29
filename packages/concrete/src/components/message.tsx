import type { HTMLAttributes, ReactNode } from 'react'
import { z } from 'zod/v4'
import { Avatar, Badge, Bubble } from '../primitives'
import { cn } from '../primitives/utils'
import { booleanControl, selectControl, textControl } from '../registry/controls'
import { defineConcreteComponent } from '../registry/definition'
import { prop, states } from '../registry/props'
import {
	type MessageRole,
	type MessageStatus,
	type MessageSurface,
	messageRoleSchema,
	messageStatusSchema,
	messageSurfaceSchema
} from '../schemas'
import { concreteClassNames } from '../styles/class-names'
import { Toolbar, ToolbarButton } from './toolbar-view'

const messageRoleValues = ['assistant', 'system', 'tool', 'user'] as const
const messageStatusValues = ['complete', 'error', 'pending', 'streaming'] as const
const messageSurfaceValues = ['bubble', 'plain'] as const

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
			className={cn(concreteClassNames.message, className)}
			data-grouped={grouped ? true : undefined}
			data-role={messageRole}
			data-status={status}
			data-surface={surface}
			{...props}
		>
			{shouldRenderAvatar ? (
				<span className={concreteClassNames.messageAvatar}>{avatar ?? renderMessageAvatar()}</span>
			) : null}
			<div className={concreteClassNames.messageStack}>
				{author || meta || (showStatus && status !== 'complete') ? (
					<header className={concreteClassNames.messageMeta}>
						<span>{author ?? getMessageRoleLabel(messageRole)}</span>
						{meta ? <span>{meta}</span> : null}
						{showStatus && status !== 'complete' ? (
							<Badge signal={getMessageStatusSignal(status)}>{status}</Badge>
						) : null}
					</header>
				) : null}
				{surface === 'bubble' ? (
					<Bubble className={concreteClassNames.messageBubble} direction={direction}>
						{children}
					</Bubble>
				) : (
					<div className={concreteClassNames.messagePlain}>{children}</div>
				)}
				{actions ? <div className={concreteClassNames.messageActions}>{actions}</div> : null}
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

export const messageComponentSchema = z
	.object({
		author: z.string().min(1).optional(),
		avatarInitials: z.string().min(1).optional(),
		avatarSrc: z.string().min(1).optional(),
		grouped: z.boolean().default(false),
		messageRole: messageRoleSchema.default('assistant'),
		meta: z.string().min(1).optional(),
		showAvatar: z.boolean().default(false),
		showStatus: z.boolean().default(true),
		status: messageStatusSchema.default('complete'),
		surface: messageSurfaceSchema.default('bubble')
	})
	.strict()

export const messageComponentDefinition = defineConcreteComponent({
	category: 'surface',
	component: Message,
	controls: [
		selectControl('fixture', 'Fixture', 'assistant', ['assistant', 'user', 'system']),
		textControl('author', 'Author', 'Rubric'),
		selectControl('messageRole', 'Role', 'assistant', messageRoleValues),
		selectControl('surface', 'Surface', 'bubble', messageSurfaceValues),
		selectControl('status', 'Status', 'complete', messageStatusValues),
		booleanControl('showAvatar', 'Avatar', 'true')
	],
	description:
		'Role-aware message wrapper with avatars, plain or bubble surfaces, metadata, and subtle action toolbars.',
	guidance:
		'Message keeps transcript structure portable: role, author, avatar, status, meta, surface, actions, and body. It does not own transport or persistence.',
	kind: 'component',
	name: 'Message',
	pressure: ['generative', 'product'],
	props: [
		prop(
			'messageRole',
			"'assistant' | 'system' | 'tool' | 'user'",
			'Transcript role controlling alignment and tone.',
			'assistant'
		),
		prop(
			'surface',
			"'bubble' | 'plain'",
			'Bubble chat surface or stronger plain answer surface.',
			'bubble'
		),
		prop(
			'status',
			"'complete' | 'error' | 'pending' | 'streaming'",
			'Optional status badge for live or failed messages.',
			'complete'
		),
		prop('author', 'ReactNode', 'Author label shown above the bubble.'),
		prop('avatar', 'ReactNode', 'Custom avatar slot for multiplayer or multi-agent transcripts.'),
		prop('avatarInitials', 'string', 'Convenience initials for the built-in Avatar primitive.'),
		prop('avatarSrc', 'string', 'Convenience image source for the built-in Avatar primitive.'),
		prop('showAvatar', 'boolean', 'Forces built-in avatar rendering.', 'false'),
		prop('showStatus', 'boolean', 'Shows non-complete status badges.', 'true'),
		prop(
			'grouped',
			'boolean',
			'Tucks consecutive messages into a tighter transcript rhythm.',
			'false'
		),
		prop('meta', 'ReactNode', 'Timestamp or secondary metadata.'),
		prop('actions', 'ReactNode', 'Subtle toolbar-like action slot below the message body.'),
		prop('children', 'ReactNode', 'Message content.')
	],
	renderExample: renderMessageExample,
	schema: messageComponentSchema,
	slug: 'message',
	states: states([
		['assistant', 'Assistant response with metadata and actions.'],
		['user', 'Outbound user message treatment.'],
		['system', 'System note for constraints, memory, or run context.']
	])
})

function renderMessageExample(state = 'assistant'): ReactNode {
	switch (state) {
		case 'system':
			return (
				<MessageStage>
					<Message author="System" messageRole="system" surface="plain">
						Context window compacted. Latest workspace state and render routes are available.
					</Message>
				</MessageStage>
			)
		case 'user':
			return (
				<MessageStage>
					<Message
						actions={
							<Toolbar compact label="User message actions">
								<ToolbarButton icon="pencil" label="Edit" showLabel={false} tooltipPlacement="bottom" />
								<ToolbarButton icon="copy" label="Copy" showLabel={false} tooltipPlacement="bottom" />
							</Toolbar>
						}
						author="Dexter"
						avatarInitials="DS"
						messageRole="user"
						showAvatar
					>
						Can you inspect the failing run and summarize the blocker?
					</Message>
				</MessageStage>
			)
		default:
			return (
				<MessageStage>
					<Message
						actions={
							<Toolbar compact label="Assistant message actions">
								<ToolbarButton icon="copy" label="Copy" showLabel={false} tooltipPlacement="bottom" />
								<ToolbarButton
									icon="refresh-ccw"
									label="Retry"
									showLabel={false}
									tooltipPlacement="bottom"
								/>
							</Toolbar>
						}
						author="Rubric"
						avatarInitials="RL"
						meta="now"
						messageRole="assistant"
						showAvatar
					>
						The eval runner is failing during schema hydration. I found one stale fixture and a missing
						tool permission edge.
					</Message>
				</MessageStage>
			)
	}
}

function MessageStage({ children }: { children: ReactNode }) {
	return <div style={{ display: 'grid', gap: 12, maxWidth: 680, width: '100%' }}>{children}</div>
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
