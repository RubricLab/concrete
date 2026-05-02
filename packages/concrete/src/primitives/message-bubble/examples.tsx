import { defineExamples } from '../../factories/createExamples'
import { MessageBubble } from './component'

export const messageBubbleExamples = defineExamples({
	default: {
		description: 'Inbound assistant message.',
		render: () => (
			<>
				<MessageBubble>Concrete keeps conversational UI crisp.</MessageBubble>
				<MessageBubble>Ship the primitive set.</MessageBubble>
			</>
		)
	},
	outbound: {
		description: 'Outbound user message.',
		render: () => (
			<>
				<MessageBubble>Concrete keeps conversational UI crisp.</MessageBubble>
				<MessageBubble direction="outbound">Ship the primitive set.</MessageBubble>
			</>
		)
	}
})
