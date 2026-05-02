import { defineExamples } from '../../factories/createExamples'
import { Input } from '../input'
import { Stack } from '../stack'
import { Field } from './component'

export const fieldExamples = defineExamples({
	count: {
		description: 'Count and limit metadata.',
		render: () => (
			<>
				<Field
					count={42}
					description="Canonical field hierarchy for dense product forms."
					label="Workspace handle"
					limit={64}
				>
					<Input placeholder="rubric-labs" />
				</Field>
			</>
		)
	},
	default: {
		description: 'Label, description, helper, and composed control.',
		render: () => (
			<>
				<Field
					description="Canonical field hierarchy for dense product forms."
					help="Use lowercase letters and hyphens."
					label="Workspace handle"
				>
					<Input placeholder="rubric-labs" />
				</Field>
			</>
		)
	},
	error: {
		description: 'Error message and status treatment.',
		render: () => (
			<>
				<Field
					description="Canonical field hierarchy for dense product forms."
					error="The workspace handle is already taken."
					label="Workspace handle"
				>
					<Input placeholder="rubric-labs" />
				</Field>
			</>
		)
	},
	requirements: {
		description: 'Required and optional metadata placement.',
		render: () => (
			<Stack density="compact">
				<Field
					description="Required configuration for production agents."
					label="Primary model"
					required
				>
					<Input defaultValue="gpt-workflow" />
				</Field>
				<Field description="Optional routing hint for generated drafts." label="Fallback tag" optional>
					<Input placeholder="nightly" />
				</Field>
			</Stack>
		)
	},
	success: {
		description: 'Positive validation message.',
		render: () => (
			<>
				<Field
					description="Canonical field hierarchy for dense product forms."
					label="Workspace handle"
					success="Looks available."
				>
					<Input placeholder="rubric-labs" />
				</Field>
			</>
		)
	}
})
