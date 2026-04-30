import { defineExamples } from '../../factories/createExamples'
import { Bubble } from './component'

export const bubbleExamples = defineExamples({
	default: {
		description: 'Inbound assistant message.',
		render: () => (
			<>
				<Bubble>Concrete keeps conversational UI crisp.</Bubble>
				<Bubble>Ship the primitive set.</Bubble>
			</>
		)
	},
	outbound: {
		description: 'Outbound user message.',
		render: () => (
			<>
				<Bubble>Concrete keeps conversational UI crisp.</Bubble>
				<Bubble direction="outbound">Ship the primitive set.</Bubble>
			</>
		)
	}
})
