import { defineExamples } from '../../factories/createExamples'
import { Select } from './component'
import { workspaceOptions } from './schema'

export const selectExamples = defineExamples({
	default: {
		description: 'Empty field state.',
		render: () => (
			<>
				<Select
					defaultValue="rubric"
					help="Choose a workspace."
					label="Workspace"
					options={workspaceOptions}
				/>
			</>
		)
	},
	disabled: {
		description: 'Locked field.',
		render: () => (
			<>
				<Select disabled label="Workspace" options={workspaceOptions} value="rubric" />
			</>
		)
	},
	error: {
		description: 'Validation failure.',
		render: () => (
			<>
				<Select
					defaultValue="rubric"
					error="Choose an active workspace."
					label="Workspace"
					options={workspaceOptions}
				/>
			</>
		)
	},
	filled: {
		description: 'Value present.',
		render: () => (
			<>
				<Select defaultValue="concrete" label="Workspace" options={workspaceOptions} />
			</>
		)
	}
})
