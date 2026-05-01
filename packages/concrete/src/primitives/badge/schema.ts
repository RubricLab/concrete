import { z } from 'zod/v4'

export const badgeHierarchyValues = ['ghost', 'soft', 'solid'] as const
export const badgeIntentValues = ['danger', 'terminal', 'ultra'] as const
export const badgePurposeValues = ['count', 'status'] as const

export const badgeSchema = z
	.object({
		hierarchy: z.enum(badgeHierarchyValues).default('soft'),
		intent: z.enum(badgeIntentValues).default('terminal'),
		label: z.string().default('Live'),
		purpose: z.enum(badgePurposeValues).default('status')
	})
	.strict()

export { badgeSchema as badgePropsSchema }
export type BadgeInput = z.input<typeof badgeSchema>
export type BadgeValue = z.output<typeof badgeSchema>
