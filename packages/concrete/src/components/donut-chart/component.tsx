import { type DonutChartProps, donutChartSchema } from '../../schemas'
import { renderParsedChart } from '../../utilities/chart-rendering'

type ComponentShellProps = {
	className?: string
}

export function DonutChart({ className, ...props }: DonutChartProps & ComponentShellProps) {
	const parsedProps = donutChartSchema.parse({ ...props, variant: 'donut' })

	return renderParsedChart(parsedProps, className)
}
