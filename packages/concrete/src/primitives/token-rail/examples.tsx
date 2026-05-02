import { defineExamples } from '../../factories/createExamples'
import { TokenRail } from './component'

export const tokenRailExamples = defineExamples({
	attachments: {
		description: 'Attachment-only rail for uploaded context.',
		render: () => (
			<TokenRail
				items={[
					{
						icon: 'paperclip',
						id: 'trace',
						kind: 'attachment',
						label: 'catalog-trace.json',
						meta: 'JSON'
					},
					{
						icon: 'paperclip',
						id: 'shot',
						kind: 'attachment',
						label: 'render-screenshot.png',
						meta: 'PNG'
					}
				]}
			/>
		)
	},
	default: {
		description: 'Token rail for mentions, commands, and attachments.',
		render: () => (
			<TokenRail
				items={[
					{ icon: 'at-sign', id: 'arihan', kind: 'mention', label: 'Arihan V.' },
					{ icon: 'slash', id: 'summarize', kind: 'command', label: 'Summarize' },
					{
						icon: 'paperclip',
						id: 'brief',
						kind: 'attachment',
						label: 'research-brief.pdf',
						meta: 'PDF'
					}
				]}
			/>
		)
	},
	tokens: {
		description: 'Mention and command token rail without attachments.',
		render: () => (
			<TokenRail
				items={[
					{ icon: 'at-sign', id: 'design', kind: 'mention', label: 'Design system' },
					{ icon: 'at-sign', id: 'docs', kind: 'mention', label: 'Docs app' },
					{ icon: 'slash', id: 'audit', kind: 'command', label: 'Audit examples' }
				]}
			/>
		)
	}
})
