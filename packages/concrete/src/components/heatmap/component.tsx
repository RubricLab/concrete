import { type HeatmapProps, heatmapChartSchema } from '../../schemas'
import { renderParsedChart } from '../../utilities/chart-rendering'

type ComponentShellProps = {
	className?: string
}

export function Heatmap({ className, ...props }: HeatmapProps & ComponentShellProps) {
	const parsedProps = heatmapChartSchema.parse({ ...props, variant: 'heatmap' })

	return renderParsedChart(parsedProps, className)
}
