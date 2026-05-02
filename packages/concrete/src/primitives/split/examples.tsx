import { defineExamples } from '../../factories/createExamples'
import { Badge } from '../badge'
import { OptionRow } from '../option-row'
import { Split } from './component'

export const splitExamples = defineExamples({
	default: {
		description: 'Primary content with trailing status.',
		render: () => (
			<Split aside={<Badge intent="terminal">Ready</Badge>}>
				<OptionRow meta="All documents parsed">Index build</OptionRow>
			</Split>
		)
	},
	even: {
		description: 'Two balanced regions.',
		render: () => (
			<Split
				aside={<OptionRow meta={<Badge intent="terminal">Valid</Badge>}>After</OptionRow>}
				ratio="even"
			>
				<OptionRow meta={<Badge intent="ultra">Draft</Badge>}>Before</OptionRow>
			</Split>
		)
	},
	sidebar: {
		description: 'Main region plus inspector sidebar.',
		render: () => (
			<Split aside={<OptionRow meta="Schema, tokens, states">Inspector</OptionRow>} ratio="sidebar">
				<OptionRow meta="Generated interface preview">Canvas</OptionRow>
			</Split>
		)
	}
})
