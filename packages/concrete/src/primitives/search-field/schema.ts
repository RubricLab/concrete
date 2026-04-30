import { z } from 'zod/v4'

export const searchFieldSchema = z
	.object({
		menuPlacement: z.enum(['inline', 'popdown']).default('popdown'),
		placeholder: z.string().default('Search...'),
		query: z.string().default(''),
		shortcut: z.array(z.string()).default(['⌘', 'K']),
		wrap: z.boolean().default(false)
	})
	.strict()

export { searchFieldSchema as searchFieldPropsSchema }
export type SearchFieldInput = z.input<typeof searchFieldSchema>
export type SearchFieldValue = z.output<typeof searchFieldSchema>
