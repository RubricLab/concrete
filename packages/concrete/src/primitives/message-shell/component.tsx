import type { HTMLAttributes, ReactNode } from 'react'
import type { MessageRole, MessageStatus, MessageSurface } from '../../schemas'
import { concreteClassNames } from '../../styles/class-names'
import { Bubble, type BubbleProps } from '../bubble'
import { cn } from '../utils'

export type MessageShellProps = HTMLAttributes<HTMLElement> & {
	actions?: ReactNode
	avatar?: ReactNode
	children: ReactNode
	grouped?: boolean | undefined
	messageRole?: MessageRole | undefined
	meta?: ReactNode
	status?: MessageStatus | undefined
	surface?: MessageSurface | undefined
}

export type MessagePlainProps = HTMLAttributes<HTMLDivElement> & {
	children: ReactNode
}

export type MessageMetaItemProps = HTMLAttributes<HTMLSpanElement> & {
	children: ReactNode
}

export type MessageBubbleProps = Omit<BubbleProps, 'className'> & {
	className?: string | undefined
}

export function MessageShell({
	actions,
	avatar,
	children,
	className,
	grouped = false,
	messageRole = 'assistant',
	meta,
	status = 'complete',
	surface = 'bubble',
	...props
}: MessageShellProps) {
	return (
		<article
			className={cn(concreteClassNames.message, className)}
			data-grouped={grouped ? true : undefined}
			data-role={messageRole}
			data-status={status}
			data-surface={surface}
			{...props}
		>
			{avatar ? <span className={concreteClassNames.messageAvatar}>{avatar}</span> : null}
			<div className={concreteClassNames.messageStack}>
				{meta ? <header className={concreteClassNames.messageMeta}>{meta}</header> : null}
				{children}
				{actions ? <div className={concreteClassNames.messageActions}>{actions}</div> : null}
			</div>
		</article>
	)
}

export function MessagePlain({ children, className, ...props }: MessagePlainProps) {
	return (
		<div className={cn(concreteClassNames.messagePlain, className)} {...props}>
			{children}
		</div>
	)
}

export function MessageMetaItem({ children, ...props }: MessageMetaItemProps) {
	return <span {...props}>{children}</span>
}

export function MessageBubble({ className, ...props }: MessageBubbleProps) {
	return <Bubble className={cn(concreteClassNames.messageBubble, className)} {...props} />
}
