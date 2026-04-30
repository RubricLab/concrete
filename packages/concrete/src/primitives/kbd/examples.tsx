import { defineExamples } from '../../factories/createExamples'
import { Button } from '../button'
import { Frame } from '../frame'
import { Kbd } from './component'

export const kbdExamples = defineExamples({
	default: {
		description: 'Standalone keycaps.',
		render: () => (
			<Frame>
				<Kbd>⌘</Kbd>
				<Kbd>K</Kbd>
				<Kbd tone="dark">↵</Kbd>
			</Frame>
		)
	},
	shortcut: {
		description: 'Button shortcut composition.',
		render: () => (
			<Frame>
				<Button shortcut={['cmd', 'k']}>Search</Button>
				<Button shortcut={['cmd', 'enter']} variant="primary">
					Send
				</Button>
			</Frame>
		)
	}
})
