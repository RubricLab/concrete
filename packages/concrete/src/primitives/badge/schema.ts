import { z } from 'zod/v4'

export const badgeSignalValues = ['terminal', 'ultra', 'error'] as const
export const badgeVariantValues = ['soft', 'solid', 'ghost', 'count'] as const

export const badgeSchema = z
	.object({
		label: z.string().default('Live'),
		signal: z.enum(badgeSignalValues).default('terminal'),
		variant: z.enum(badgeVariantValues).default('soft')
	})
	.strict()

export { badgeSchema as badgePropsSchema }
export type BadgeInput = z.input<typeof badgeSchema>
export type BadgeValue = z.output<typeof badgeSchema>
