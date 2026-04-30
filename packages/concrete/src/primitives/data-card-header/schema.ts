import { z } from 'zod/v4'

export const dataCardHeaderStateValues = ['empty', 'error', 'loading', 'ready'] as const

export const dataCardHeaderSchema = z
	.object({
		description: z.string().default('Accepted runs across production workspaces.'),
		state: z.enum(dataCardHeaderStateValues).default('ready'),
		title: z.string().default('Agent runs')
	})
	.strict()

export { dataCardHeaderSchema as dataCardHeaderPropsSchema }
export type DataCardHeaderInput = z.input<typeof dataCardHeaderSchema>
export type DataCardHeaderValue = z.output<typeof dataCardHeaderSchema>
