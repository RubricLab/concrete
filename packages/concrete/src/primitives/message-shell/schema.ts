import { z } from 'zod/v4'
import { messageRoleSchema, messageStatusSchema, messageSurfaceSchema } from '../../schemas'

export const messageShellSchema = z
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

export { messageShellSchema as messageShellPropsSchema }
export type MessageShellInput = z.input<typeof messageShellSchema>
export type MessageShellValue = z.output<typeof messageShellSchema>
