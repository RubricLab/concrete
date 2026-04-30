import type { HTMLAttributes, ReactNode } from 'react'
import type { MessageRole, MessageStatus, MessageSurface } from '../../../schemas'
import { Avatar } from '../../avatar'
import { Badge } from '../../badge'
import { MessageBubble } from '../../message-bubble'
import { TranscriptItem, TranscriptMetaItem, TranscriptPlain } from '../../transcript-item'

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
	const messageMeta =
		author || meta || (showStatus && status !== 'complete') ? (
			<>
				<TranscriptMetaItem>{author ?? getMessageRoleLabel(messageRole)}</TranscriptMetaItem>
				{meta ? <TranscriptMetaItem>{meta}</TranscriptMetaItem> : null}
				{showStatus && status !== 'complete' ? (
					<Badge signal={getMessageStatusSignal(status)}>{status}</Badge>
				) : null}
			</>
		) : undefined

	return (
		<TranscriptItem
			actions={actions}
			avatar={shouldRenderAvatar ? (avatar ?? renderMessageAvatar()) : undefined}
			className={className}
			grouped={grouped}
			messageRole={messageRole}
			meta={messageMeta}
			status={status}
			surface={surface}
			{...props}
		>
			{surface === 'bubble' ? (
				<MessageBubble direction={direction}>{children}</MessageBubble>
			) : (
				<TranscriptPlain>{children}</TranscriptPlain>
			)}
		</TranscriptItem>
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
