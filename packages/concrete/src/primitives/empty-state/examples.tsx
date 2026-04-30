import { defineExamples } from '../../factories/createExamples'
import { Button } from '../button'
import { Frame } from '../frame/component'
import { EmptyState } from './component'

export const emptyStateExamples = defineExamples({
	default: {
		description: 'Blank-slate message with action.',
		render: () => (
			<Frame>
				<EmptyState
					action={<Button variant="primary">New search</Button>}
					body="Try a broader keyword, or clear the filters applied to this view."
					title="No matches"
				/>
			</Frame>
		)
	},
	sky: {
		description: 'Sky-accented empty state.',
		render: () => (
			<Frame>
				<EmptyState
					action={<Button variant="primary">New search</Button>}
					body="Try a broader keyword, or clear the filters applied to this view."
					title="No matches"
					tone="sky"
				/>
			</Frame>
		)
	},
	small: {
		description: 'Compact empty state.',
		render: () => (
			<Frame>
				<EmptyState
					body="Try a broader keyword, or clear the filters applied to this view."
					size="small"
					title="No matches"
				/>
			</Frame>
		)
	}
})
