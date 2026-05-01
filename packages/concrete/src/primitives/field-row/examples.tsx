import { defineExamples } from '../../factories/createExamples'
import { Badge } from '../badge'
import { FieldRow } from './component'

export const fieldRowExamples = defineExamples({
	default: {
		description: 'Dense setting row with copy, meta, and a control slot.',
		render: () => (
			<FieldRow control={<Badge hierarchy="ghost">On</Badge>} description="Allow model tool calls.">
				Agent tools
			</FieldRow>
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
	}
})
