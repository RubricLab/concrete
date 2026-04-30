import { z } from 'zod/v4'

export const composerRailSchema = z
	.object({
		attachmentLabel: z.string().default('research-brief.pdf'),
		attachments: z.boolean().default(true),
		command: z.boolean().default(true),
		commandLabel: z.string().default('Summarize'),
		mention: z.boolean().default(true),
		mentionLabel: z.string().default('Arihan V.')
	})
	.strict()

export { composerRailSchema as composerRailPropsSchema }
export type ComposerRailInput = z.input<typeof composerRailSchema>
export type ComposerRailValue = z.output<typeof composerRailSchema>
