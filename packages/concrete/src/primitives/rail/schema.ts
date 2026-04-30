import { z } from 'zod/v4'
import { densitySchema } from '../../foundations/state'

export const railAlignSchema = z.enum(['start', 'center', 'end', 'stretch'])
export const railOrientationSchema = z.enum(['vertical', 'horizontal'])

export const railSchema = z
	.object({
		align: railAlignSchema.default('center'),
		content: z.string().default('Rail content'),
		density: densitySchema.default('comfortable'),
		orientation: railOrientationSchema.default('vertical')
	})
	.strict()

export { railSchema as railPropsSchema }
export type RailAlign = z.infer<typeof railAlignSchema>
export type RailInput = z.input<typeof railSchema>
export type RailOrientation = z.infer<typeof railOrientationSchema>
export type RailValue = z.output<typeof railSchema>
