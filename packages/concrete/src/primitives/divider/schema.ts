import { z } from 'zod/v4'

export const dividerSchema = z
	.object({
		label: z.string().optional()
	})
	.strict()

export { dividerSchema as dividerPropsSchema }
export type DividerInput = z.input<typeof dividerSchema>
export type DividerValue = z.output<typeof dividerSchema>
