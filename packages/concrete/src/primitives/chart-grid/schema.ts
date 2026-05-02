import { z } from 'zod/v4'

export const chartGridSchema = z
	.object({
		lines: z.number().int().min(0).max(4).default(3),
		showBackground: z.boolean().default(true)
	})
	.strict()

export { chartGridSchema as chartGridPropsSchema }
export type ChartGridInput = z.input<typeof chartGridSchema>
export type ChartGridValue = z.output<typeof chartGridSchema>
