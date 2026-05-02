import { z } from 'zod/v4'

export const listboxDensitySchema = z.enum(['compact', 'default', 'loose'])

export const listboxSchema = z
	.object({
		density: listboxDensitySchema.default('default'),
		empty: z.boolean().default(false),
		emptyLabel: z.string().default('No options'),
		optionCount: z.number().int().min(0).max(4).default(3)
	})
	.strict()

export { listboxSchema as listboxPropsSchema }
export type ListboxInput = z.input<typeof listboxSchema>
export type ListboxDensity = z.infer<typeof listboxDensitySchema>
export type ListboxValue = z.output<typeof listboxSchema>
