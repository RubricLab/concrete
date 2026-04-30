import { z } from 'zod/v4'
import { fieldStatusSchema } from '../../foundations/state'

export const fieldRowAlignSchema = z.enum(['center', 'start'])

export const fieldRowSchema = z
	.object({
		align: fieldRowAlignSchema.default('center'),
		control: z.string().default('Enabled'),
		description: z.string().optional(),
		interactive: z.boolean().default(false),
		label: z.string().default('Agent tools'),
		meta: z.string().optional(),
		status: fieldStatusSchema.default('default')
	})
	.strict()

export { fieldRowSchema as fieldRowPropsSchema }
export type FieldRowAlign = z.infer<typeof fieldRowAlignSchema>
export type FieldRowInput = z.input<typeof fieldRowSchema>
export type FieldRowValue = z.output<typeof fieldRowSchema>
