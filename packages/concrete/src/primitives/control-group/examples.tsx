import { defineExamples } from '../../factories/createExamples'
import { Button } from '../button'
import { IconButton } from '../icon-button'
import { ControlGroup } from './component'

export const controlGroupExamples = defineExamples({
	attached: {
		description: 'Attached segmented commands.',
		render: () => (
			<ControlGroup attached label="View mode">
				<Button density="small" hierarchy="secondary">
					Preview
				</Button>
				<Button density="small" hierarchy="secondary">
					Code
				</Button>
			</ControlGroup>
		)
	},
	default: {
		description: 'Adjacent commands with controlled spacing.',
		render: () => (
			<ControlGroup label="Message commands">
				<Button density="small">Accept</Button>
				<Button density="small" hierarchy="ghost">
					Reject
				</Button>
			</ControlGroup>
		)
	},
	vertical: {
		description: 'Vertical command group.',
		render: () => (
			<ControlGroup label="Canvas controls" orientation="vertical">
				<IconButton icon="plus" label="Zoom in" density="small" hierarchy="secondary" />
				<IconButton icon="minus" label="Zoom out" density="small" hierarchy="secondary" />
			</ControlGroup>
		)
	}
})
