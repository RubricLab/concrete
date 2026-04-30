import { z } from 'zod/v4'

export const tableSchema = z
	.object({
		empty: z.boolean().default(false),
		frozen: z.boolean().default(false),
		selectable: z.boolean().default(true),
		sortable: z.boolean().default(true)
	})
	.strict()

export { tableSchema as tablePropsSchema }
export type TableInput = z.input<typeof tableSchema>
export type TableValue = z.output<typeof tableSchema>
