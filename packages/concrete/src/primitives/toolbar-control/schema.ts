import { z } from 'zod/v4'

export const toolbarControlAppearanceValues = ['icon', 'subtle', 'chip'] as const
export const toolbarControlShortcutValues = ['none', 'cmd-k', 'cmd-enter'] as const

export const toolbarControlSchema = z
	.object({
		appearance: z.enum(toolbarControlAppearanceValues).default('icon'),
		compact: z.boolean().default(false),
		label: z.string().default('Search'),
		pressed: z.boolean().default(false),
		selected: z.boolean().default(false),
		shortcut: z.enum(toolbarControlShortcutValues).default('cmd-k')
	})
	.strict()

export { toolbarControlSchema as toolbarControlPropsSchema }
export type ToolbarControlInput = z.input<typeof toolbarControlSchema>
export type ToolbarControlValue = z.output<typeof toolbarControlSchema>
