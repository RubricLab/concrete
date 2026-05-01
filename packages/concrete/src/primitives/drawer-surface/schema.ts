import { z } from 'zod/v4'

export const drawerSurfaceSideSchema = z.enum(['left', 'right'])
export const drawerSurfaceMeasureSchema = z.enum(['compact', 'default', 'wide'])

export const drawerSurfaceSchema = z
	.object({
		content: z.string().default('Drawer content'),
		measure: drawerSurfaceMeasureSchema.default('default'),
		modal: z.boolean().default(false),
		side: drawerSurfaceSideSchema.default('right')
	})
	.strict()

export { drawerSurfaceSchema as drawerSurfacePropsSchema }
export type DrawerSurfaceInput = z.input<typeof drawerSurfaceSchema>
export type DrawerSurfaceSide = z.infer<typeof drawerSurfaceSideSchema>
export type DrawerSurfaceMeasure = z.infer<typeof drawerSurfaceMeasureSchema>
export type DrawerSurfaceValue = z.output<typeof drawerSurfaceSchema>
