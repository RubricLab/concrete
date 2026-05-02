import { z } from 'zod/v4'
import { densitySchema } from '../../foundations/state'

export const gridColumnsSchema = z.enum(['auto', 'one', 'two', 'three'])

export const gridSchema = z
	.object({
		columns: gridColumnsSchema.default('auto'),
		content: z.string().default('Grid content'),
		density: densitySchema.default('comfortable')
	})
	.strict()

export { gridSchema as gridPropsSchema }
export type GridColumns = z.infer<typeof gridColumnsSchema>
export type GridInput = z.input<typeof gridSchema>
export type GridValue = z.output<typeof gridSchema>
