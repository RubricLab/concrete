import { z } from 'zod/v4'
import { densitySchema } from '../../foundations/state'
import { surfaceDepthSchema, surfaceToneSchema } from '../surface/schema'

export const panelSchema = z
	.object({
		content: z.string().default('Panel content'),
		density: densitySchema.default('comfortable'),
		depth: surfaceDepthSchema.default('flat'),
		description: z.string().optional(),
		footer: z.string().optional(),
		title: z.string().default('Panel'),
		tone: surfaceToneSchema.default('default')
	})
	.strict()

export { panelSchema as panelPropsSchema }
export type PanelInput = z.input<typeof panelSchema>
export type PanelValue = z.output<typeof panelSchema>
