import { defineExamples } from '../../factories/createExamples'
import { Button } from '../button'
import { EmptyState } from './component'

export const emptyStateExamples = defineExamples({
	default: {
		description: 'Blank-slate message with action.',
		render: () => (
			<>
				<EmptyState
					action={<Button variant="primary">New search</Button>}
					body="Try a broader keyword, or clear the filters applied to this view."
					title="No matches"
				/>
			</>
		)
	},
	sky: {
		description: 'Sky-accented empty state.',
		render: () => (
			<>
				<EmptyState
					action={<Button variant="primary">New search</Button>}
					body="Try a broader keyword, or clear the filters applied to this view."
					title="No matches"
					tone="sky"
				/>
			</>
		)
	},
	small: {
		description: 'Compact empty state.',
		render: () => (
			<>
				<EmptyState
					body="Try a broader keyword, or clear the filters applied to this view."
					size="small"
					title="No matches"
				/>
			</>
		)
	}
})
