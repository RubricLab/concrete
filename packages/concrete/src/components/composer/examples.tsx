import type { ReactNode } from 'react'
import { defineExamples } from '../../factories/createExamples'
import type { ComposerSuggestion, ComposerValue } from '../../schemas'
import { Composer } from './component'

const composerExampleValue: ComposerValue = {
	attachments: [{ id: 'router-v2', meta: '3.2 KB', name: 'router-v2.ts', type: 'file' }],
	commands: [{ id: 'eval-triage-v2', kind: 'command', label: '/eval triage-v2' }],
	html: '',
	mentions: [{ id: 'arihan', kind: 'mention', label: 'arihan' }],
	text: "Hey @arihan - can we run /eval triage-v2 against the new contract? I'll pair on the diff."
}

const customCommandOptions = [
	{
		description: 'Create a migration handoff from current queue state',
		disabled: false,
		id: 'handoff',
		kind: 'command',
		label: '/handoff',
		meta: 'thread'
	},
	{
		description: 'Deploy is locked while package gates are running',
		disabled: true,
		id: 'deploy',
		kind: 'command',
		label: '/deploy',
		meta: 'blocked'
	},
	{
		description: 'Open the generated docs audit report',
		disabled: false,
		id: 'docs-audit',
		kind: 'command',
		label: '/docs-audit',
		meta: 'docs'
	}
] as const satisfies readonly ComposerSuggestion[]

export const composerExamples = defineExamples({
	command: {
		description: 'Command popdown opened from the / trigger.',
		render: () => renderComposerExample('command')
	},
	default: {
		description: 'Filled message with mention, command, attachment, shortcut hint, and send action.',
		render: () => renderComposerExample('default')
	},
	disabled: {
		description: 'Read-only pending surface with all controls disabled.',
		render: () => renderComposerExample('disabled')
	},
	empty: {
		description: 'Blank composer with placeholder and toolbar affordances.',
		render: () => renderComposerExample('empty')
	},
	formatting: {
		description: 'Rich formatted content with inline command and mention tokens.',
		render: () => renderComposerExample('formatting')
	},
	mention: {
		description: 'Mention popdown opened from the @ trigger.',
		render: () => renderComposerExample('mention')
	},
	suggestions: {
		description: 'Custom command suggestions with a disabled workflow row.',
		render: () => renderComposerExample('suggestions')
	}
})

function renderComposerExample(state = 'default'): ReactNode {
	switch (state) {
		case 'command':
			return (
				<Composer defaultMenuKind="command" defaultValue={createComposerValue({ text: 'Can you /' })} />
			)
		case 'disabled':
			return <Composer defaultValue={composerExampleValue} disabled />
		case 'empty':
			return <Composer placeholder="Ask the agent to inspect, summarize, or ship..." />
		case 'formatting':
			return (
				<Composer
					defaultValue={createComposerValue({
						html:
							'Drafting <strong>agent handoff</strong> with <em>formatted</em> notes, <u>clear owners</u>, and <s>stale context</s> removed.',
						text: 'Drafting agent handoff with formatted notes, clear owners, and stale context removed.'
					})}
				/>
			)
		case 'mention':
			return (
				<Composer
					defaultMenuKind="mention"
					defaultMenuQuery="a"
					defaultValue={createComposerValue({ text: 'Loop in @a' })}
				/>
			)
		case 'suggestions':
			return (
				<Composer
					commandOptions={customCommandOptions}
					defaultMenuKind="command"
					defaultMenuQuery="d"
					defaultValue={createComposerValue({ text: 'Can you /d' })}
				/>
			)
		default:
			return <Composer defaultValue={composerExampleValue} />
	}
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
