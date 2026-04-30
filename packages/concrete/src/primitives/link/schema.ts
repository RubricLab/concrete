import { z } from 'zod/v4'

export const linkSchema = z
	.object({
		current: z.boolean().default(false),
		external: z.boolean().default(false),
		href: z.string().default('#'),
		label: z.string().default('Open research note'),
		tone: z.enum(['default', 'sky', 'muted']).default('default'),
		variant: z.enum(['inline', 'nav']).default('inline')
	})
	.strict()

export { linkSchema as linkPropsSchema }
export type LinkInput = z.input<typeof linkSchema>
export type LinkValue = z.output<typeof linkSchema>
