import { defineExamples } from '../../factories/createExamples'
import { Badge } from '../badge'
import { OptionRow } from '../option-row'
import { Grid } from './component'

export const gridExamples = defineExamples({
	compact: {
		description: 'Compact repeated controls.',
		render: () => (
			<Grid columns="two" density="compact">
				<OptionRow meta={<Badge intent="terminal">Active</Badge>}>Model</OptionRow>
				<OptionRow meta={<Badge purpose="count">4</Badge>}>Tools</OptionRow>
			</Grid>
		)
	},
	default: {
		description: 'Auto-fit repeated items.',
		render: () => (
			<Grid>
				<OptionRow meta="Foundation-backed">Tokens</OptionRow>
				<OptionRow meta="Atomic vocabulary">Primitives</OptionRow>
				<OptionRow meta="Workflow assembly">Components</OptionRow>
			</Grid>
		)
	},
	three: {
		description: 'Fixed three-column scan grid.',
		render: () => (
			<Grid columns="three">
				<Badge>Input</Badge>
				<Badge intent="ultra">Reason</Badge>
				<Badge intent="terminal">Output</Badge>
			</Grid>
		)
	}
})
