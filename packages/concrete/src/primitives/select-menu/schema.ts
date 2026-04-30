import { z } from 'zod/v4'

export const selectMenuSchema = z
	.object({
		filterable: z.boolean().default(true),
		placeholder: z.string().default('Filter...'),
		placement: z.enum(['floating', 'inline']).default('inline')
	})
	.strict()

export { selectMenuSchema as selectMenuPropsSchema }
export type SelectMenuInput = z.input<typeof selectMenuSchema>
export type SelectMenuValue = z.output<typeof selectMenuSchema>
