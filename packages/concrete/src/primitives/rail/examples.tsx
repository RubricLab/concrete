import { defineExamples } from '../../factories/createExamples'
import { Badge } from '../badge'
import { Button } from '../button'
import { Rail } from './component'

export const railExamples = defineExamples({
	default: {
		description: 'Vertical tool rail.',
		render: () => (
			<Rail>
				<Button iconOnly leadingIcon="search" size="small" variant="secondary">
					Search
				</Button>
				<Button iconOnly leadingIcon="settings" size="small" variant="secondary">
					Settings
				</Button>
				<Button iconOnly leadingIcon="sparkles" size="small" variant="secondary">
					Generate
				</Button>
			</Rail>
		)
	},
	horizontal: {
		description: 'Horizontal rail for compact state or token strips.',
		render: () => (
			<Rail orientation="horizontal">
				<Badge signal="terminal">Ingest</Badge>
				<Badge signal="ultra">Reason</Badge>
				<Badge signal="terminal">Render</Badge>
			</Rail>
		)
	}
})
