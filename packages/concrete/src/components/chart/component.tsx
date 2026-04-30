import { type ChartProps, chartSchema } from '../../schemas'
import { renderParsedChart } from '../../utilities/chart-rendering'

type ComponentShellProps = {
	className?: string
}

export function Chart({ className, ...props }: ChartProps & ComponentShellProps) {
	const parsedProps = chartSchema.parse(props)

	return renderParsedChart(parsedProps, className)
}
