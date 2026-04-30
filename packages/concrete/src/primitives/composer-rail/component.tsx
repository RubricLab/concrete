import type { HTMLAttributes, ReactNode } from 'react'
import { ConcreteIcon, type IconName } from '../../icons'
import type { ComposerAttachment, ComposerToken, ComposerValue } from '../../schemas'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

export type ComposerRailProps = HTMLAttributes<HTMLDivElement> & {
	onAttachmentRemove?: (attachment: ComposerAttachment) => void
	onTokenRemove?: (token: ComposerToken) => void
	value: ComposerValue
}

export function ComposerRail({
	className,
	onAttachmentRemove,
	onTokenRemove,
	value,
	...props
}: ComposerRailProps) {
	if (value.mentions.length === 0 && value.commands.length === 0 && value.attachments.length === 0) {
		return null
	}

	return (
		<div className={cn(concreteClassNames.composerRail, className)} {...props}>
			{value.mentions.map(token => (
				<ComposerRailChip
					icon="at-sign"
					key={`mention-${token.id}`}
					kind="mention"
					label={token.label}
					onRemove={onTokenRemove ? () => onTokenRemove(token) : undefined}
					removeLabel={`Remove ${token.label}`}
				/>
			))}
			{value.commands.map(token => (
				<ComposerRailChip
					icon="slash"
					key={`command-${token.id}`}
					kind="command"
					label={token.label}
					onRemove={onTokenRemove ? () => onTokenRemove(token) : undefined}
					removeLabel={`Remove ${token.label}`}
				/>
			))}
			{value.attachments.map(attachment => (
				<ComposerRailChip
					icon="paperclip"
					key={`attachment-${attachment.id}`}
					kind="attachment"
					label={attachment.name}
					meta={attachment.meta}
					onRemove={onAttachmentRemove ? () => onAttachmentRemove(attachment) : undefined}
					removeLabel={`Remove ${attachment.name}`}
				/>
			))}
		</div>
	)
}

export type ComposerRailChipKind = 'attachment' | 'command' | 'mention'

export type ComposerRailChipProps = HTMLAttributes<HTMLSpanElement> & {
	icon?: IconName | undefined
	kind: ComposerRailChipKind
	label: ReactNode
	meta?: ReactNode
	onRemove?: (() => void) | undefined
	removeLabel?: string | undefined
}

export function ComposerRailChip({
	children,
	className,
	icon,
	kind,
	label,
	meta,
	onRemove,
	removeLabel,
	...props
}: ComposerRailChipProps) {
	return (
		<span className={cn(concreteClassNames.railChip, className)} data-kind={kind} {...props}>
			{icon ? <ConcreteIcon name={icon} /> : null}
			<span>
				{children ?? label}
				{meta ? ` · ${meta}` : ''}
			</span>
			{onRemove ? (
				<button aria-label={removeLabel ?? 'Remove'} onClick={onRemove} type="button">
					<ConcreteIcon name="x" />
				</button>
			) : null}
		</span>
	)
}
