import type {
	ComposerAttachment,
	ComposerSuggestion,
	ComposerSuggestionKind,
	ComposerToken,
	ComposerValue
} from '../schemas'
import { concreteClassNames } from '../styles/class-names'
import { getSuggestionInsertLabel, getSuggestionInsertText } from './composer-serialization'

export function replaceTriggerWithSuggestion(
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

export function getTriggerRange(
	editor: HTMLDivElement,
	range: Range,
	triggerText: string
): Range | null {
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

export function insertSuggestionNode(range: Range, suggestion: ComposerSuggestion) {
	const token = document.createElement('span')
	const spacer = document.createTextNode('\u00a0')

	token.className = concreteClassNames.composerToken ?? ''
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

export function moveSelectionToEnd(range: Range) {
	const selection = window.getSelection()

	range.collapse(false)
	selection?.removeAllRanges()
	selection?.addRange(range)
}

export function normalizeEditorSelection(editor: HTMLDivElement) {
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

export function isRangeAtEditorStart(editor: HTMLDivElement, range: Range): boolean {
	const beforeRange = range.cloneRange()

	beforeRange.selectNodeContents(editor)
	beforeRange.setEnd(range.startContainer, range.startOffset)
	return beforeRange.toString().length === 0
}

export function setCaretToEnd(editor: HTMLDivElement) {
	const selection = window.getSelection()
	const range = document.createRange()

	range.selectNodeContents(editor)
	range.collapse(false)
	selection?.removeAllRanges()
	selection?.addRange(range)
}

export function restoreRange(editor: HTMLDivElement, range: Range | null) {
	if (!range || !editor.contains(range.commonAncestorContainer)) {
		return
	}

	const selection = window.getSelection()

	selection?.removeAllRanges()
	selection?.addRange(range)
}

export function readComposerValue(
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

export function readTokens(editor: HTMLDivElement, kind: ComposerSuggestionKind): ComposerToken[] {
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

export function removeTokenElements(editor: HTMLDivElement, token: ComposerToken): boolean {
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

export function removeTokenSpacer(element: Element) {
	const nextSibling = element.nextSibling

	if (nextSibling?.nodeType === Node.TEXT_NODE && removeSpacerFromTextNode(nextSibling, 'start')) {
		return
	}

	const previousSibling = element.previousSibling

	if (previousSibling?.nodeType === Node.TEXT_NODE) {
		removeSpacerFromTextNode(previousSibling, 'end')
	}
}

export function removeSpacerFromTextNode(node: ChildNode, edge: 'end' | 'start'): boolean {
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

export function getTextBeforeCaret(editor: HTMLDivElement): string {
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
