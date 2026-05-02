import { z } from 'zod/v4'
import { fieldStatusSchema } from '../../foundations/state'

export const alertSchema = z
	.object({
		description: z.string().optional(),
		status: fieldStatusSchema.default('default'),
		title: z.string().default('Ready')
	})
	.strict()

export { alertSchema as alertPropsSchema }
export type AlertInput = z.input<typeof alertSchema>
export type AlertValue = z.output<typeof alertSchema>
