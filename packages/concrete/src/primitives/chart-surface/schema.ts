import { z } from 'zod/v4'

export const chartSurfaceKindValues = ['raised', 'sunken', 'transparent'] as const
export const chartSurfaceVariantValues = [
	'area',
	'bar',
	'donut',
	'heatmap',
	'line',
	'stacked-bar'
] as const
export const chartSurfaceStateValues = ['donut', 'heatmap', 'message', 'surface'] as const

export const chartSurfaceSchema = z
	.object({
		message: z.string().default('Loading data'),
		state: z.enum(chartSurfaceStateValues).default('surface'),
		surface: z.enum(chartSurfaceKindValues).default('raised'),
		variant: z.enum(chartSurfaceVariantValues).default('line')
	})
	.strict()

export { chartSurfaceSchema as chartSurfacePropsSchema }
export type ChartSurfaceInput = z.input<typeof chartSurfaceSchema>
export type ChartSurfaceValue = z.output<typeof chartSurfaceSchema>
