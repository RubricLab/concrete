import { z } from 'zod/v4'
import { densitySchema } from '../../foundations/state'
import { surfaceDepthSchema, surfaceIntentSchema } from '../surface/schema'

export const panelSchema = z
	.object({
		content: z.string().default('Panel content'),
		density: densitySchema.default('comfortable'),
		depth: surfaceDepthSchema.default('flat'),
		description: z.string().optional(),
		footer: z.string().optional(),
		intent: surfaceIntentSchema.default('default'),
		title: z.string().default('Panel')
	})
	.strict()

export { panelSchema as panelPropsSchema }
export type PanelInput = z.input<typeof panelSchema>
export type PanelValue = z.output<typeof panelSchema>
