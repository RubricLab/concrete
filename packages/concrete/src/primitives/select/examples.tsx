import { defineExamples } from '../../factories/createExamples'
import { Stack } from '../stack'
import { Select } from './component'
import { workspaceOptions } from './schema'

export const selectExamples = defineExamples({
	default: {
		description: 'Dense native disclosure fields with help and selected value.',
		render: () => (
			<Stack density="compact">
				<Select
					defaultValue="rubric"
					help="Choose a workspace."
					label="Workspace"
					options={workspaceOptions}
				/>
				<Select
					defaultValue="concrete"
					label="Preview channel"
					options={[
						{ label: 'Production', value: 'production' },
						{ label: 'Concrete docs', value: 'concrete' },
						{ disabled: true, label: 'Archived', value: 'archived' }
					]}
				/>
			</Stack>
		)
	},
	disabled: {
		description: 'Locked field.',
		render: () => (
			<Stack density="compact">
				<Select disabled label="Workspace" options={workspaceOptions} value="rubric" />
				<Select
					disabled
					label="Release channel"
					options={[
						{ label: 'Stable', value: 'stable' },
						{ label: 'Canary', value: 'canary' }
					]}
					value="stable"
				/>
			</Stack>
		)
	},
	error: {
		description: 'Validation failure.',
		render: () => (
			<Stack density="compact">
				<Select
					defaultValue="rubric"
					error="Choose an active workspace."
					label="Workspace"
					options={workspaceOptions}
				/>
			</Stack>
		)
	},
	filled: {
		description: 'Value present.',
		render: () => (
			<Stack density="compact">
				<Select defaultValue="concrete" label="Workspace" options={workspaceOptions} />
			</Stack>
		)
	}
})
