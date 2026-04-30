import { z } from 'zod/v4'
import { messageRoleSchema, messageStatusSchema, messageSurfaceSchema } from '../../schemas'

export const transcriptItemSchema = z
	.object({
		author: z.string().default('Assistant'),
		grouped: z.boolean().default(false),
		messageRole: messageRoleSchema.default('assistant'),
		meta: z.string().optional(),
		status: messageStatusSchema.default('complete'),
		surface: messageSurfaceSchema.default('bubble'),
		text: z.string().default('Concrete keeps dense agent output calm and readable.')
	})
	.strict()

export { transcriptItemSchema as transcriptItemPropsSchema }
export type TranscriptItemInput = z.input<typeof transcriptItemSchema>
export type TranscriptItemValue = z.output<typeof transcriptItemSchema>
