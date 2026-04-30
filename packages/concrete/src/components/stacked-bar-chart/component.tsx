import { type StackedBarChartProps, stackedBarChartSchema } from '../../schemas'
import { renderParsedChart } from '../../utilities/chart-rendering'

type ComponentShellProps = {
	className?: string
}

export function StackedBarChart({
	className,
	...props
}: StackedBarChartProps & ComponentShellProps) {
	const parsedProps = stackedBarChartSchema.parse({ ...props, variant: 'stacked-bar' })

	return renderParsedChart(parsedProps, className)
}
