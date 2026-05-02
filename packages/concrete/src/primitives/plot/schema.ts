import { z } from 'zod/v4'

export const plotSchema = z
	.object({
		title: z.string().default('Chart'),
		viewBox: z.string().default('0 0 160 96')
	})
	.strict()

export { plotSchema as plotPropsSchema }
export type PlotInput = z.input<typeof plotSchema>
export type PlotValue = z.output<typeof plotSchema>
