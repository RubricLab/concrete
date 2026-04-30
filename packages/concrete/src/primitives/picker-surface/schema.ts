import { z } from 'zod/v4'

export const pickerSurfacePlacementSchema = z.enum(['floating', 'inline'])

export const pickerSurfaceSchema = z
	.object({
		content: z.string().default('Picker content'),
		open: z.boolean().default(false),
		placement: pickerSurfacePlacementSchema.default('inline')
	})
	.strict()

export { pickerSurfaceSchema as pickerSurfacePropsSchema }
export type PickerSurfaceInput = z.input<typeof pickerSurfaceSchema>
export type PickerSurfacePlacement = z.infer<typeof pickerSurfacePlacementSchema>
export type PickerSurfaceValue = z.output<typeof pickerSurfaceSchema>
