import { type AreaChartProps, areaChartSchema } from '../../schemas'
import { renderParsedChart } from '../../utilities/chart-rendering'

type ComponentShellProps = {
	className?: string
}

export function AreaChart({ className, ...props }: AreaChartProps & ComponentShellProps) {
	const parsedProps = areaChartSchema.parse({ ...props, variant: 'area' })

	return renderParsedChart(parsedProps, className)
}
