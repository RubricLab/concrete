import { z } from 'zod/v4'

export const heatmapGridSchema = z
	.object({
		columnCount: z.number().int().positive().default(3),
		showValues: z.boolean().default(true)
	})
	.strict()

export { heatmapGridSchema as heatmapGridPropsSchema }
export type HeatmapGridInput = z.input<typeof heatmapGridSchema>
export type HeatmapGridValue = z.output<typeof heatmapGridSchema>
