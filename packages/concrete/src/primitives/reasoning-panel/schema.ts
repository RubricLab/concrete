import { z } from 'zod/v4'
import { messageStatusSchema } from '../../schemas'

export const reasoningPanelSchema = z
	.object({
		open: z.boolean().default(true),
		status: messageStatusSchema.default('streaming'),
		summary: z.string().default('Inspecting context and selecting the next action.'),
		title: z.string().default('Thinking')
	})
	.strict()

export { reasoningPanelSchema as reasoningPanelPropsSchema }
export type ReasoningPanelInput = z.input<typeof reasoningPanelSchema>
export type ReasoningPanelValue = z.output<typeof reasoningPanelSchema>
