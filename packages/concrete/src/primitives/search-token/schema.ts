import { z } from 'zod/v4'
import { iconNames } from '../../icons'
import { commandItemToneSchema } from '../../schemas'

export const searchTokenPrimitiveSchema = z
	.object({
		label: z.string().default('Workspace'),
		leadingIcon: z.enum(iconNames).optional(),
		removable: z.boolean().default(true),
		tone: commandItemToneSchema.default('default')
	})
	.strict()

export { searchTokenPrimitiveSchema as searchTokenPrimitivePropsSchema }
export type SearchTokenPrimitiveInput = z.input<typeof searchTokenPrimitiveSchema>
export type SearchTokenPrimitiveValue = z.output<typeof searchTokenPrimitiveSchema>
