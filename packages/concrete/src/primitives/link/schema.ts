import { z } from 'zod/v4'

export const linkSchema = z
	.object({
		current: z.boolean().default(false),
		external: z.boolean().default(false),
		href: z.string().default('#'),
		intent: z.enum(['default', 'sky', 'muted']).default('default'),
		label: z.string().default('Open research note'),
		purpose: z.enum(['inline', 'nav']).default('inline')
	})
	.strict()

export { linkSchema as linkPropsSchema }
export type LinkInput = z.input<typeof linkSchema>
export type LinkValue = z.output<typeof linkSchema>
