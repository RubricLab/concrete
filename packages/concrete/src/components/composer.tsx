import type { ReactNode } from 'react'
import { booleanControl, selectControl, textControl } from '../registry/controls'
import { defineConcreteComponent } from '../registry/definition'
import { prop, states } from '../registry/props'
import { type ComposerValue, composerConfigSchema, composerValueSchema } from '../schemas'
import { Composer } from './composer-view'

export * from './composer-view'

const composerMenuKindValues = ['', 'command', 'mention'] as const

export const composerComponentSchema = composerConfigSchema
	.extend({
		defaultValue: composerValueSchema.optional()
	})
	.strict()

const composerExampleValue: ComposerValue = {
	attachments: [{ id: 'router-v2', meta: '3.2 KB', name: 'router-v2.ts', type: 'file' }],
	commands: [{ id: 'eval-triage-v2', kind: 'command', label: '/eval triage-v2' }],
	html: '',
	mentions: [{ id: 'arihan', kind: 'mention', label: 'arihan' }],
	text: "Hey @arihan - can we run /eval triage-v2 against the new contract? I'll pair on the diff."
}

export const composerComponentDefinition = defineConcreteComponent({
	category: 'layout',
	component: Composer,
	controls: [
		selectControl('fixture', 'Fixture', 'default', [
			'default',
			'empty',
			'mention',
			'command',
			'formatting',
			'disabled'
		]),
		textControl('placeholder', 'Placeholder', 'Write a message...'),
		selectControl('defaultMenuKind', 'Menu', '', composerMenuKindValues),
		booleanControl('disabled', 'Disabled', 'false')
	],
	description:
		'Agentic message input with token chips, mentions, commands, attachments, formatting, keyboard submission, and deterministic value output.',
	guidance:
		'Composer owns the reusable local interaction contract: token insertion, command and mention menus, rich text formatting shortcuts, attachment display, and controlled/uncontrolled value flow. Product code owns persistence, remote search, uploads, command execution, collaboration, and domain-specific editor schemas.',
	kind: 'component',
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
	],
	renderExample: renderComposerExample,
	schema: composerComponentSchema,
	slug: 'composer',
	states: states([
		['default', 'Filled message with mention, command, attachment, shortcut hint, and send action.'],
		['empty', 'Blank composer with placeholder and toolbar affordances.'],
		['mention', 'Mention popdown opened from the @ trigger.'],
		['command', 'Command popdown opened from the / trigger.'],
		['formatting', 'Rich formatted content with inline command and mention tokens.'],
		['disabled', 'Read-only pending surface with all controls disabled.']
	])
})

function renderComposerExample(state = 'default'): ReactNode {
	switch (state) {
		case 'command':
			return (
				<ComposerStage>
					<Composer
						defaultMenuKind="command"
						defaultValue={createComposerValue({ text: 'Can you /' })}
					/>
				</ComposerStage>
			)
		case 'disabled':
			return (
				<ComposerStage>
					<Composer defaultValue={composerExampleValue} disabled />
				</ComposerStage>
			)
		case 'empty':
			return (
				<ComposerStage>
					<Composer placeholder="Ask the agent to inspect, summarize, or ship..." />
				</ComposerStage>
			)
		case 'formatting':
			return (
				<ComposerStage>
					<Composer
						defaultValue={createComposerValue({
							html:
								'Drafting <strong>agent handoff</strong> with <em>formatted</em> notes, <u>clear owners</u>, and <s>stale context</s> removed.',
							text: 'Drafting agent handoff with formatted notes, clear owners, and stale context removed.'
						})}
					/>
				</ComposerStage>
			)
		case 'mention':
			return (
				<ComposerStage>
					<Composer
						defaultMenuKind="mention"
						defaultMenuQuery="a"
						defaultValue={createComposerValue({ text: 'Loop in @a' })}
					/>
				</ComposerStage>
			)
		default:
			return (
				<ComposerStage>
					<Composer defaultValue={composerExampleValue} />
				</ComposerStage>
			)
	}
}

function ComposerStage({ children }: { children: ReactNode }) {
	return <div style={{ maxWidth: 860, width: '100%' }}>{children}</div>
}

function createComposerValue(value: Partial<ComposerValue>): ComposerValue {
	return {
		attachments: value.attachments ?? [],
		commands: value.commands ?? [],
		html: value.html ?? '',
		mentions: value.mentions ?? [],
		text: value.text ?? ''
	}
}
