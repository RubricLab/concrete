'use client'

import type { ClipboardEvent, HTMLAttributes, KeyboardEvent, ReactNode, RefObject } from 'react'
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { ConcreteIcon, type IconName } from '../icons'
import { Button, Tooltip } from '../primitives'
import { cn } from '../primitives/utils'
import type {
	ComposerAttachment,
	ComposerFormat,
	ComposerSuggestion,
	ComposerSuggestionKind,
	ComposerToken,
	ComposerValue
} from '../schemas'
import classes from './components.module.css'
import { Toolbar, ToolbarButton, ToolbarGroup, ToolbarSeparator } from './interaction'

type ComposerShortcutId = ComposerFormat | 'submit'

export type {
	ComposerAttachment,
	ComposerFormat,
	ComposerSuggestion,
	ComposerSuggestionKind,
	ComposerToken,
	ComposerValue
} from '../schemas'
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

type MenuState = {
	activeIndex: number
	kind: ComposerSuggestionKind
	query: string
	triggerText: string
}

const defaultMentions = [
	{
		avatar: 'AV',
		description: 'Research lead',
		disabled: false,
		id: 'arihan',
		insertLabel: 'arihan',
		kind: 'mention',
		label: 'Arihan V.',
		meta: 'return'
	},
	{
		avatar: 'TH',
		description: 'Applied engineering',
		disabled: false,
		id: 'tom',
		insertLabel: 'tom',
		kind: 'mention',
		label: 'Tom H.'
	},
	{
		avatar: 'JR',
		description: 'Systems research',
		disabled: false,
		id: 'jordan',
		insertLabel: 'jordan',
		kind: 'mention',
		label: 'Jordan R.'
	}
] as const satisfies readonly ComposerSuggestion[]

const defaultCommands = [
	{
		description: 'Summarize the active thread',
		disabled: false,
		id: 'summarize',
		kind: 'command',
		label: '/summarize',
		meta: 'thread'
	},
	{
		description: 'Run an evaluation agent',
		disabled: false,
		id: 'eval',
		kind: 'command',
		label: '/eval',
		meta: 'agent'
	},
	{
		description: 'Prepare a deployment plan',
		disabled: false,
		id: 'deploy',
		kind: 'command',
		label: '/deploy',
		meta: 'prod'
	}
] as const satisfies readonly ComposerSuggestion[]

const emptyValue: ComposerValue = {
	attachments: [],
	commands: [],
	html: '',
	mentions: [],
	text: ''
}

const shortcutPressDuration = 180

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

	return (
		<div
			className={cn(classes.composer, className)}
			data-disabled={disabled ? true : undefined}
			{...props}
		>
			<ComposerRail
				onAttachmentRemove={removeAttachment}
				onTokenRemove={removeToken}
				value={currentValue}
			/>
			{/* biome-ignore lint/a11y/useSemanticElements: Rich text composer needs contenteditable for inline tokens and formatting. */}
			<div
				aria-label="Message composer"
				aria-multiline="true"
				className={classes.editor}
				contentEditable={!disabled}
				data-placeholder={placeholder}
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
				suppressContentEditableWarning
				tabIndex={disabled ? -1 : 0}
			/>
			<div className={classes.footer}>
				<Toolbar className={classes.composerToolbar} compact label="Composer tools">
					<ToolbarGroup>
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
					</ToolbarGroup>
					<ToolbarSeparator />
					<ToolbarGroup>
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
					</ToolbarGroup>
				</Toolbar>
				<div className={classes.submitDock}>
					<Tooltip content="Send message" placement="top" shortcut={['cmd', 'enter']}>
						<Button
							aria-label="Send"
							className={classes.sendButton}
							disabled={disabled}
							leadingIcon="send-horizontal"
							onClick={() => {
								flashShortcut('submit')
								submitComposer(editorRef, currentValue.attachments, onSubmit, publishValue)
							}}
							pressed={pressedShortcut === 'submit'}
							shortcut={['cmd', 'enter']}
							variant="primary"
						>
							{submitLabel}
						</Button>
					</Tooltip>
				</div>
			</div>
			{menu ? (
				<div className={classes.menuLayer}>
					<ComposerMenu
						menu={menu}
						onCommit={suggestion => {
							commitSuggestion(suggestion, menu, editorRef, savedRangeRef, publishValue)
							setMenu(null)
						}}
						options={options}
					/>
				</div>
			) : null}
		</div>
	)
}

function ComposerRail({
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
		<div className={classes.composerRail}>
			{value.mentions.map(token => (
				<span className={classes.railChip} data-kind="mention" key={`mention-${token.id}`}>
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
				<span className={classes.railChip} data-kind="command" key={`command-${token.id}`}>
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
				<span className={classes.railChip} data-kind="attachment" key={`attachment-${attachment.id}`}>
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
		<ToolbarButton
			aria-keyshortcuts={getFormatShortcut(format)}
			className={cn(
				format === 'italic' && classes.toolItalic,
				format === 'underline' && classes.toolUnderline,
				format === 'strikethrough' && classes.toolStrike
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
		<div className={classes.menu}>
			<div className={classes.menuTitle}>
				<span>{getMenuTitle(menu.kind)}</span>
				<code>{getMenuTrigger(menu.kind)}</code>
			</div>
			<div className={classes.menuList}>
				{options.length === 0 ? <div className={classes.emptyMenu}>No matches</div> : null}
				{options.map((option, index) => (
					<button
						className={classes.menuItem}
						data-active={index === menu.activeIndex ? true : undefined}
						data-kind={option.kind}
						disabled={option.disabled}
						key={option.id}
						onMouseDown={event => event.preventDefault()}
						onClick={() => onCommit(option)}
						type="button"
					>
						<span className={classes.menuCopy}>
							<b>{option.label}</b>
							{option.description ? <small>{option.description}</small> : null}
						</span>
						{option.meta ? <span className={classes.menuMeta}>{option.meta}</span> : null}
					</button>
				))}
			</div>
		</div>
	)
}

function submitComposer(
	editorRef: RefObject<HTMLDivElement | null>,
	attachments: readonly ComposerAttachment[],
	onSubmit: ((value: ComposerValue) => void) | undefined,
	publishValue: () => ComposerValue
) {
	const value = publishValue()
	const hasContent = value.text.trim().length > 0 || attachments.length > 0

	if (!hasContent) {
		editorRef.current?.focus()
		return
	}

	onSubmit?.(value)
}

function applyFormat(
	format: ComposerFormat,
	editorRef: RefObject<HTMLDivElement | null>,
	saveSelection: () => void,
	publishValue: () => ComposerValue
) {
	editorRef.current?.focus()
	document.execCommand(getFormatCommand(format))
	saveSelection()
	publishValue()
}

function commitSuggestion(
	suggestion: ComposerSuggestion,
	menu: MenuState,
	editorRef: RefObject<HTMLDivElement | null>,
	savedRangeRef: RefObject<Range | null>,
	publishValue: () => ComposerValue
) {
	if (suggestion.disabled) {
		return
	}

	const editor = editorRef.current

	if (!editor) {
		return
	}

	editor.focus()
	restoreRange(editor, savedRangeRef.current)
	replaceTriggerWithSuggestion(editor, menu.triggerText, suggestion)
	publishValue()
}

function replaceTriggerWithSuggestion(
	editor: HTMLDivElement,
	triggerText: string,
	suggestion: ComposerSuggestion
) {
	const selection = window.getSelection()
	const range = selection?.rangeCount ? selection.getRangeAt(0) : null

	if (range && !editor.contains(range.commonAncestorContainer)) {
		range.selectNodeContents(editor)
		range.collapse(false)
	}

	if (range && triggerText && range.startContainer.nodeType === Node.TEXT_NODE) {
		const text = range.startContainer.textContent ?? ''
		const offset = range.startOffset

		if (
			offset >= triggerText.length &&
			text.slice(offset - triggerText.length, offset) === triggerText
		) {
			const tokenRange = range.cloneRange()

			tokenRange.setStart(range.startContainer, offset - triggerText.length)
			insertSuggestionNode(tokenRange, suggestion)
			return
		}
	}

	if (range && triggerText) {
		const triggerRange = getTriggerRange(editor, range, triggerText)

		if (triggerRange) {
			insertSuggestionNode(triggerRange, suggestion)
			return
		}
	}

	if (range) {
		insertSuggestionNode(range, suggestion)
		return
	}

	document.execCommand('insertText', false, getSuggestionInsertText(suggestion))
	editor.normalize()
}

function getTriggerRange(editor: HTMLDivElement, range: Range, triggerText: string): Range | null {
	const selection = window.getSelection()

	if (!selection || !editor.contains(range.commonAncestorContainer)) {
		return null
	}

	selection.removeAllRanges()
	selection.addRange(range.cloneRange())

	for (const _character of triggerText) {
		selection.modify('extend', 'backward', 'character')
	}

	if (selection.toString() !== triggerText || selection.rangeCount === 0) {
		selection.removeAllRanges()
		selection.addRange(range)
		return null
	}

	return selection.getRangeAt(0).cloneRange()
}

function insertSuggestionNode(range: Range, suggestion: ComposerSuggestion) {
	const token = document.createElement('span')
	const spacer = document.createTextNode('\u00a0')

	token.className = classes.composerToken ?? ''
	token.dataset.composerToken = suggestion.kind
	token.dataset.id = suggestion.id
	token.dataset.label = getSuggestionInsertLabel(suggestion)
	token.contentEditable = 'false'
	token.textContent = getSuggestionInsertText(suggestion)
	range.deleteContents()
	range.insertNode(spacer)
	range.insertNode(token)
	range.setStartAfter(spacer)
	range.collapse(true)
	moveSelectionToEnd(range)
}

function moveSelectionToEnd(range: Range) {
	const selection = window.getSelection()

	range.collapse(false)
	selection?.removeAllRanges()
	selection?.addRange(range)
}

function normalizeEditorSelection(editor: HTMLDivElement) {
	const selection = window.getSelection()

	if (!selection || selection.rangeCount === 0) {
		setCaretToEnd(editor)
		return
	}

	const range = selection.getRangeAt(0)

	if (!editor.contains(range.commonAncestorContainer)) {
		setCaretToEnd(editor)
		return
	}

	if (range.collapsed && isRangeAtEditorStart(editor, range) && editor.innerText) {
		setCaretToEnd(editor)
	}
}

function isRangeAtEditorStart(editor: HTMLDivElement, range: Range): boolean {
	const beforeRange = range.cloneRange()

	beforeRange.selectNodeContents(editor)
	beforeRange.setEnd(range.startContainer, range.startOffset)
	return beforeRange.toString().length === 0
}

function setCaretToEnd(editor: HTMLDivElement) {
	const selection = window.getSelection()
	const range = document.createRange()

	range.selectNodeContents(editor)
	range.collapse(false)
	selection?.removeAllRanges()
	selection?.addRange(range)
}

function restoreRange(editor: HTMLDivElement, range: Range | null) {
	if (!range || !editor.contains(range.commonAncestorContainer)) {
		return
	}

	const selection = window.getSelection()

	selection?.removeAllRanges()
	selection?.addRange(range)
}

function readComposerValue(
	editor: HTMLDivElement,
	attachments: readonly ComposerAttachment[]
): ComposerValue {
	const mentions = readTokens(editor, 'mention')
	const commands = readTokens(editor, 'command')

	return {
		attachments: [...attachments],
		commands,
		html: editor.innerHTML,
		mentions,
		text: editor.innerText.replace(/\u00a0/g, ' ')
	}
}

function readTokens(editor: HTMLDivElement, kind: ComposerSuggestionKind): ComposerToken[] {
	const elements = editor.querySelectorAll(`[data-composer-token="${kind}"]`)
	const tokens = Array.from(elements).map(element => ({
		id: element.getAttribute('data-id') ?? element.textContent ?? kind,
		kind,
		label: element.getAttribute('data-label') ?? element.textContent ?? ''
	}))
	const seen = new Set<string>()

	return tokens.filter(token => {
		if (seen.has(token.id)) {
			return false
		}

		seen.add(token.id)
		return true
	})
}

function removeTokenElements(editor: HTMLDivElement, token: ComposerToken): boolean {
	const elements = editor.querySelectorAll(`[data-composer-token="${token.kind}"]`)
	let didRemove = false

	for (const element of Array.from(elements)) {
		if (element.getAttribute('data-id') !== token.id) {
			continue
		}

		removeTokenSpacer(element)
		element.remove()
		didRemove = true
	}

	editor.normalize()
	return didRemove
}

function removeTokenSpacer(element: Element) {
	const nextSibling = element.nextSibling

	if (nextSibling?.nodeType === Node.TEXT_NODE && removeSpacerFromTextNode(nextSibling, 'start')) {
		return
	}

	const previousSibling = element.previousSibling

	if (previousSibling?.nodeType === Node.TEXT_NODE) {
		removeSpacerFromTextNode(previousSibling, 'end')
	}
}

function removeSpacerFromTextNode(node: ChildNode, edge: 'end' | 'start'): boolean {
	const text = node.textContent ?? ''
	const hasSpacer = edge === 'start' ? text.startsWith('\u00a0') : text.endsWith('\u00a0')

	if (!hasSpacer) {
		return false
	}

	node.textContent = edge === 'start' ? text.slice(1) : text.slice(0, -1)

	if ((node.textContent ?? '').length === 0) {
		node.parentNode?.removeChild(node)
	}

	return true
}

function removeTokenFromValue(value: ComposerValue, token: ComposerToken): ComposerValue {
	switch (token.kind) {
		case 'command':
			return {
				...value,
				commands: value.commands.filter(command => command.id !== token.id)
			}
		case 'mention':
			return {
				...value,
				mentions: value.mentions.filter(mention => mention.id !== token.id)
			}
	}
}

function getMenuOptions(
	kind: ComposerSuggestionKind | undefined,
	mentionOptions: readonly ComposerSuggestion[],
	commandOptions: readonly ComposerSuggestion[],
	query: string
): readonly ComposerSuggestion[] {
	const source = (() => {
		switch (kind) {
			case 'command':
				return commandOptions
			case 'mention':
				return mentionOptions
			default:
				return []
		}
	})()
	const normalizedQuery = query.toLowerCase()

	if (!normalizedQuery) {
		return source
	}

	return source.filter(option =>
		[option.label, option.insertLabel, option.description, option.meta]
			.filter(isPresent)
			.some(value => value.toLowerCase().includes(normalizedQuery))
	)
}

function getTrigger(text: string): MenuState | null {
	const match = /(^|\s)([@/])([\w-]*)$/.exec(text)

	if (!match) {
		return null
	}

	return {
		activeIndex: 0,
		kind: match[2] === '@' ? 'mention' : 'command',
		query: match[3] ?? '',
		triggerText: `${match[2]}${match[3] ?? ''}`
	}
}

function getTextBeforeCaret(editor: HTMLDivElement): string {
	const selection = window.getSelection()

	if (!selection || selection.rangeCount === 0) {
		return ''
	}

	const range = selection.getRangeAt(0)

	if (!editor.contains(range.commonAncestorContainer)) {
		return ''
	}

	const beforeRange = range.cloneRange()

	beforeRange.selectNodeContents(editor)
	beforeRange.setEnd(range.endContainer, range.endOffset)
	return beforeRange.toString()
}

function getActiveFormats(): readonly ComposerFormat[] {
	const formats: ComposerFormat[] = []

	for (const format of ['bold', 'italic', 'underline', 'strikethrough'] as const) {
		if (document.queryCommandState(getFormatCommand(format))) {
			formats.push(format)
		}
	}

	return formats
}

function getShortcutFormat(event: KeyboardEvent<HTMLDivElement>): ComposerFormat | undefined {
	switch (event.key.toLowerCase()) {
		case 'b':
			return 'bold'
		case 'i':
			return 'italic'
		case 'u':
			return 'underline'
		case 'x':
			return event.shiftKey ? 'strikethrough' : undefined
		default:
			return undefined
	}
}

function isMenuControlKey(key: string): boolean {
	switch (key) {
		case 'ArrowDown':
		case 'ArrowUp':
		case 'Enter':
		case 'Escape':
		case 'Tab':
			return true
		default:
			return false
	}
}

function getFormatCommand(format: ComposerFormat): string {
	switch (format) {
		case 'bold':
			return 'bold'
		case 'italic':
			return 'italic'
		case 'strikethrough':
			return 'strikeThrough'
		case 'underline':
			return 'underline'
	}
}

function getFormatGlyph(format: ComposerFormat): string {
	switch (format) {
		case 'bold':
			return 'B'
		case 'italic':
			return 'I'
		case 'strikethrough':
			return 'S'
		case 'underline':
			return 'U'
	}
}

function getMenuTitle(kind: ComposerSuggestionKind): string {
	switch (kind) {
		case 'command':
			return 'Commands'
		case 'mention':
			return 'People'
	}
}

function getMenuTrigger(kind: ComposerSuggestionKind): string {
	switch (kind) {
		case 'command':
			return '/'
		case 'mention':
			return '@'
	}
}

function getSuggestionHtml(suggestion: ComposerSuggestion): string {
	const label = getSuggestionInsertLabel(suggestion)
	const prefix = suggestion.kind === 'mention' ? '@' : ''

	return `<span class="${classes.composerToken}" data-composer-token="${suggestion.kind}" data-id="${escapeAttribute(suggestion.id)}" data-label="${escapeAttribute(label)}" contenteditable="false">${prefix}${escapeHtml(label)}</span>&nbsp;`
}

function getInitialHtml(value: ComposerValue): string {
	if (value.html) {
		return value.html
	}

	return decorateInitialText(value)
}

function decorateInitialText(value: ComposerValue): string {
	let html = escapeHtml(value.text)
	const replacements = [
		...value.mentions.map(token => ({
			search: escapeHtml(`@${stripTokenPrefix(token.label)}`),
			suggestion: tokenToSuggestion(token)
		})),
		...value.commands.map(token => ({
			search: escapeHtml(ensureCommandLabel(token.label)),
			suggestion: tokenToSuggestion(token)
		}))
	].sort((first, second) => second.search.length - first.search.length)

	for (const replacement of replacements) {
		html = html.replace(replacement.search, getSuggestionHtml(replacement.suggestion))
	}

	return html
}

function tokenToSuggestion(token: ComposerToken): ComposerSuggestion {
	return {
		disabled: false,
		id: token.id,
		insertLabel: token.label,
		kind: token.kind,
		label: token.label
	}
}

function getSuggestionInsertLabel(suggestion: ComposerSuggestion): string {
	const label = suggestion.insertLabel ?? suggestion.label

	switch (suggestion.kind) {
		case 'command':
			return ensureCommandLabel(label)
		case 'mention':
			return stripTokenPrefix(label)
	}
}

function getSuggestionInsertText(suggestion: ComposerSuggestion): string {
	switch (suggestion.kind) {
		case 'command':
			return getSuggestionInsertLabel(suggestion)
		case 'mention':
			return `@${getSuggestionInsertLabel(suggestion)}`
	}
}

function ensureCommandLabel(value: string): string {
	return value.startsWith('/') ? value : `/${value}`
}

function getFormatShortcut(format: ComposerFormat): string {
	switch (format) {
		case 'bold':
			return 'Meta+B Control+B'
		case 'italic':
			return 'Meta+I Control+I'
		case 'strikethrough':
			return 'Meta+Shift+X Control+Shift+X'
		case 'underline':
			return 'Meta+U Control+U'
	}
}

function getFormatShortcutKeys(format: ComposerFormat): readonly string[] {
	switch (format) {
		case 'bold':
			return ['cmd', 'B']
		case 'italic':
			return ['cmd', 'I']
		case 'strikethrough':
			return ['cmd', 'shift', 'X']
		case 'underline':
			return ['cmd', 'U']
	}
}

function isPresent(value: string | undefined): value is string {
	return typeof value === 'string' && value.length > 0
}

function stripTokenPrefix(value: string): string {
	return value.replace(/^[@/]/, '')
}

function escapeHtml(value: string): string {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#039;')
}

function escapeAttribute(value: string): string {
	return escapeHtml(value).replaceAll('`', '&#096;')
}
