import { defineExamples } from '../../factories/createExamples'
import { Frame } from '../frame/component'
import { Wordmark } from './component'

export const wordmarkExamples = defineExamples({
	default: {
		description: 'Default Rubric wordmark.',
		render: () => (
			<Frame>
				<Wordmark />
			</Frame>
		)
	}
})
