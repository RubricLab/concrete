import { z } from 'zod/v4'
import { iconNames } from '../../icons'
import { commandItemToneSchema } from '../../schemas'

export const tokenKindSchema = z.enum(['attachment', 'entity', 'mention', 'scope', 'value'])

export const tokenSchema = z
	.object({
		kind: tokenKindSchema.default('entity'),
		label: z.string().default('Workspace'),
		leadingIcon: z.enum(iconNames).optional(),
		removable: z.boolean().default(true),
		tone: commandItemToneSchema.default('default')
	})
	.strict()

export { tokenSchema as tokenPropsSchema }
export type TokenInput = z.input<typeof tokenSchema>
export type TokenKind = z.infer<typeof tokenKindSchema>
export type TokenValue = z.output<typeof tokenSchema>
