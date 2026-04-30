import { z } from 'zod/v4'
import { iconNames } from '../../icons'
import { buttonSizeSchema, buttonVariantSchema } from '../button/schema'

export const iconButtonSchema = z
	.object({
		disabled: z.boolean().default(false),
		icon: z.enum(iconNames).default('settings'),
		label: z.string().default('Open settings'),
		pressed: z.boolean().default(false),
		size: buttonSizeSchema.default('medium'),
		variant: buttonVariantSchema.default('ghost')
	})
	.strict()

export { iconButtonSchema as iconButtonPropsSchema }
export type IconButtonInput = z.input<typeof iconButtonSchema>
export type IconButtonValue = z.output<typeof iconButtonSchema>
