import { z } from 'zod/v4'

export const dataTableShellSchema = z
	.object({
		empty: z.boolean().default(false),
		frozen: z.boolean().default(false),
		selectable: z.boolean().default(true),
		sortable: z.boolean().default(true)
	})
	.strict()

export { dataTableShellSchema as dataTableShellPropsSchema }
export type DataTableShellInput = z.input<typeof dataTableShellSchema>
export type DataTableShellValue = z.output<typeof dataTableShellSchema>
