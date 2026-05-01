import { DataSurface, Delta, Indicator, Sparkline, Stat } from '../../primitives'
import { Text } from '../../primitives/text'
import { type MetricCardProps, metricCardSchema } from '../../schemas'
import {
	getMetricTrendIntent,
	toIndicatorIntent,
	toSparklineIntent
} from '../../utilities/data-intent'

type ComponentShellProps = {
	className?: string
}

export function MetricCard({ className, ...props }: MetricCardProps & ComponentShellProps) {
	const parsedProps = metricCardSchema.parse(props)
	const trendIntent = parsedProps.trendIntent ?? getMetricTrendIntent(parsedProps.delta?.intent)

	return (
		<DataSurface
			actions={
				parsedProps.status ? (
					<Indicator intent={toIndicatorIntent(parsedProps.status.intent)}>
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
							density="compact"
							intent={parsedProps.delta.intent}
							value={parsedProps.delta.value}
						/>
					) : undefined
				}
				density={parsedProps.compact ? 'editorial' : 'display'}
				purpose="lockup"
				unit={parsedProps.unit}
				value={parsedProps.value}
			/>
			{parsedProps.trend.length > 0 ? (
				<Sparkline
					area
					showEndpoint={false}
					intent={toSparklineIntent(trendIntent)}
					values={parsedProps.trend}
				/>
			) : null}
			{parsedProps.description ? (
				<Text as="p" purpose="caption" intent="muted">
					{parsedProps.description}
				</Text>
			) : null}
		</DataSurface>
	)
}

export type { MetricCardProps } from '../../schemas'
