import { z } from 'zod/v4'

const toolbarAppearanceValues = ['icon', 'subtle', 'chip'] as const
const toolbarShortcutValues = ['none', 'cmd-k', 'cmd-enter'] as const

export const toolbarComponentSchema = z
	.object({
		appearance: z.enum(toolbarAppearanceValues).default('icon'),
		compact: z.boolean().default(false),
		label: z.string().default('Search'),
		pressed: z.boolean().default(false),
		selected: z.boolean().default(false),
		shortcut: z.enum(toolbarShortcutValues).default('cmd-k')
	})
	.strict()

export type ToolbarInput = z.input<typeof toolbarComponentSchema>
export type ToolbarValue = z.output<typeof toolbarComponentSchema>
