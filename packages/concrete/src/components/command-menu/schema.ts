import { z } from 'zod/v4'
import { iconNames } from '../../icons'
import { commandItemSchema } from '../../schemas'

const commandMenuItemSchema = commandItemSchema.extend({
	leadingIcon: z.enum(iconNames).optional()
})

export const commandMenuComponentSchema = z
	.object({
		items: z.array(commandMenuItemSchema).default([]),
		loading: z.boolean().default(false),
		query: z.string().default('sligo'),
		searchable: z.boolean().default(true)
	})
	.strict()

export type CommandMenuInput = z.input<typeof commandMenuComponentSchema>
export type CommandMenuValue = z.output<typeof commandMenuComponentSchema>
