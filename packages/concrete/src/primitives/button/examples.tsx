import { defineExamples } from '../../factories/createExamples'
import { Button } from './component'

export const buttonExamples = defineExamples({
	default: {
		description: 'Variants, icon, and shortcut states.',
		render: () => (
			<>
				<Button leadingIcon="plus" variant="primary">
					New run
				</Button>
				<Button trailingIcon="arrow-right" variant="secondary">
					Review
				</Button>
				<Button variant="soft">Draft</Button>
				<Button variant="ghost">Cancel</Button>
				<Button variant="sky-soft">Sky soft</Button>
				<Button shortcut={['cmd', 'enter']} variant="sky">
					Ship
				</Button>
			</>
		)
	},
	loading: {
		description: 'Disabled pending command state.',
		render: () => (
			<>
				<Button loading variant="primary">
					Saving
				</Button>
			</>
		)
	},
	pressed: {
		description: 'Keyboard-triggered active affordance with highlighted keycaps.',
		render: () => (
			<>
				<Button pressed shortcut={['cmd', 'enter']} variant="primary">
					Send
				</Button>
				<Button pressed shortcut={['cmd', 'K']} variant="secondary">
					Search
				</Button>
				<Button pressed iconOnly leadingIcon="search" variant="soft" />
			</>
		)
	},
	signal: {
		description: 'Ultra and destructive signal actions.',
		render: () => (
			<>
				<Button leadingIcon="sparkles" variant="ultra">
					Upgrade
				</Button>
				<Button leadingIcon="trash-2" variant="danger">
					Delete
				</Button>
			</>
		)
	},
	sizes: {
		description: 'Tiny through large command sizing.',
		render: () => (
			<>
				<Button size="tiny" variant="secondary">
					Tiny
				</Button>
				<Button size="small" variant="secondary">
					Small
				</Button>
				<Button size="medium" variant="secondary">
					Medium
				</Button>
				<Button size="large" trailingIcon="arrow-right" variant="primary">
					Large
				</Button>
			</>
		)
	}
})
