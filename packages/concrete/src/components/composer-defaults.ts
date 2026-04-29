import type {
	ComposerFormat,
	ComposerSuggestion,
	ComposerSuggestionKind,
	ComposerValue
} from '../schemas'

export type ComposerShortcutId = ComposerFormat | 'submit'

export type MenuState = {
	activeIndex: number
	kind: ComposerSuggestionKind
	query: string
	triggerText: string
}

export const defaultMentions = [
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

export const defaultCommands = [
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

export const emptyValue: ComposerValue = {
	attachments: [],
	commands: [],
	html: '',
	mentions: [],
	text: ''
}

export const shortcutPressDuration = 180
