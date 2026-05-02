import { z } from 'zod/v4'
import { iconNames } from '../../icons'
import { commandItemIntentSchema } from '../../schemas'

export const tokenKindSchema = z.enum(['attachment', 'entity', 'mention', 'scope', 'value'])

export const tokenSchema = z
	.object({
		intent: commandItemIntentSchema.default('default'),
		kind: tokenKindSchema.default('entity'),
		label: z.string().default('Workspace'),
		leadingIcon: z.enum(iconNames).optional(),
		removable: z.boolean().default(true)
	})
	.strict()

export { tokenSchema as tokenPropsSchema }
export type TokenInput = z.input<typeof tokenSchema>
export type TokenKind = z.infer<typeof tokenKindSchema>
export type TokenValue = z.output<typeof tokenSchema>
