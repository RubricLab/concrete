import { defineExamples } from '../../factories/createExamples'
import { Badge } from '../badge'
import { Row } from '../row'
import { Grid } from './component'

export const gridExamples = defineExamples({
	compact: {
		description: 'Compact repeated controls.',
		render: () => (
			<Grid columns="two" density="compact">
				<Row meta={<Badge signal="terminal">Active</Badge>}>Model</Row>
				<Row meta={<Badge variant="count">4</Badge>}>Tools</Row>
			</Grid>
		)
	},
	default: {
		description: 'Auto-fit repeated items.',
		render: () => (
			<Grid>
				<Row meta="Foundation-backed">Tokens</Row>
				<Row meta="Atomic vocabulary">Primitives</Row>
				<Row meta="Workflow assembly">Components</Row>
			</Grid>
		)
	},
	three: {
		description: 'Fixed three-column scan grid.',
		render: () => (
			<Grid columns="three">
				<Badge>Input</Badge>
				<Badge signal="ultra">Reason</Badge>
				<Badge signal="terminal">Output</Badge>
			</Grid>
		)
	}
})
