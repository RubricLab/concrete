import { defineExamples } from '../../factories/createExamples'
import { Frame } from '../frame'
import { Input } from '../input'
import { Field } from './component'

export const fieldExamples = defineExamples({
	count: {
		description: 'Count and limit metadata.',
		render: () => (
			<Frame>
				<Field
					count={42}
					description="Canonical field hierarchy for dense product forms."
					label="Workspace handle"
					limit={64}
				>
					<Input placeholder="rubric-labs" />
				</Field>
			</Frame>
		)
	},
	default: {
		description: 'Label, description, helper, and composed control.',
		render: () => (
			<Frame>
				<Field
					description="Canonical field hierarchy for dense product forms."
					help="Use lowercase letters and hyphens."
					label="Workspace handle"
				>
					<Input placeholder="rubric-labs" />
				</Field>
			</Frame>
		)
	},
	error: {
		description: 'Error message and status treatment.',
		render: () => (
			<Frame>
				<Field
					description="Canonical field hierarchy for dense product forms."
					error="The workspace handle is already taken."
					label="Workspace handle"
				>
					<Input placeholder="rubric-labs" />
				</Field>
			</Frame>
		)
	},
	success: {
		description: 'Positive validation message.',
		render: () => (
			<Frame>
				<Field
					description="Canonical field hierarchy for dense product forms."
					label="Workspace handle"
					success="Looks available."
				>
					<Input placeholder="rubric-labs" />
				</Field>
			</Frame>
		)
	}
})
