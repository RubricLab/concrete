import { z } from 'zod/v4'

export const selectControlSchema = z
	.object({
		empty: z.boolean().default(false),
		label: z.string().default('Research, Design system'),
		open: z.boolean().default(false)
	})
	.strict()

export { selectControlSchema as selectControlPropsSchema }
export type SelectControlInput = z.input<typeof selectControlSchema>
export type SelectControlValue = z.output<typeof selectControlSchema>
