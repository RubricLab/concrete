import { z } from 'zod/v4'

export const seriesPointSchema = z
	.object({
		endpoint: z.boolean().default(true)
	})
	.strict()

export { seriesPointSchema as seriesPointPropsSchema }
export type SeriesPointInput = z.input<typeof seriesPointSchema>
export type SeriesPointValue = z.output<typeof seriesPointSchema>
