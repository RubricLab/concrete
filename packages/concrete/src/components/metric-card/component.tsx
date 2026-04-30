import { DataSurface, Delta, Indicator, Sparkline, Stat } from '../../primitives'
import { Text } from '../../primitives/text'
import { type MetricCardProps, metricCardSchema } from '../../schemas'
import { getMetricTrendTone, toIndicatorTone, toSparklineTone } from '../../utilities/data-tone'

type ComponentShellProps = {
	className?: string
}

export function MetricCard({ className, ...props }: MetricCardProps & ComponentShellProps) {
	const parsedProps = metricCardSchema.parse(props)
	const trendTone = parsedProps.trendTone ?? getMetricTrendTone(parsedProps.delta?.intent)

	return (
		<DataSurface
			actions={
				parsedProps.status ? (
					<Indicator tone={toIndicatorTone(parsedProps.status.tone)}>
						{parsedProps.status.label}
					</Indicator>
				) : null
			}
			className={className}
			compact={parsedProps.compact}
			purpose="metric"
			title={parsedProps.label}
		>
			<Stat
				delta={
					parsedProps.delta ? (
						<Delta
							basis={parsedProps.delta.basis}
							intent={parsedProps.delta.intent}
							size="small"
							value={parsedProps.delta.value}
						/>
					) : undefined
				}
				size={parsedProps.compact ? 'large' : 'xlarge'}
				unit={parsedProps.unit}
				value={parsedProps.value}
				variant="lockup"
			/>
			{parsedProps.trend.length > 0 ? (
				<Sparkline
					area
					showEndpoint={false}
					tone={toSparklineTone(trendTone)}
					values={parsedProps.trend}
				/>
			) : null}
			{parsedProps.description ? (
				<Text as="p" purpose="caption" tone="muted">
					{parsedProps.description}
				</Text>
			) : null}
		</DataSurface>
	)
}

export type { MetricCardProps } from '../../schemas'
