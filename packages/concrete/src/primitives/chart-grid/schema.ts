import { z } from 'zod/v4'

export const chartGridSchema = z
	.object({
		background: z.boolean().default(true),
		lines: z.number().int().min(0).max(4).default(3)
	})
	.strict()

export { chartGridSchema as chartGridPropsSchema }
export type ChartGridInput = z.input<typeof chartGridSchema>
export type ChartGridValue = z.output<typeof chartGridSchema>
