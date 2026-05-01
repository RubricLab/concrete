import { defineExamples } from '../../factories/createExamples'
import { Badge } from '../badge'
import { Button } from '../button'
import { Dock } from './component'

export const dockExamples = defineExamples({
	between: {
		description: 'Status plus trailing actions.',
		render: () => (
			<Dock align="between">
				<Badge intent="terminal">Autosaved</Badge>
				<Button density="small" hierarchy="primary">
					Publish
				</Button>
			</Dock>
		)
	},
	default: {
		description: 'Footer command dock.',
		render: () => (
			<Dock>
				<Button density="small" hierarchy="ghost">
					Cancel
				</Button>
				<Button density="small" hierarchy="primary">
					Save
				</Button>
			</Dock>
		)
	},
	top: {
		description: 'Top-attached control dock.',
		render: () => (
			<Dock placement="top">
				<Button density="small" hierarchy="secondary">
					Filter
				</Button>
				<Button density="small" hierarchy="secondary">
					Export
				</Button>
			</Dock>
		)
	}
})
