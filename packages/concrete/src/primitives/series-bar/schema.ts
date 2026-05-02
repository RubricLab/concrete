import { z } from 'zod/v4'

export const seriesBarSchema = z
	.object({
		comparison: z.boolean().default(true),
		stacked: z.boolean().default(false)
	})
	.strict()

export { seriesBarSchema as seriesBarPropsSchema }
export type SeriesBarInput = z.input<typeof seriesBarSchema>
export type SeriesBarValue = z.output<typeof seriesBarSchema>
