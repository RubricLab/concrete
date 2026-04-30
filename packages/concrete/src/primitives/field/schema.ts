import { z } from 'zod/v4'

export const fieldSchema = z
	.object({
		description: z.string().optional(),
		error: z.string().optional(),
		help: z.string().optional(),
		label: z.string().default('Workspace handle'),
		optional: z.boolean().default(false),
		required: z.boolean().default(false),
		status: z.enum(['default', 'error', 'success']).default('default'),
		success: z.string().optional()
	})
	.strict()

export { fieldSchema as fieldPropsSchema }
export type FieldInput = z.input<typeof fieldSchema>
export type FieldValue = z.output<typeof fieldSchema>
