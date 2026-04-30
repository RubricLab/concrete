import { z } from 'zod/v4'
import { densitySchema } from '../../foundations/state'

export const dockAlignSchema = z.enum(['start', 'center', 'end', 'between'])
export const dockPlacementSchema = z.enum(['top', 'bottom', 'inline'])

export const dockSchema = z
	.object({
		align: dockAlignSchema.default('end'),
		content: z.string().default('Dock content'),
		density: densitySchema.default('comfortable'),
		placement: dockPlacementSchema.default('bottom')
	})
	.strict()

export { dockSchema as dockPropsSchema }
export type DockAlign = z.infer<typeof dockAlignSchema>
export type DockInput = z.input<typeof dockSchema>
export type DockPlacement = z.infer<typeof dockPlacementSchema>
export type DockValue = z.output<typeof dockSchema>
