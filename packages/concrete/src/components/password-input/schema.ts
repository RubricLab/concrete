import { z } from 'zod/v4'

export const passwordInputComponentSchema = z
	.object({
		error: z.string().optional(),
		help: z.string().optional(),
		label: z.string().default('Password'),
		value: z.string().default('concrete-secret')
	})
	.strict()

export type PasswordInputInput = z.input<typeof passwordInputComponentSchema>
export type PasswordInputValue = z.output<typeof passwordInputComponentSchema>
