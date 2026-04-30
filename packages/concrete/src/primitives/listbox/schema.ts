import { z } from 'zod/v4'

export const listboxSizeSchema = z.enum(['compact', 'default', 'loose'])

export const listboxSchema = z
	.object({
		empty: z.boolean().default(false),
		emptyLabel: z.string().default('No options'),
		optionCount: z.number().int().min(0).max(4).default(3),
		size: listboxSizeSchema.default('default')
	})
	.strict()

export { listboxSchema as listboxPropsSchema }
export type ListboxInput = z.input<typeof listboxSchema>
export type ListboxSize = z.infer<typeof listboxSizeSchema>
export type ListboxValue = z.output<typeof listboxSchema>
