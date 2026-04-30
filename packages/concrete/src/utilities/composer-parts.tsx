'use client'

import { ConcreteIcon, type IconName } from '../icons'
import { ToolbarButton } from '../primitives/internal/toolbar'
import { cn } from '../primitives/utils'
import type {
	ComposerAttachment,
	ComposerFormat,
	ComposerSuggestion,
	ComposerToken,
	ComposerValue
} from '../schemas'
import { concreteClassNames } from '../styles/class-names'
import {
	getFormatGlyph,
	getFormatShortcut,
	getFormatShortcutKeys,
	getMenuTitle,
	getMenuTrigger,
	type MenuState
} from './composer-engine'

// DX-TODO(composer): Composer subparts are intentionally kept together instead of
// splitting for LOC. If they become reusable outside Composer, promote them into
// explicit primitives instead of adding more local helper files.
export function ComposerRail({
	onAttachmentRemove,
	onTokenRemove,
	value
}: {
	onAttachmentRemove: (attachment: ComposerAttachment) => void
	onTokenRemove: (token: ComposerToken) => void
	value: ComposerValue
}) {
	if (value.mentions.length === 0 && value.commands.length === 0 && value.attachments.length === 0) {
		return null
	}

	return (
		<div className={concreteClassNames.composerRail}>
			{value.mentions.map(token => (
				<span className={concreteClassNames.railChip} data-kind="mention" key={`mention-${token.id}`}>
					<ConcreteIcon name="at-sign" />
					<span>{token.label}</span>
					<button
						aria-label={`Remove ${token.label}`}
						onClick={() => onTokenRemove(token)}
						type="button"
					>
						<ConcreteIcon name="x" />
					</button>
				</span>
			))}
			{value.commands.map(token => (
				<span className={concreteClassNames.railChip} data-kind="command" key={`command-${token.id}`}>
					<ConcreteIcon name="slash" />
					<span>{token.label}</span>
					<button
						aria-label={`Remove ${token.label}`}
						onClick={() => onTokenRemove(token)}
						type="button"
					>
						<ConcreteIcon name="x" />
					</button>
				</span>
			))}
			{value.attachments.map(attachment => (
				<span
					className={concreteClassNames.railChip}
					data-kind="attachment"
					key={`attachment-${attachment.id}`}
				>
					<ConcreteIcon name="paperclip" />
					<span>
						{attachment.name}
						{attachment.meta ? ` · ${attachment.meta}` : ''}
					</span>
					<button
						aria-label={`Remove ${attachment.name}`}
						onClick={() => onAttachmentRemove(attachment)}
						type="button"
					>
						<ConcreteIcon name="x" />
					</button>
				</span>
			))}
		</div>
	)
}

export function ComposerTool({
	icon,
	label,
	onClick,
	shortcut
}: {
	icon: IconName
	label: string
	onClick: () => void
	shortcut?: readonly string[]
}) {
	return (
		<ToolbarButton
			icon={icon}
			label={label}
			onClick={onClick}
			onMouseDown={event => event.preventDefault()}
			showLabel={false}
			{...(shortcut ? { shortcut } : {})}
		/>
	)
}

export function FormatTool({
	active,
	format,
	label,
	onApply,
	pressed
}: {
	active: boolean
	format: ComposerFormat
	label: string
	onApply: () => void
	pressed: boolean
}) {
	return (
		<ToolbarButton
			aria-keyshortcuts={getFormatShortcut(format)}
			className={cn(
				format === 'italic' && concreteClassNames.toolItalic,
				format === 'underline' && concreteClassNames.toolUnderline,
				format === 'strikethrough' && concreteClassNames.toolStrike
			)}
			label={label}
			onClick={onApply}
			onMouseDown={event => event.preventDefault()}
			appearance="subtle"
			pressed={pressed}
			selected={active}
			showShortcut="tooltip"
			shortcut={getFormatShortcutKeys(format)}
		>
			{getFormatGlyph(format)}
		</ToolbarButton>
	)
}

export function ComposerMenu({
	menu,
	onCommit,
	options
}: {
	menu: MenuState
	onCommit: (suggestion: ComposerSuggestion) => void
	options: readonly ComposerSuggestion[]
}) {
	return (
		<div className={concreteClassNames.menu}>
			<div className={concreteClassNames.menuTitle}>
				<span>{getMenuTitle(menu.kind)}</span>
				<code>{getMenuTrigger(menu.kind)}</code>
			</div>
			<div className={concreteClassNames.menuList}>
				{options.length === 0 ? <div className={concreteClassNames.emptyMenu}>No matches</div> : null}
				{options.map((option, index) => (
					<button
						className={concreteClassNames.menuItem}
						data-active={index === menu.activeIndex ? true : undefined}
						data-kind={option.kind}
						disabled={option.disabled}
						key={option.id}
						onMouseDown={event => event.preventDefault()}
						onClick={() => onCommit(option)}
						type="button"
					>
						<span className={concreteClassNames.menuCopy}>
							<b>{option.label}</b>
							{option.description ? <small>{option.description}</small> : null}
						</span>
						{option.meta ? <span className={concreteClassNames.menuMeta}>{option.meta}</span> : null}
					</button>
				))}
			</div>
		</div>
	)
}
