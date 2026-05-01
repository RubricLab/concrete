import { z } from 'zod/v4'
import { iconNames } from '../../icons'

export const emptyStateSchema = z
	.object({
		body: z.string().optional(),
		density: z.enum(['compact', 'comfortable', 'editorial']).default('comfortable'),
		icon: z.enum(iconNames).default('search'),
		intent: z.enum(['neutral', 'sky']).default('neutral'),
		title: z.string().default('No matches')
	})
	.strict()

export { emptyStateSchema as emptyStatePropsSchema }
export type EmptyStateInput = z.input<typeof emptyStateSchema>
export type EmptyStateValue = z.output<typeof emptyStateSchema>
