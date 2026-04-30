import { type BarChartProps, barChartSchema } from '../../schemas'
import { renderParsedChart } from '../../utilities/chart-rendering'

type ComponentShellProps = {
	className?: string
}

export function BarChart({ className, ...props }: BarChartProps & ComponentShellProps) {
	const parsedProps = barChartSchema.parse({ ...props, variant: 'bar' })

	return renderParsedChart(parsedProps, className)
}
