import type { ReactNode } from 'react'
import { defineExamples } from '../../factories/createExamples'
import type { ComposerValue } from '../../schemas'
import { Composer } from './component'

const composerExampleValue: ComposerValue = {
	attachments: [{ id: 'router-v2', meta: '3.2 KB', name: 'router-v2.ts', type: 'file' }],
	commands: [{ id: 'eval-triage-v2', kind: 'command', label: '/eval triage-v2' }],
	html: '',
	mentions: [{ id: 'arihan', kind: 'mention', label: 'arihan' }],
	text: "Hey @arihan - can we run /eval triage-v2 against the new contract? I'll pair on the diff."
}

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
	}
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
