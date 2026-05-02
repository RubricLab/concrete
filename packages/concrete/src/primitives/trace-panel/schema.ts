import { z } from 'zod/v4'
import { messageStatusSchema } from '../../schemas'

export const tracePanelSchema = z
	.object({
		open: z.boolean().default(true),
		status: messageStatusSchema.default('streaming'),
		summary: z.string().default('Inspecting context and selecting the next action.'),
		title: z.string().default('Thinking')
	})
	.strict()

export { tracePanelSchema as tracePanelPropsSchema }
export type TracePanelInput = z.input<typeof tracePanelSchema>
export type TracePanelValue = z.output<typeof tracePanelSchema>
