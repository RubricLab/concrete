import { z } from 'zod/v4'

export const chartFrameSurfaceValues = ['raised', 'sunken', 'transparent'] as const
export const chartFrameKindValues = [
	'area',
	'bar',
	'donut',
	'heatmap',
	'line',
	'stacked-bar'
] as const
export const chartFrameStateValues = ['message', 'surface'] as const

export const chartFrameSchema = z
	.object({
		kind: z.enum(chartFrameKindValues).default('line'),
		message: z.string().default('Loading data'),
		state: z.enum(chartFrameStateValues).default('surface'),
		surface: z.enum(chartFrameSurfaceValues).default('raised')
	})
	.strict()

export { chartFrameSchema as chartFramePropsSchema }
export type ChartFrameInput = z.input<typeof chartFrameSchema>
export type ChartFrameValue = z.output<typeof chartFrameSchema>
