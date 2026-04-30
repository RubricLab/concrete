import { z } from 'zod/v4'
import { iconNames } from '../../icons'

export const emptyStateSchema = z
	.object({
		body: z.string().optional(),
		icon: z.enum(iconNames).default('search'),
		size: z.enum(['small', 'medium', 'large']).default('medium'),
		title: z.string().default('No matches'),
		tone: z.enum(['default', 'sky']).default('default')
	})
	.strict()

export { emptyStateSchema as emptyStatePropsSchema }
export type EmptyStateInput = z.input<typeof emptyStateSchema>
export type EmptyStateValue = z.output<typeof emptyStateSchema>
