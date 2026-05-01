import { defineExamples } from '../../factories/createExamples'
import { Button } from '../button'
import { EmptyState } from './component'

export const emptyStateExamples = defineExamples({
	compact: {
		description: 'Compact empty state.',
		render: () => (
			<>
				<EmptyState
					body="Try a broader keyword, or clear the filters applied to this view."
					density="compact"
					title="No matches"
				/>
			</>
		)
	},
	default: {
		description: 'Blank-slate message with action.',
		render: () => (
			<>
				<EmptyState
					action={<Button hierarchy="primary">New search</Button>}
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
					action={<Button hierarchy="primary">New search</Button>}
					body="Try a broader keyword, or clear the filters applied to this view."
					intent="sky"
					title="No matches"
				/>
			</>
		)
	}
})
