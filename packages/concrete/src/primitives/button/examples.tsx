import { defineExamples } from '../../factories/createExamples'
import { Button } from './component'

export const buttonExamples = defineExamples({
	default: {
		description: 'Variants, icon, and shortcut states.',
		render: () => (
			<>
				<Button hierarchy="primary" leadingIcon="plus">
					New run
				</Button>
				<Button hierarchy="secondary" trailingIcon="arrow-right">
					Review
				</Button>
				<Button hierarchy="soft">Draft</Button>
				<Button hierarchy="ghost">Cancel</Button>
				<Button hierarchy="soft" intent="sky">
					Sky soft
				</Button>
				<Button hierarchy="primary" intent="sky" shortcut={['cmd', 'enter']}>
					Ship
				</Button>
			</>
		)
	},
	loading: {
		description: 'Disabled pending command state.',
		render: () => (
			<>
				<Button hierarchy="primary" loading>
					Saving
				</Button>
			</>
		)
	},
	pressed: {
		description: 'Keyboard-triggered active affordance with highlighted keycaps.',
		render: () => (
			<>
				<Button hierarchy="primary" pressed shortcut={['cmd', 'enter']}>
					Send
				</Button>
				<Button hierarchy="secondary" pressed shortcut={['cmd', 'K']}>
					Search
				</Button>
				<Button hierarchy="soft" iconOnly leadingIcon="search" pressed />
			</>
		)
	},
	signal: {
		description: 'Ultra and destructive signal actions.',
		render: () => (
			<>
				<Button hierarchy="primary" intent="ultra" leadingIcon="sparkles">
					Upgrade
				</Button>
				<Button hierarchy="primary" intent="danger" leadingIcon="trash-2">
					Delete
				</Button>
			</>
		)
	},
	sizes: {
		description: 'Tiny through large command sizing.',
		render: () => (
			<>
				<Button density="tiny" hierarchy="secondary">
					Tiny
				</Button>
				<Button density="small" hierarchy="secondary">
					Small
				</Button>
				<Button density="medium" hierarchy="secondary">
					Medium
				</Button>
				<Button density="large" hierarchy="primary" trailingIcon="arrow-right">
					Large
				</Button>
			</>
		)
	}
})
