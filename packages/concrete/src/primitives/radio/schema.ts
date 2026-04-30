import { z } from 'zod/v4'

export const radioSchema = z
	.object({
		checked: z.boolean().default(false),
		disabled: z.boolean().default(false),
		label: z.string().default('Selected')
	})
	.strict()

export { radioSchema as radioPropsSchema }
export type RadioInput = z.input<typeof radioSchema>
export type RadioValue = z.output<typeof radioSchema>
