'use client'

import type { IconName } from '../icons'
import {
	Listbox,
	MenuGroup,
	MenuSurface,
	OptionRow,
	ToolbarControlButton,
	ToolbarFormatGlyph
} from '../primitives'
import type { ComposerFormat, ComposerSuggestion } from '../schemas'
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
		<ToolbarControlButton
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
		<ToolbarControlButton
			aria-keyshortcuts={getFormatShortcut(format)}
			label={label}
			onClick={onApply}
			onMouseDown={event => event.preventDefault()}
			appearance="subtle"
			pressed={pressed}
			selected={active}
			showShortcut="tooltip"
			shortcut={getFormatShortcutKeys(format)}
		>
			<ToolbarFormatGlyph format={format}>{getFormatGlyph(format)}</ToolbarFormatGlyph>
		</ToolbarControlButton>
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
		<MenuSurface density="compact" role="menu">
			<MenuGroup
				title={
					<>
						<span>{getMenuTitle(menu.kind)}</span>
						<code>{getMenuTrigger(menu.kind)}</code>
					</>
				}
			>
				<Listbox emptyLabel="No matches" role="menu" size="compact">
					{options.length > 0
						? options.map((option, index) => (
								<OptionRow
									active={index === menu.activeIndex}
									description={option.description}
									disabled={option.disabled}
									kind="command"
									key={option.id}
									label={option.label}
									meta={option.meta}
									onClick={() => onCommit(option)}
									onMouseDown={event => event.preventDefault()}
								/>
							))
						: null}
				</Listbox>
			</MenuGroup>
		</MenuSurface>
	)
}
