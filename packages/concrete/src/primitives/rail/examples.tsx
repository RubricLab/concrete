import { defineExamples } from '../../factories/createExamples'
import { Badge } from '../badge'
import { Button } from '../button'
import { Rail } from './component'

export const railExamples = defineExamples({
	default: {
		description: 'Vertical tool rail.',
		render: () => (
			<Rail>
				<Button iconOnly leadingIcon="search" density="small" hierarchy="secondary">
					Search
				</Button>
				<Button iconOnly leadingIcon="settings" density="small" hierarchy="secondary">
					Settings
				</Button>
				<Button iconOnly leadingIcon="sparkles" density="small" hierarchy="secondary">
					Generate
				</Button>
			</Rail>
		)
	},
	horizontal: {
		description: 'Horizontal rail for compact state or token strips.',
		render: () => (
			<Rail orientation="horizontal">
				<Badge intent="terminal">Ingest</Badge>
				<Badge intent="ultra">Reason</Badge>
				<Badge intent="terminal">Render</Badge>
			</Rail>
		)
	}
})
