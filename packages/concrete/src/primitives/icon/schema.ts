import { z } from 'zod/v4'

export const iconSchema = z
	.object({
		name: z.enum(['search', 'settings', 'sparkles', 'file-text', 'activity']).default('search'),
		title: z.string().optional()
	})
	.strict()

export { iconSchema as iconPropsSchema }
export type IconInput = z.input<typeof iconSchema>
export type IconValue = z.output<typeof iconSchema>
