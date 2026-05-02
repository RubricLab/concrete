import { z } from 'zod/v4'

export const menuGroupSchema = z
	.object({
		itemCount: z.number().int().min(1).max(4).default(3),
		title: z.string().default('Commands')
	})
	.strict()

export { menuGroupSchema as menuGroupPropsSchema }
export type MenuGroupInput = z.input<typeof menuGroupSchema>
export type MenuGroupValue = z.output<typeof menuGroupSchema>
