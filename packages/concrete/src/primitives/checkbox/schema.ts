import { z } from 'zod/v4'

export const checkboxSchema = z
	.object({
		checked: z.boolean().default(false),
		disabled: z.boolean().default(false),
		label: z.string().default('Selected')
	})
	.strict()

export { checkboxSchema as checkboxPropsSchema }
export type CheckboxInput = z.input<typeof checkboxSchema>
export type CheckboxValue = z.output<typeof checkboxSchema>
