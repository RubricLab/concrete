import { prop } from '../../registry/props'

export const composerMeta = {
	category: 'layout',
	description:
		'Agentic message input with token chips, mentions, commands, attachments, formatting, keyboard submission, and deterministic value output.',
	guidance:
		'Composer owns the reusable local interaction contract: token insertion, command and mention menus, rich text formatting shortcuts, attachment display, and controlled/uncontrolled value flow. Product code owns persistence, remote search, uploads, command execution, collaboration, and domain-specific editor schemas.',
	name: 'Composer',
	pressure: ['product', 'generative'],
	props: [
		prop(
			'value',
			'ComposerValue',
			'Controlled rich text, token, and attachment value. Validated by composerValueSchema.'
		),
		prop(
			'defaultValue',
			'ComposerValue',
			'Uncontrolled initial value with text/html, mentions, commands, and attachments.',
			'empty ComposerValue'
		),
		prop(
			'placeholder',
			'string',
			'Placeholder shown when the editor has no content.',
			'Write a message...'
		),
		prop(
			'mentionOptions',
			'readonly ComposerSuggestion[]',
			'People suggestions for @ menus. Validated by composerSuggestionSchema.'
		),
		prop(
			'commandOptions',
			'readonly ComposerSuggestion[]',
			'Slash-command suggestions for / menus. Product code owns execution.'
		),
		prop(
			'defaultMenuKind',
			"'command' | 'mention'",
			'Initial open menu for deterministic demos, onboarding, and screenshots.'
		),
		prop(
			'defaultMenuQuery',
			'string',
			'Initial suggestion filter when defaultMenuKind is set.',
			"''"
		),
		prop(
			'submitOnEnter',
			'boolean',
			'When true, Enter submits and Shift+Enter inserts a line break.',
			'true'
		),
		prop('submitLabel', 'ReactNode', 'Send button label.', 'Send'),
		prop('disabled', 'boolean', 'Locks editor, toolbar, menus, and submit action.', 'false'),
		prop('onValueChange', '(value: ComposerValue) => void', 'Receives deterministic value output.'),
		prop(
			'onSubmit',
			'(value: ComposerValue) => void',
			'Submit callback for keyboard or button send.'
		),
		prop('onAttachmentRequest', '() => void', 'Called when the attach tool is clicked.'),
		prop(
			'onAttachmentRemove',
			'(attachment: ComposerAttachment) => void',
			'Called after a visible attachment chip is removed.'
		)
	]
} as const
