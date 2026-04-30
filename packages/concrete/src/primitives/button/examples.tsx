import { defineExamples } from '../../factories/createExamples'
import { Frame } from '../frame'
import { Button } from './component'

export const buttonExamples = defineExamples({
	default: {
		description: 'Variants, icon, and shortcut states.',
		render: () => (
			<Frame>
				<Button leadingIcon="plus" variant="primary">
					New
				</Button>
				<Button variant="secondary">Secondary</Button>
				<Button variant="soft">Soft</Button>
				<Button variant="ghost">Ghost</Button>
				<Button variant="sky-soft">Sky soft</Button>
				<Button shortcut={['cmd', 'enter']} variant="sky">
					Ship
				</Button>
			</Frame>
		)
	},
	loading: {
		description: 'Disabled pending command state.',
		render: () => (
			<Frame>
				<Button loading variant="primary">
					Saving
				</Button>
			</Frame>
		)
	},
	pressed: {
		description: 'Keyboard-triggered active affordance with highlighted keycaps.',
		render: () => (
			<Frame>
				<Button pressed shortcut={['cmd', 'enter']} variant="primary">
					Send
				</Button>
				<Button pressed shortcut={['cmd', 'K']} variant="secondary">
					Search
				</Button>
				<Button pressed iconOnly leadingIcon="search" variant="soft" />
			</Frame>
		)
	},
	signal: {
		description: 'Ultra and destructive signal actions.',
		render: () => (
			<Frame>
				<Button leadingIcon="sparkles" variant="ultra">
					Upgrade
				</Button>
				<Button leadingIcon="trash-2" variant="danger">
					Delete
				</Button>
			</Frame>
		)
	}
})
