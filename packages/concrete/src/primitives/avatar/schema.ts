import { z } from 'zod/v4'

export const avatarSizeValues = ['small', 'medium', 'large'] as const

export const avatarSchema = z
	.object({
		alt: z.string().default(''),
		initials: z.string().default('AK'),
		size: z.enum(avatarSizeValues).default('medium'),
		src: z.string().optional()
	})
	.strict()

export { avatarSchema as avatarPropsSchema }
export type AvatarInput = z.input<typeof avatarSchema>
export type AvatarValue = z.output<typeof avatarSchema>
