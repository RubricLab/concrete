import { z } from 'zod/v4'
import { densitySchema } from '../../foundations/state'
import { headingLevelSchema } from '../heading/schema'

export const headerSchema = z
	.object({
		density: densitySchema.default('comfortable'),
		description: z.string().optional(),
		eyebrow: z.string().optional(),
		level: headingLevelSchema.default('2'),
		meta: z.string().optional(),
		title: z.string().default('Header')
	})
	.strict()

export { headerSchema as headerPropsSchema }
export type HeaderInput = z.input<typeof headerSchema>
export type HeaderValue = z.output<typeof headerSchema>
