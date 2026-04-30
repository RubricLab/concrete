import { z } from 'zod/v4'
import { iconNames } from '../../icons'
import { searchBarTokenSchema } from '../../schemas'

const searchBarComponentTokenSchema = searchBarTokenSchema.extend({
	leadingIcon: z.enum(iconNames).optional()
})

export const searchBarComponentSchema = z
	.object({
		menu: z.boolean().default(false),
		placeholder: z.string().default('Search, ask, or command...'),
		query: z.string().default('triage sligo'),
		tokens: z.array(searchBarComponentTokenSchema).default([]),
		wrap: z.boolean().default(false)
	})
	.strict()

export type SearchBarInput = z.input<typeof searchBarComponentSchema>
export type SearchBarValue = z.output<typeof searchBarComponentSchema>
