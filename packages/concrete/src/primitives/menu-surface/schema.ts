import { z } from 'zod/v4'
import { densitySchema } from '../../foundations/state'

export const menuSurfaceRoleSchema = z.enum(['listbox', 'menu'])

export const menuSurfaceSchema = z
	.object({
		density: densitySchema.default('comfortable'),
		itemCount: z.number().int().min(1).max(4).default(3),
		role: menuSurfaceRoleSchema.default('menu')
	})
	.strict()

export { menuSurfaceSchema as menuSurfacePropsSchema }
export type MenuSurfaceInput = z.input<typeof menuSurfaceSchema>
export type MenuSurfaceRole = z.infer<typeof menuSurfaceRoleSchema>
export type MenuSurfaceValue = z.output<typeof menuSurfaceSchema>
