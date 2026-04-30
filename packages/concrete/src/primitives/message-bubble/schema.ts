import { z } from 'zod/v4'

export const messageBubbleDirectionValues = ['inbound', 'outbound'] as const

export const messageBubbleSchema = z
	.object({
		direction: z.enum(messageBubbleDirectionValues).default('inbound'),
		text: z.string().default('Concrete keeps conversational UI crisp.')
	})
	.strict()

export { messageBubbleSchema as messageBubblePropsSchema }
export type MessageBubbleInput = z.input<typeof messageBubbleSchema>
export type MessageBubbleValue = z.output<typeof messageBubbleSchema>
