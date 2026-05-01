'use client'

import type { ClipboardEvent, HTMLAttributes, KeyboardEvent, ReactNode } from 'react'
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import type { IconName } from '../../icons'
import {
	ComposerEditor,
	ComposerFooter,
	ComposerMenuLayer,
	ComposerSendButton,
	ComposerSubmitDock,
	ComposerSurface,
	ComposerToolbar,
	Listbox,
	MenuGroup,
	MenuSurface,
	OptionRow,
	TokenRail,
	type TokenRailItemData,
	ToolbarControlButton,
	ToolbarControlGroup,
	ToolbarControlSeparator,
	ToolbarFormatGlyph,
	Tooltip
} from '../../primitives'
import type {
	ComposerAttachment,
	ComposerFormat,
	ComposerSuggestion,
	ComposerSuggestionKind,
	ComposerToken,
	ComposerValue
} from '../../schemas'
import {
	applyFormat,
	type ComposerShortcutId,
	commitSuggestion,
	defaultCommands,
	defaultMentions,
	emptyValue,
	getActiveFormats,
	getFormatGlyph,
	getFormatShortcut,
	getFormatShortcutKeys,
	getInitialHtml,
	getMenuOptions,
	getMenuTitle,
	getMenuTrigger,
	getShortcutFormat,
	getTextBeforeCaret,
	getTrigger,
	isMenuControlKey,
	type MenuState,
	normalizeEditorSelection,
	readComposerValue,
	removeTokenElements,
	removeTokenFromValue,
	setCaretToEnd,
	shortcutPressDuration,
	submitComposer
} from '../../utilities/composer-engine'

export type {
	ComposerAttachment,
	ComposerFormat,
	ComposerSuggestion,
	ComposerSuggestionKind,
	ComposerToken,
	ComposerValue
} from '../../schemas'

export type ComposerProps = Omit<
	HTMLAttributes<HTMLDivElement>,
	'defaultValue' | 'onChange' | 'onSubmit'
> & {
	commandOptions?: readonly ComposerSuggestion[]
	defaultMenuKind?: ComposerSuggestionKind
	defaultMenuQuery?: string
	defaultValue?: ComposerValue
	disabled?: boolean
	mentionOptions?: readonly ComposerSuggestion[]
	onAttachmentRequest?: () => void
	onAttachmentRemove?: (attachment: ComposerAttachment) => void
	onSubmit?: (value: ComposerValue) => void
	onValueChange?: (value: ComposerValue) => void
	placeholder?: string
	submitLabel?: ReactNode
	submitOnEnter?: boolean
	value?: ComposerValue
}

export function Composer({
	className,
	commandOptions = defaultCommands,
	defaultMenuKind,
	defaultMenuQuery = '',
	defaultValue = emptyValue,
	disabled = false,
	mentionOptions = defaultMentions,
	onAttachmentRemove,
	onAttachmentRequest,
	onSubmit,
	onValueChange,
	placeholder = 'Write a message...',
	submitLabel = 'Send',
	submitOnEnter = true,
	value,
	...props
}: ComposerProps) {
	const editorRef = useRef<HTMLDivElement>(null)
	const savedRangeRef = useRef<Range | null>(null)
	const shortcutResetRef = useRef<number | null>(null)
	const initialHtmlRef = useRef(getInitialHtml(value ?? defaultValue))
	const hasInitializedEditorRef = useRef(false)
	const lastPublishedHtmlRef = useRef(initialHtmlRef.current)
	const [internalValue, setInternalValue] = useState<ComposerValue>(defaultValue)
	const [menu, setMenu] = useState<MenuState | null>(() =>
		defaultMenuKind
			? {
					activeIndex: 0,
					kind: defaultMenuKind,
					query: defaultMenuQuery,
					triggerText: `${getMenuTrigger(defaultMenuKind)}${defaultMenuQuery}`
				}
			: null
	)
	const [activeFormats, setActiveFormats] = useState<readonly ComposerFormat[]>([])
	const [pressedShortcut, setPressedShortcut] = useState<ComposerShortcutId | null>(null)
	const currentValue = value ?? internalValue
	const isControlled = value !== undefined
	const options = useMemo(
		() => getMenuOptions(menu?.kind, mentionOptions, commandOptions, menu?.query ?? ''),
		[commandOptions, mentionOptions, menu]
	)

	const flashShortcut = useCallback((shortcutId: ComposerShortcutId) => {
		if (shortcutResetRef.current !== null) {
			window.clearTimeout(shortcutResetRef.current)
		}

		setPressedShortcut(shortcutId)
		shortcutResetRef.current = window.setTimeout(() => {
			setPressedShortcut(null)
			shortcutResetRef.current = null
		}, shortcutPressDuration)
	}, [])

	useLayoutEffect(() => {
		if (!editorRef.current || hasInitializedEditorRef.current) {
			return
		}

		editorRef.current.innerHTML = initialHtmlRef.current
		hasInitializedEditorRef.current = true
	}, [])

	useEffect(
		() => () => {
			if (shortcutResetRef.current !== null) {
				window.clearTimeout(shortcutResetRef.current)
			}
		},
		[]
	)

	useEffect(() => {
		if (!value || !editorRef.current) {
			return
		}

		const nextHtml = getInitialHtml(value)

		if (nextHtml === lastPublishedHtmlRef.current || editorRef.current.innerHTML === nextHtml) {
			return
		}

		editorRef.current.innerHTML = nextHtml
		lastPublishedHtmlRef.current = nextHtml
	}, [value])

	const publishValue = useCallback(() => {
		const editor = editorRef.current

		if (!editor) {
			return currentValue
		}

		const nextValue = readComposerValue(editor, currentValue.attachments)

		lastPublishedHtmlRef.current = nextValue.html

		if (!isControlled) {
			setInternalValue(nextValue)
		}

		onValueChange?.(nextValue)
		return nextValue
	}, [currentValue, isControlled, onValueChange])

	const publishExplicitValue = useCallback(
		(nextValue: ComposerValue) => {
			lastPublishedHtmlRef.current = nextValue.html

			if (!isControlled) {
				setInternalValue(nextValue)
			}

			onValueChange?.(nextValue)
			return nextValue
		},
		[isControlled, onValueChange]
	)

	const syncMenu = useCallback(() => {
		const editor = editorRef.current
		const beforeCaret = editor ? getTextBeforeCaret(editor) : ''
		const trigger = getTrigger(beforeCaret)

		if (!trigger) {
			setMenu(null)
			return
		}

		setMenu(currentMenu => ({
			activeIndex: currentMenu?.kind === trigger.kind ? currentMenu.activeIndex : 0,
			kind: trigger.kind,
			query: trigger.query,
			triggerText: trigger.triggerText
		}))
	}, [])

	const saveSelection = useCallback(() => {
		const editor = editorRef.current
		const selection = window.getSelection()

		if (!editor || !selection || selection.rangeCount === 0) {
			return
		}

		const range = selection.getRangeAt(0)

		if (editor.contains(range.commonAncestorContainer)) {
			savedRangeRef.current = range.cloneRange()
		}

		setActiveFormats(getActiveFormats())
	}, [])

	const handleInput = useCallback(() => {
		saveSelection()
		publishValue()
		syncMenu()
	}, [publishValue, saveSelection, syncMenu])

	const handleEditorMouseUp = useCallback(() => {
		const editor = editorRef.current

		if (editor) {
			normalizeEditorSelection(editor)
		}

		saveSelection()
	}, [saveSelection])

	const handlePaste = useCallback(
		(event: ClipboardEvent<HTMLDivElement>) => {
			event.preventDefault()
			document.execCommand('insertText', false, event.clipboardData.getData('text/plain'))
			saveSelection()
			publishValue()
			syncMenu()
		},
		[publishValue, saveSelection, syncMenu]
	)

	const handleEditorKeyDown = useCallback(
		(event: KeyboardEvent<HTMLDivElement>) => {
			if (event.metaKey || event.ctrlKey) {
				const format = getShortcutFormat(event)

				if (format) {
					event.preventDefault()
					flashShortcut(format)
					applyFormat(format, editorRef, saveSelection, publishValue)
					return
				}

				if (event.key === 'Enter') {
					event.preventDefault()
					flashShortcut('submit')
					submitComposer(editorRef, currentValue.attachments, onSubmit, publishValue)
					return
				}
			}

			if (menu) {
				switch (event.key) {
					case 'ArrowDown':
						if (options.length > 0) {
							event.preventDefault()
							setMenu({ ...menu, activeIndex: (menu.activeIndex + 1) % options.length })
						}
						return
					case 'ArrowUp':
						if (options.length > 0) {
							event.preventDefault()
							setMenu({
								...menu,
								activeIndex: (menu.activeIndex - 1 + options.length) % options.length
							})
						}
						return
					case 'Tab':
					case 'Enter': {
						const selectedOption = options[menu.activeIndex]

						if (!selectedOption) {
							setMenu(null)
							return
						}

						event.preventDefault()
						commitSuggestion(selectedOption, menu, editorRef, savedRangeRef, publishValue)
						setMenu(null)
						return
					}
					case 'Escape':
						event.preventDefault()
						setMenu(null)
						editorRef.current?.focus()
						return
					default:
						break
				}
			}

			if (event.key === 'Enter' && submitOnEnter && !event.shiftKey) {
				event.preventDefault()
				flashShortcut('submit')
				submitComposer(editorRef, currentValue.attachments, onSubmit, publishValue)
			}
		},
		[
			currentValue.attachments,
			flashShortcut,
			menu,
			onSubmit,
			options,
			publishValue,
			saveSelection,
			submitOnEnter
		]
	)

	const openMenu = useCallback(
		(kind: ComposerSuggestionKind) => {
			const editor = editorRef.current

			if (editor && !savedRangeRef.current) {
				setCaretToEnd(editor)
			}

			saveSelection()
			editor?.focus()
			setMenu({ activeIndex: 0, kind, query: '', triggerText: '' })
		},
		[saveSelection]
	)

	const removeAttachment = useCallback(
		(attachment: ComposerAttachment) => {
			const nextValue = {
				...currentValue,
				attachments: currentValue.attachments.filter(item => item.id !== attachment.id)
			}

			onAttachmentRemove?.(attachment)
			publishExplicitValue(nextValue)
		},
		[currentValue, onAttachmentRemove, publishExplicitValue]
	)

	const removeToken = useCallback(
		(token: ComposerToken) => {
			const editor = editorRef.current

			if (!editor || !removeTokenElements(editor, token)) {
				const nextValue = removeTokenFromValue(currentValue, token)
				publishExplicitValue(nextValue)
				return
			}

			editor.focus()
			const nextValue = readComposerValue(editor, currentValue.attachments)
			publishExplicitValue(nextValue)
			saveSelection()
		},
		[currentValue, publishExplicitValue, saveSelection]
	)
	const tokenRailItems = useMemo<readonly TokenRailItemData[]>(
		() => [
			...currentValue.mentions.map(token => ({
				icon: 'at-sign' as const,
				id: `mention-${token.id}`,
				kind: 'mention' as const,
				label: token.label,
				onRemove: () => removeToken(token),
				removeLabel: `Remove ${token.label}`
			})),
			...currentValue.commands.map(token => ({
				icon: 'slash' as const,
				id: `command-${token.id}`,
				kind: 'command' as const,
				label: token.label,
				onRemove: () => removeToken(token),
				removeLabel: `Remove ${token.label}`
			})),
			...currentValue.attachments.map(attachment => ({
				icon: 'paperclip' as const,
				id: `attachment-${attachment.id}`,
				kind: 'attachment' as const,
				label: attachment.name,
				meta: attachment.meta,
				onRemove: () => removeAttachment(attachment),
				removeLabel: `Remove ${attachment.name}`
			}))
		],
		[currentValue, removeAttachment, removeToken]
	)

	return (
		<ComposerSurface className={className} disabled={disabled} {...props}>
			<TokenRail items={tokenRailItems} />
			<ComposerEditor
				aria-label="Message composer"
				aria-multiline="true"
				disabled={disabled}
				placeholder={placeholder}
				onInput={handleInput}
				onKeyDown={handleEditorKeyDown}
				onKeyUp={event => {
					saveSelection()

					if (!isMenuControlKey(event.key)) {
						syncMenu()
					}
				}}
				onMouseUp={handleEditorMouseUp}
				onPaste={handlePaste}
				ref={editorRef}
				role="textbox"
			/>
			<ComposerFooter>
				<ComposerToolbar>
					<ToolbarControlGroup>
						<ComposerTool
							icon="paperclip"
							label="Attach"
							onClick={() => {
								editorRef.current?.focus()
								onAttachmentRequest?.()
							}}
						/>
						<ComposerTool
							icon="at-sign"
							label="Mention"
							onClick={() => openMenu('mention')}
							shortcut={['@']}
						/>
						<ComposerTool
							icon="slash"
							label="Command"
							onClick={() => openMenu('command')}
							shortcut={['/']}
						/>
					</ToolbarControlGroup>
					<ToolbarControlSeparator />
					<ToolbarControlGroup>
						<FormatTool
							active={activeFormats.includes('bold')}
							format="bold"
							label="Bold"
							onApply={() => applyFormat('bold', editorRef, saveSelection, publishValue)}
							pressed={pressedShortcut === 'bold'}
						/>
						<FormatTool
							active={activeFormats.includes('italic')}
							format="italic"
							label="Italic"
							onApply={() => applyFormat('italic', editorRef, saveSelection, publishValue)}
							pressed={pressedShortcut === 'italic'}
						/>
						<FormatTool
							active={activeFormats.includes('underline')}
							format="underline"
							label="Underline"
							onApply={() => applyFormat('underline', editorRef, saveSelection, publishValue)}
							pressed={pressedShortcut === 'underline'}
						/>
						<FormatTool
							active={activeFormats.includes('strikethrough')}
							format="strikethrough"
							label="Strikethrough"
							onApply={() => applyFormat('strikethrough', editorRef, saveSelection, publishValue)}
							pressed={pressedShortcut === 'strikethrough'}
						/>
					</ToolbarControlGroup>
				</ComposerToolbar>
				<ComposerSubmitDock>
					<Tooltip content="Send message" placement="top" shortcut={['cmd', 'enter']}>
						<ComposerSendButton
							aria-label="Send"
							disabled={disabled}
							hierarchy="primary"
							leadingIcon="send-horizontal"
							onClick={() => {
								flashShortcut('submit')
								submitComposer(editorRef, currentValue.attachments, onSubmit, publishValue)
							}}
							pressed={pressedShortcut === 'submit'}
							shortcut={['cmd', 'enter']}
						>
							{submitLabel}
						</ComposerSendButton>
					</Tooltip>
				</ComposerSubmitDock>
			</ComposerFooter>
			{menu ? (
				<ComposerMenuLayer>
					<ComposerMenu
						menu={menu}
						onCommit={suggestion => {
							commitSuggestion(suggestion, menu, editorRef, savedRangeRef, publishValue)
							setMenu(null)
						}}
						options={options}
					/>
				</ComposerMenuLayer>
			) : null}
		</ComposerSurface>
	)
}

function ComposerTool({
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

function FormatTool({
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

function ComposerMenu({
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
				<Listbox emptyLabel="No matches" role="menu" density="compact">
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
