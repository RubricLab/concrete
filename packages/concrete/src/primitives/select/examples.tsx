import { defineExamples } from '../../factories/createExamples'
import { Frame } from '../frame'
import { Select } from './component'
import { workspaceOptions } from './schema'

export const selectExamples = defineExamples({
	default: {
		description: 'Empty field state.',
		render: () => (
			<Frame>
				<Select
					defaultValue="rubric"
					help="Choose a workspace."
					label="Workspace"
					options={workspaceOptions}
				/>
			</Frame>
		)
	},
	disabled: {
		description: 'Locked field.',
		render: () => (
			<Frame>
				<Select disabled label="Workspace" options={workspaceOptions} value="rubric" />
			</Frame>
		)
	},
	error: {
		description: 'Validation failure.',
		render: () => (
			<Frame>
				<Select
					defaultValue="rubric"
					error="Choose an active workspace."
					label="Workspace"
					options={workspaceOptions}
				/>
			</Frame>
		)
	},
	filled: {
		description: 'Value present.',
		render: () => (
			<Frame>
				<Select defaultValue="concrete" label="Workspace" options={workspaceOptions} />
			</Frame>
		)
	}
})
