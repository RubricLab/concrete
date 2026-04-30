import { defineExamples } from '../../factories/createExamples'
import { Button } from '../button'
import { Kbd } from './component'

export const kbdExamples = defineExamples({
	default: {
		description: 'Standalone keycaps.',
		render: () => (
			<>
				<Kbd>⌘</Kbd>
				<Kbd>K</Kbd>
				<Kbd tone="dark">↵</Kbd>
			</>
		)
	},
	shortcut: {
		description: 'Button shortcut composition.',
		render: () => (
			<>
				<Button shortcut={['cmd', 'k']}>Search</Button>
				<Button shortcut={['cmd', 'enter']} variant="primary">
					Send
				</Button>
			</>
		)
	}
})
