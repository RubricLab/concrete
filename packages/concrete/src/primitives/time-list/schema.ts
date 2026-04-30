import { z } from 'zod/v4'

export const timeListSchema = z
	.object({
		placement: z.enum(['floating', 'inline']).default('inline'),
		value: z.string().default('14:30')
	})
	.strict()

export { timeListSchema as timeListPropsSchema }
export type TimeListInput = z.input<typeof timeListSchema>
export type TimeListValue = z.output<typeof timeListSchema>
