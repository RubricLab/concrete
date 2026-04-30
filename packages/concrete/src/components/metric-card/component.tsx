import {
	Delta,
	Indicator,
	MetricDescription,
	MetricHeader,
	MetricShell,
	MetricSparkline,
	Stat
} from '../../primitives'
import { type MetricCardProps, metricCardSchema } from '../../schemas'
import { getMetricTrendTone, toIndicatorTone, toSparklineTone } from '../../utilities/data-tone'

type ComponentShellProps = {
	className?: string
}

export function MetricCard({ className, ...props }: MetricCardProps & ComponentShellProps) {
	const parsedProps = metricCardSchema.parse(props)
	const trendTone = parsedProps.trendTone ?? getMetricTrendTone(parsedProps.delta?.intent)

	return (
		<MetricShell className={className} compact={parsedProps.compact}>
			<MetricHeader
				end={
					parsedProps.status ? (
						<Indicator tone={toIndicatorTone(parsedProps.status.tone)}>
							{parsedProps.status.label}
						</Indicator>
					) : null
				}
				label={parsedProps.label}
			/>
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
				<MetricSparkline
					area
					showEndpoint={false}
					tone={toSparklineTone(trendTone)}
					values={parsedProps.trend}
				/>
			) : null}
			{parsedProps.description ? (
				<MetricDescription>{parsedProps.description}</MetricDescription>
			) : null}
		</MetricShell>
	)
}

export type { MetricCardProps } from '../../schemas'
