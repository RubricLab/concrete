import { z } from 'zod/v4'

export const drawerSurfaceSideSchema = z.enum(['left', 'right'])
export const drawerSurfaceSizeSchema = z.enum(['compact', 'default', 'wide'])

export const drawerSurfaceSchema = z
	.object({
		content: z.string().default('Drawer content'),
		modal: z.boolean().default(false),
		side: drawerSurfaceSideSchema.default('right'),
		size: drawerSurfaceSizeSchema.default('default')
	})
	.strict()

export { drawerSurfaceSchema as drawerSurfacePropsSchema }
export type DrawerSurfaceInput = z.input<typeof drawerSurfaceSchema>
export type DrawerSurfaceSide = z.infer<typeof drawerSurfaceSideSchema>
export type DrawerSurfaceSize = z.infer<typeof drawerSurfaceSizeSchema>
export type DrawerSurfaceValue = z.output<typeof drawerSurfaceSchema>
