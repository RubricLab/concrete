import type { ComposerSuggestion, ComposerSuggestionKind } from '../schemas'
import type { MenuState } from './composer-defaults'
import { isPresent } from './composer-serialization'

export function getMenuOptions(
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

export function getTrigger(text: string): MenuState | null {
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

export function getMenuTitle(kind: ComposerSuggestionKind): string {
	switch (kind) {
		case 'command':
			return 'Commands'
		case 'mention':
			return 'People'
	}
}

export function getMenuTrigger(kind: ComposerSuggestionKind): string {
	switch (kind) {
		case 'command':
			return '/'
		case 'mention':
			return '@'
	}
}
