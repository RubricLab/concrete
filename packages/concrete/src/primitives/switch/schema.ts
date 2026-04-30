import { z } from 'zod/v4'

export const switchSchema = z
	.object({
		checked: z.boolean().default(false),
		disabled: z.boolean().default(false),
		label: z.string().default('Selected')
	})
	.strict()

export { switchSchema as switchPropsSchema }
export type SwitchInput = z.input<typeof switchSchema>
export type SwitchValue = z.output<typeof switchSchema>
