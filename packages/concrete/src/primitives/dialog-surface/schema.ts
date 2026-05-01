import { z } from 'zod/v4'

export const dialogSurfaceMeasureSchema = z.enum(['compact', 'default', 'wide'])

export const dialogSurfaceSchema = z
	.object({
		content: z.string().default('Dialog content'),
		measure: dialogSurfaceMeasureSchema.default('default'),
		modal: z.boolean().default(false)
	})
	.strict()

export { dialogSurfaceSchema as dialogSurfacePropsSchema }
export type DialogSurfaceInput = z.input<typeof dialogSurfaceSchema>
export type DialogSurfaceMeasure = z.infer<typeof dialogSurfaceMeasureSchema>
export type DialogSurfaceValue = z.output<typeof dialogSurfaceSchema>
