import { z } from 'zod/v4'
import { iconNames } from '../../icons'
import { commandItemToneSchema } from '../../schemas'

export const optionRowSchema = z
	.object({
		active: z.boolean().default(false),
		description: z.string().optional(),
		kind: z.enum(['command', 'select']).default('select'),
		label: z.string().default('Open command palette'),
		leadingIcon: z.enum(iconNames).optional(),
		meta: z.string().optional(),
		selected: z.boolean().default(false),
		tone: commandItemToneSchema.default('default')
	})
	.strict()

export { optionRowSchema as optionRowPropsSchema }
export type OptionRowInput = z.input<typeof optionRowSchema>
export type OptionRowValue = z.output<typeof optionRowSchema>
