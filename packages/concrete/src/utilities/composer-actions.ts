import type { RefObject } from 'react'
import type {
	ComposerAttachment,
	ComposerFormat,
	ComposerSuggestion,
	ComposerValue
} from '../schemas'
import type { MenuState } from './composer-defaults'
import { replaceTriggerWithSuggestion, restoreRange } from './composer-dom'
import { getFormatCommand } from './composer-formatting'

export function submitComposer(
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

export function applyFormat(
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

export function commitSuggestion(
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
