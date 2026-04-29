import type { ComposerSuggestion, ComposerToken, ComposerValue } from '../schemas'
import { concreteClassNames } from '../styles/class-names'

export function removeTokenFromValue(value: ComposerValue, token: ComposerToken): ComposerValue {
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

export function getSuggestionHtml(suggestion: ComposerSuggestion): string {
	const label = getSuggestionInsertLabel(suggestion)
	const prefix = suggestion.kind === 'mention' ? '@' : ''

	return `<span class="${concreteClassNames.composerToken}" data-composer-token="${suggestion.kind}" data-id="${escapeAttribute(suggestion.id)}" data-label="${escapeAttribute(label)}" contenteditable="false">${prefix}${escapeHtml(label)}</span>&nbsp;`
}

export function getInitialHtml(value: ComposerValue): string {
	if (value.html) {
		return value.html
	}

	return decorateInitialText(value)
}

export function decorateInitialText(value: ComposerValue): string {
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

export function tokenToSuggestion(token: ComposerToken): ComposerSuggestion {
	return {
		disabled: false,
		id: token.id,
		insertLabel: token.label,
		kind: token.kind,
		label: token.label
	}
}

export function getSuggestionInsertLabel(suggestion: ComposerSuggestion): string {
	const label = suggestion.insertLabel ?? suggestion.label

	switch (suggestion.kind) {
		case 'command':
			return ensureCommandLabel(label)
		case 'mention':
			return stripTokenPrefix(label)
	}
}

export function getSuggestionInsertText(suggestion: ComposerSuggestion): string {
	switch (suggestion.kind) {
		case 'command':
			return getSuggestionInsertLabel(suggestion)
		case 'mention':
			return `@${getSuggestionInsertLabel(suggestion)}`
	}
}

export function ensureCommandLabel(value: string): string {
	return value.startsWith('/') ? value : `/${value}`
}

export function isPresent(value: string | undefined): value is string {
	return typeof value === 'string' && value.length > 0
}

export function stripTokenPrefix(value: string): string {
	return value.replace(/^[@/]/, '')
}

export function escapeHtml(value: string): string {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#039;')
}

export function escapeAttribute(value: string): string {
	return escapeHtml(value).replaceAll('`', '&#096;')
}
