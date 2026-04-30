import { defineExamples } from '../../factories/createExamples'
import { Button } from '../button'
import { IconButton } from '../icon-button'
import { ControlGroup } from './component'

export const controlGroupExamples = defineExamples({
	attached: {
		description: 'Attached segmented commands.',
		render: () => (
			<ControlGroup attached label="View mode">
				<Button size="small" variant="secondary">
					Preview
				</Button>
				<Button size="small" variant="secondary">
					Code
				</Button>
			</ControlGroup>
		)
	},
	default: {
		description: 'Adjacent commands with controlled spacing.',
		render: () => (
			<ControlGroup label="Message commands">
				<Button size="small">Accept</Button>
				<Button size="small" variant="ghost">
					Reject
				</Button>
			</ControlGroup>
		)
	},
	vertical: {
		description: 'Vertical command group.',
		render: () => (
			<ControlGroup label="Canvas controls" orientation="vertical">
				<IconButton icon="plus" label="Zoom in" size="small" variant="secondary" />
				<IconButton icon="minus" label="Zoom out" size="small" variant="secondary" />
			</ControlGroup>
		)
	}
})
