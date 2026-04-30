import { z } from 'zod/v4'

export const bubbleDirectionValues = ['inbound', 'outbound'] as const

export const bubbleSchema = z
	.object({
		direction: z.enum(bubbleDirectionValues).default('inbound'),
		text: z.string().default('Concrete keeps conversational UI crisp.')
	})
	.strict()

export { bubbleSchema as bubblePropsSchema }
export type BubbleInput = z.input<typeof bubbleSchema>
export type BubbleValue = z.output<typeof bubbleSchema>
