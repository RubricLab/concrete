import { z } from 'zod/v4'
import { iconNames } from '../../icons'

export const rowSchema = z
	.object({
		interactive: z.boolean().default(true),
		label: z.string().default('Research memo'),
		leadingIcon: z.enum(iconNames).optional(),
		meta: z.string().optional()
	})
	.strict()

export { rowSchema as rowPropsSchema }
export type RowInput = z.input<typeof rowSchema>
export type RowValue = z.output<typeof rowSchema>
