import { defineExamples } from '../../factories/createExamples'
import { Badge } from '../badge'
import { Switch } from '../switch'
import { FieldRow } from './component'

export const fieldRowExamples = defineExamples({
	default: {
		description: 'Dense setting rows with copy, meta, and control slots.',
		render: () => (
			<>
				<FieldRow
					control={<Switch checked readOnly />}
					description="Allow model tool calls."
					interactive
				>
					Agent tools
				</FieldRow>
				<FieldRow control={<Badge hierarchy="ghost">On</Badge>} description="Persist preferences.">
					Memory
				</FieldRow>
			</>
		)
	},
	error: {
		description: 'Validation-aware field row for form and settings failures.',
		render: () => (
			<FieldRow control="Required" description="A workspace value is missing." status="error">
				Workspace
			</FieldRow>
		)
	},
	meta: {
		description: 'Compact row with right-aligned metadata.',
		render: () => (
			<FieldRow control="12" meta="files">
				Context window
			</FieldRow>
		)
	},
	success: {
		description: 'Positive row state.',
		render: () => (
			<FieldRow
				control={<Badge>Ready</Badge>}
				description="All required values are present."
				status="success"
			>
				Validation
			</FieldRow>
		)
	}
})
