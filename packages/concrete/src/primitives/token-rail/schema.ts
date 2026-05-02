import { z } from 'zod/v4'

export const tokenRailItemKindValues = ['attachment', 'command', 'mention'] as const
export const tokenRailItemIconValues = ['at-sign', 'paperclip', 'slash'] as const

export const tokenRailItemSchema = z
	.object({
		icon: z.enum(tokenRailItemIconValues).optional(),
		id: z.string().min(1),
		kind: z.enum(tokenRailItemKindValues),
		label: z.string().min(1),
		meta: z.string().optional(),
		removeLabel: z.string().optional()
	})
	.strict()

export const tokenRailSchema = z
	.object({
		items: z.array(tokenRailItemSchema).default([
			{ icon: 'at-sign', id: 'mention', kind: 'mention', label: 'Arihan V.' },
			{ icon: 'slash', id: 'command', kind: 'command', label: 'Summarize' },
			{
				icon: 'paperclip',
				id: 'attachment',
				kind: 'attachment',
				label: 'research-brief.pdf',
				meta: 'PDF'
			}
		])
	})
	.strict()

export { tokenRailSchema as tokenRailPropsSchema }
export type TokenRailInput = z.input<typeof tokenRailSchema>
export type TokenRailValue = z.output<typeof tokenRailSchema>
