import { z } from 'zod/v4'

export const dialogSurfaceSizeSchema = z.enum(['compact', 'default', 'wide'])

export const dialogSurfaceSchema = z
	.object({
		content: z.string().default('Dialog content'),
		modal: z.boolean().default(false),
		size: dialogSurfaceSizeSchema.default('default')
	})
	.strict()

export { dialogSurfaceSchema as dialogSurfacePropsSchema }
export type DialogSurfaceInput = z.input<typeof dialogSurfaceSchema>
export type DialogSurfaceSize = z.infer<typeof dialogSurfaceSizeSchema>
export type DialogSurfaceValue = z.output<typeof dialogSurfaceSchema>
