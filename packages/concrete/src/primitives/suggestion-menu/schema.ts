import { z } from 'zod/v4'

export const suggestionMenuSchema = z
	.object({
		active: z.boolean().default(true),
		description: z.string().default('Insert reusable context.'),
		label: z.string().default('Workspace context'),
		meta: z.string().default('⌘1'),
		title: z.string().default('Mentions'),
		trigger: z.string().default('@')
	})
	.strict()

export { suggestionMenuSchema as suggestionMenuPropsSchema }
export type SuggestionMenuInput = z.input<typeof suggestionMenuSchema>
export type SuggestionMenuValue = z.output<typeof suggestionMenuSchema>
