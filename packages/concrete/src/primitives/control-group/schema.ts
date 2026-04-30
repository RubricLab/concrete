import { z } from 'zod/v4'
import { densitySchema } from '../../foundations/state'

export const controlGroupOrientationSchema = z.enum(['horizontal', 'vertical'])

export const controlGroupSchema = z
	.object({
		attached: z.boolean().default(false),
		content: z.string().default('Control group'),
		density: densitySchema.default('comfortable'),
		label: z.string().optional(),
		orientation: controlGroupOrientationSchema.default('horizontal')
	})
	.strict()

export { controlGroupSchema as controlGroupPropsSchema }
export type ControlGroupInput = z.input<typeof controlGroupSchema>
export type ControlGroupOrientation = z.infer<typeof controlGroupOrientationSchema>
export type ControlGroupValue = z.output<typeof controlGroupSchema>
