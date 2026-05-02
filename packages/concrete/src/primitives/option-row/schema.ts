import { z } from 'zod/v4'
import { iconNames } from '../../icons'
import { commandItemIntentSchema } from '../../schemas'

export const optionRowSchema = z
	.object({
		active: z.boolean().default(false),
		description: z.string().optional(),
		intent: commandItemIntentSchema.default('default'),
		kind: z.enum(['command', 'select']).default('select'),
		label: z.string().default('Open command palette'),
		leadingIcon: z.enum(iconNames).optional(),
		meta: z.string().optional(),
		selected: z.boolean().default(false)
	})
	.strict()

export { optionRowSchema as optionRowPropsSchema }
export type OptionRowInput = z.input<typeof optionRowSchema>
export type OptionRowValue = z.output<typeof optionRowSchema>
