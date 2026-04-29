import type { ReactNode } from 'react'

export function stringifyReactNode(value: ReactNode): string {
	switch (typeof value) {
		case 'number':
		case 'string':
			return String(value)
		default:
			return ''
	}
}

export function formatShortcutKey(shortcutKey: string): string {
	switch (shortcutKey.toLowerCase()) {
		case 'cmd':
		case 'command':
		case 'meta':
			return '⌘'
		case 'enter':
		case 'return':
			return '↵'
		case 'shift':
			return '⇧'
		case 'option':
		case 'alt':
			return '⌥'
		default:
			return shortcutKey
	}
}
