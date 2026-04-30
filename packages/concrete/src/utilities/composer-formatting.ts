import type { KeyboardEvent } from 'react'
import type { ComposerFormat } from '../schemas'

export function getActiveFormats(): readonly ComposerFormat[] {
	const formats: ComposerFormat[] = []

	for (const format of ['bold', 'italic', 'underline', 'strikethrough'] as const) {
		if (document.queryCommandState(getFormatCommand(format))) {
			formats.push(format)
		}
	}

	return formats
}

export function getShortcutFormat(
	event: KeyboardEvent<HTMLDivElement>
): ComposerFormat | undefined {
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

export function isMenuControlKey(key: string): boolean {
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

export function getFormatCommand(format: ComposerFormat): string {
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

export function getFormatGlyph(format: ComposerFormat): string {
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

export function getFormatShortcut(format: ComposerFormat): string {
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

export function getFormatShortcutKeys(format: ComposerFormat): readonly string[] {
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
