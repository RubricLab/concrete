import { z } from 'zod/v4'
import { iconNames } from '../../icons'

export const pillToneValues = [
	'default',
	'ink',
	'sky',
	'sunken',
	'terminal',
	'ultra',
	'error'
] as const

export const pillSchema = z
	.object({
		label: z.string().default('queued'),
		leadingIcon: z.enum(iconNames).optional(),
		tone: z.enum(pillToneValues).default('default')
	})
	.strict()

export { pillSchema as pillPropsSchema }
export type PillInput = z.input<typeof pillSchema>
export type PillValue = z.output<typeof pillSchema>
