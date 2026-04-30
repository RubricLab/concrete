import { z } from 'zod/v4'

export const progressSchema = z
	.object({
		indeterminate: z.enum(['', 'shuttle', 'lined']).default(''),
		size: z.enum(['thin', 'medium', 'thick']).default('medium'),
		tone: z.enum(['default', 'sky', 'terminal', 'ultra', 'error']).default('default'),
		value: z.number().min(0).max(100).default(62)
	})
	.strict()

export { progressSchema as progressPropsSchema }
export type ProgressInput = z.input<typeof progressSchema>
export type ProgressValue = z.output<typeof progressSchema>
