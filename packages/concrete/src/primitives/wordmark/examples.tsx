import { defineExamples } from '../../factories/createExamples'
import { Wordmark } from './component'

export const wordmarkExamples = defineExamples({
	default: {
		description: 'Default Rubric wordmark.',
		render: () => (
			<>
				<Wordmark />
			</>
		)
	}
})
