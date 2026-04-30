import { defineExamples } from '../../factories/createExamples'
import { FocusRingPreview } from './component'

export const focusRingExamples = defineExamples({
	default: {
		description: 'Shared focus ring token preview.',
		render: () => (
			<>
				<FocusRingPreview />
			</>
		)
	}
})
