import { z } from 'zod/v4'

export const dataTableActionIconValues = ['download', 'inspect', 'more'] as const

export const dataTableControlSchema = z
	.object({
		actionIcon: z.enum(dataTableActionIconValues).default('inspect'),
		actionLabel: z.string().default('Inspect'),
		filterLabel: z.string().default('Status'),
		searchPlaceholder: z.string().default('Search rows')
	})
	.strict()

export { dataTableControlSchema as dataTableControlPropsSchema }
export type DataTableControlInput = z.input<typeof dataTableControlSchema>
export type DataTableControlValue = z.output<typeof dataTableControlSchema>
