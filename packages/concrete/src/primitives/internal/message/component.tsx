import type { HTMLAttributes, ReactNode } from 'react'
import type { MessageRole, MessageStatus, MessageSurface } from '../../../schemas'
import { concreteClassNames } from '../../../styles/class-names'
import { Avatar } from '../../avatar'
import { Badge } from '../../badge'
import { Bubble } from '../../bubble'
import { cn } from '../../utils'

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
