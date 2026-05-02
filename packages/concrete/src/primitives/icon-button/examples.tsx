import { defineExamples } from '../../factories/createExamples'
import { ControlGroup } from '../control-group'
import { IconButton } from './component'

export const iconButtonExamples = defineExamples({
	default: {
		description: 'Icon-only command with accessible label.',
		render: () => <IconButton icon="settings" label="Open settings" />
	},
	pressed: {
		description: 'Pressed icon command state.',
		render: () => (
			<IconButton hierarchy="secondary" icon="panel-left" label="Toggle sidebar" pressed />
		)
	},
	set: {
		description: 'Dense icon command set.',
		render: () => (
			<ControlGroup label="Editor commands">
				<IconButton density="small" hierarchy="secondary" icon="pencil" label="Edit" />
				<IconButton density="small" hierarchy="secondary" icon="command" label="Command" />
				<IconButton density="small" hierarchy="secondary" icon="code" label="Code" />
			</ControlGroup>
		)
	}
})
