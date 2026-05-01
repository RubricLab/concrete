import { z } from 'zod/v4'

export const avatarDensityValues = ['compact', 'comfortable', 'editorial'] as const

export const avatarSchema = z
	.object({
		alt: z.string().default(''),
		density: z.enum(avatarDensityValues).default('comfortable'),
		initials: z.string().default('AK'),
		src: z.string().optional()
	})
	.strict()

export { avatarSchema as avatarPropsSchema }
export type AvatarInput = z.input<typeof avatarSchema>
export type AvatarValue = z.output<typeof avatarSchema>
