import { defineExamples } from '../../factories/createExamples'
import { Badge } from '../badge'
import { Button } from '../button'
import { Dock } from './component'

export const dockExamples = defineExamples({
	between: {
		description: 'Status plus trailing actions.',
		render: () => (
			<Dock align="between">
				<Badge signal="terminal">Autosaved</Badge>
				<Button size="small" variant="primary">
					Publish
				</Button>
			</Dock>
		)
	},
	default: {
		description: 'Footer command dock.',
		render: () => (
			<Dock>
				<Button size="small" variant="ghost">
					Cancel
				</Button>
				<Button size="small" variant="primary">
					Save
				</Button>
			</Dock>
		)
	},
	top: {
		description: 'Top-attached control dock.',
		render: () => (
			<Dock placement="top">
				<Button size="small" variant="secondary">
					Filter
				</Button>
				<Button size="small" variant="secondary">
					Export
				</Button>
			</Dock>
		)
	}
})
