import { z } from 'zod/v4'

export const dataTablePaginationPrimitiveSchema = z
	.object({
		page: z.number().int().positive().default(1),
		pageCount: z.number().int().positive().default(4),
		selectedCount: z.number().int().nonnegative().default(2)
	})
	.strict()

export { dataTablePaginationPrimitiveSchema as dataTablePaginationPrimitivePropsSchema }
export type DataTablePaginationInput = z.input<typeof dataTablePaginationPrimitiveSchema>
export type DataTablePaginationValue = z.output<typeof dataTablePaginationPrimitiveSchema>
