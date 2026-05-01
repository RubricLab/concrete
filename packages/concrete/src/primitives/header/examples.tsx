import { defineExamples } from '../../factories/createExamples'
import { Button } from '../button'
import { Label } from '../label'
import { Header } from './component'

export const headerExamples = defineExamples({
	actions: {
		description: 'Header with trailing command region.',
		render: () => (
			<Header
				actions={<Button density="small">Run</Button>}
				description="2 pending edits."
				title="Diff"
			/>
		)
	},
	default: {
		description: 'Local title and description anatomy.',
		render: () => <Header description="Compact hierarchy for a product region." title="Overview" />
	},
	meta: {
		description: 'Header with eyebrow and metadata.',
		render: () => <Header eyebrow="Agent" meta={<Label marker>Live</Label>} title="Trace" />
	}
})
