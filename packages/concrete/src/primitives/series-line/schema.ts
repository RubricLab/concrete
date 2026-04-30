import { z } from 'zod/v4'

export const seriesLineSchema = z
	.object({
		area: z.boolean().default(true)
	})
	.strict()

export { seriesLineSchema as seriesLinePropsSchema }
export type SeriesLineInput = z.input<typeof seriesLineSchema>
export type SeriesLineValue = z.output<typeof seriesLineSchema>
