import { z } from 'zod/v4'

export const searchInputSchema = z
	.object({
		placeholder: z.string().default('Search...'),
		query: z.string().default(''),
		shortcut: z.array(z.string()).default(['⌘', 'K']),
		wrap: z.boolean().default(false)
	})
	.strict()

export { searchInputSchema as searchInputPropsSchema }
export type SearchInputInput = z.input<typeof searchInputSchema>
export type SearchInputValue = z.output<typeof searchInputSchema>
