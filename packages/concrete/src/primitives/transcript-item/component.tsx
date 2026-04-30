import type { HTMLAttributes, ReactNode } from 'react'
import type { MessageRole, MessageStatus, MessageSurface } from '../../schemas'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

export type TranscriptItemProps = HTMLAttributes<HTMLElement> & {
	actions?: ReactNode
	avatar?: ReactNode
	children: ReactNode
	grouped?: boolean | undefined
	messageRole?: MessageRole | undefined
	meta?: ReactNode
	status?: MessageStatus | undefined
	surface?: MessageSurface | undefined
}

export type TranscriptPlainProps = HTMLAttributes<HTMLDivElement> & {
	children: ReactNode
}

export type TranscriptMetaItemProps = HTMLAttributes<HTMLSpanElement> & {
	children: ReactNode
}

export function TranscriptItem({
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
}: TranscriptItemProps) {
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

export function TranscriptPlain({ children, className, ...props }: TranscriptPlainProps) {
	return (
		<div className={cn(concreteClassNames.messagePlain, className)} {...props}>
			{children}
		</div>
	)
}

export function TranscriptMetaItem({ children, ...props }: TranscriptMetaItemProps) {
	return <span {...props}>{children}</span>
}
