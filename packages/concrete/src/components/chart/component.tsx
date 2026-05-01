import { ChartFrame, DataSurface, Indicator, Legend, LegendItem } from '../../primitives'
import { type ChartProps, chartSchema } from '../../schemas'
import { getChartLegendItems, getChartStateIntent } from '../../utilities/chart-core-rendering'
import { renderChartBody } from '../../utilities/chart-rendering'
import { toIndicatorIntent } from '../../utilities/data-intent'

type ComponentShellProps = {
	className?: string
}

export function Chart({ className, ...props }: ChartProps & ComponentShellProps) {
	const parsedProps = chartSchema.parse(props)
	const legendItems = getChartLegendItems(parsedProps)

	return (
		<DataSurface
			actions={
				parsedProps.showHeader ? (
					<Indicator intent={getChartStateIntent(parsedProps.state)}>{parsedProps.state}</Indicator>
				) : undefined
			}
			className={className}
			description={parsedProps.showHeader ? parsedProps.description : undefined}
			purpose="chart"
			title={parsedProps.showHeader ? parsedProps.title : undefined}
		>
			<ChartFrame height={parsedProps.height} surface={parsedProps.surface} kind={parsedProps.kind}>
				{renderChartBody(parsedProps)}
			</ChartFrame>
			{parsedProps.legend && legendItems.length > 0 ? (
				<Legend>
					{legendItems.map(item => (
						<LegendItem
							key={item.label}
							label={item.label}
							intent={toIndicatorIntent(item.intent)}
							value={item.value}
						/>
					))}
				</Legend>
			) : null}
		</DataSurface>
	)
}
