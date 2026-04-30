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
		render: () => <IconButton icon="panel-left" label="Toggle sidebar" pressed variant="secondary" />
	},
	set: {
		description: 'Dense icon command set.',
		render: () => (
			<ControlGroup label="Editor commands">
				<IconButton icon="pencil" label="Edit" size="small" variant="secondary" />
				<IconButton icon="command" label="Command" size="small" variant="secondary" />
				<IconButton icon="code" label="Code" size="small" variant="secondary" />
			</ControlGroup>
		)
	}
})
