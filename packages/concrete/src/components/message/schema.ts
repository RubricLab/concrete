import { z } from 'zod/v4'
import { messageRoleSchema, messageStatusSchema, messageSurfaceSchema } from '../../schemas'

export const messageComponentSchema = z
	.object({
		author: z.string().min(1).optional(),
		avatarInitials: z.string().min(1).optional(),
		avatarSrc: z.string().min(1).optional(),
		children: z
			.string()
			.default(
				'The eval runner is failing during schema hydration. I found one stale fixture and a missing tool permission edge.'
			),
		grouped: z.boolean().default(false),
		messageRole: messageRoleSchema.default('assistant'),
		meta: z.string().min(1).optional(),
		showAvatar: z.boolean().default(true),
		showStatus: z.boolean().default(true),
		status: messageStatusSchema.default('complete'),
		surface: messageSurfaceSchema.default('bubble')
	})
	.strict()

export type MessageInput = z.input<typeof messageComponentSchema>
export type MessageValue = z.output<typeof messageComponentSchema>
