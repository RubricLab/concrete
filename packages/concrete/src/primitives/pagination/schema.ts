import { z } from 'zod/v4'

export const paginationSchema = z
	.object({
		page: z.number().int().positive().default(1),
		pageCount: z.number().int().positive().default(4),
		selectedCount: z.number().int().nonnegative().default(2)
	})
	.strict()

export { paginationSchema as paginationPropsSchema }
export type PaginationInput = z.input<typeof paginationSchema>
export type PaginationValue = z.output<typeof paginationSchema>
