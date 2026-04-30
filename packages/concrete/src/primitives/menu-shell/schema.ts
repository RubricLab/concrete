import { z } from 'zod/v4'

export const menuShellSchema = z
	.object({
		empty: z.string().default('No matches'),
		heading: z.string().default('Commands'),
		searchable: z.boolean().default(true),
		showEmpty: z.boolean().default(false)
	})
	.strict()

export { menuShellSchema as menuShellPropsSchema }
export type MenuShellInput = z.input<typeof menuShellSchema>
export type MenuShellValue = z.output<typeof menuShellSchema>
