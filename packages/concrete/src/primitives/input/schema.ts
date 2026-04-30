import { z } from 'zod/v4'
import { iconNames } from '../../icons'

export const inputSchema = z
	.object({
		disabled: z.boolean().default(false),
		error: z.string().optional(),
		label: z.string().optional(),
		leadingIcon: z.enum(iconNames).optional(),
		placeholder: z.string().optional(),
		value: z.string().default('')
	})
	.strict()

export { inputSchema as inputPropsSchema }
export type InputInput = z.input<typeof inputSchema>
export type InputValue = z.output<typeof inputSchema>
