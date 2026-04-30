import { defineExamples } from '../../factories/createExamples'
import { Frame } from '../frame/component'
import { FocusRingPreview } from './component'

export const focusRingExamples = defineExamples({
	default: {
		description: 'Shared focus ring token preview.',
		render: () => (
			<Frame>
				<FocusRingPreview />
			</Frame>
		)
	}
})
