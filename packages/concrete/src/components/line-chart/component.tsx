import { type LineChartProps, lineChartSchema } from '../../schemas'
import { renderParsedChart } from '../../utilities/chart-rendering'

type ComponentShellProps = {
	className?: string
}

export function LineChart({ className, ...props }: LineChartProps & ComponentShellProps) {
	const parsedProps = lineChartSchema.parse({ ...props, variant: 'line' })

	return renderParsedChart(parsedProps, className)
}
