import { defineExamples } from '../../factories/createExamples'
import type { ComposerValue } from '../../schemas'
import { ComposerRail } from './component'

const composerRailExampleValue: ComposerValue = {
	attachments: [{ id: 'brief', meta: 'PDF', name: 'research-brief.pdf', type: 'application/pdf' }],
	commands: [{ id: 'summarize', kind: 'command', label: 'Summarize' }],
	html: '',
	mentions: [{ id: 'arihan', kind: 'mention', label: 'Arihan V.' }],
	text: ''
}

export const composerRailExamples = defineExamples({
	attachments: {
		description: 'Attachment-only rail for uploaded context.',
		render: () => (
			<ComposerRail
				value={{
					attachments: [
						{ id: 'trace', meta: 'JSON', name: 'catalog-trace.json', type: 'application/json' },
						{ id: 'shot', meta: 'PNG', name: 'render-screenshot.png', type: 'image/png' }
					],
					commands: [],
					html: '',
					mentions: [],
					text: ''
				}}
			/>
		)
	},
	default: {
		description: 'Token rail for mentions, commands, and attachments.',
		render: () => <ComposerRail value={composerRailExampleValue} />
	},
	tokens: {
		description: 'Mention and command token rail without attachments.',
		render: () => (
			<ComposerRail
				value={{
					attachments: [],
					commands: [{ id: 'audit', kind: 'command', label: 'Audit examples' }],
					html: '',
					mentions: [
						{ id: 'design', kind: 'mention', label: 'Design system' },
						{ id: 'docs', kind: 'mention', label: 'Docs app' }
					],
					text: ''
				}}
			/>
		)
	}
})
