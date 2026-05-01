import { z } from 'zod/v4'
import { iconNames } from '../../icons'
import { buttonDensitySchema, buttonHierarchySchema, buttonIntentSchema } from '../button/schema'

export const iconButtonSchema = z
	.object({
		density: buttonDensitySchema.default('medium'),
		disabled: z.boolean().default(false),
		hierarchy: buttonHierarchySchema.default('ghost'),
		icon: z.enum(iconNames).default('settings'),
		intent: buttonIntentSchema.default('neutral'),
		label: z.string().default('Open settings'),
		pressed: z.boolean().default(false)
	})
	.strict()

export { iconButtonSchema as iconButtonPropsSchema }
export type IconButtonInput = z.input<typeof iconButtonSchema>
export type IconButtonValue = z.output<typeof iconButtonSchema>
