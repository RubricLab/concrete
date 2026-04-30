import { defineExamples } from '../../factories/createExamples'
import { Frame } from '../frame'
import { Bubble } from './component'

export const bubbleExamples = defineExamples({
	default: {
		description: 'Inbound assistant message.',
		render: () => (
			<Frame>
				<Bubble>Concrete keeps conversational UI crisp.</Bubble>
				<Bubble>Ship the primitive set.</Bubble>
			</Frame>
		)
	},
	outbound: {
		description: 'Outbound user message.',
		render: () => (
			<Frame>
				<Bubble>Concrete keeps conversational UI crisp.</Bubble>
				<Bubble direction="outbound">Ship the primitive set.</Bubble>
			</Frame>
		)
	}
})
