import { z } from 'zod/v4'
import { fieldStatusSchema } from '../../foundations/state'

export const validationListSchema = z
	.object({
		issueCount: z.number().int().min(1).max(4).default(2),
		status: fieldStatusSchema.default('error')
	})
	.strict()

export { validationListSchema as validationListPropsSchema }
export type ValidationListInput = z.input<typeof validationListSchema>
export type ValidationListValue = z.output<typeof validationListSchema>
