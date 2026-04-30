import { defineExamples } from '../../factories/createExamples'
import { Badge } from '../badge'
import { Row } from '../row'
import { Split } from './component'

export const splitExamples = defineExamples({
	default: {
		description: 'Primary content with trailing status.',
		render: () => (
			<Split aside={<Badge signal="terminal">Ready</Badge>}>
				<Row meta="All documents parsed">Index build</Row>
			</Split>
		)
	},
	even: {
		description: 'Two balanced regions.',
		render: () => (
			<Split aside={<Row meta={<Badge signal="terminal">Valid</Badge>}>After</Row>} ratio="even">
				<Row meta={<Badge signal="ultra">Draft</Badge>}>Before</Row>
			</Split>
		)
	},
	sidebar: {
		description: 'Main region plus inspector sidebar.',
		render: () => (
			<Split aside={<Row meta="Schema, tokens, states">Inspector</Row>} ratio="sidebar">
				<Row meta="Generated interface preview">Canvas</Row>
			</Split>
		)
	}
})
