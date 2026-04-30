import { Card, Delta, Indicator, Sparkline, Stat } from '../../primitives'
import { cn } from '../../primitives/utils'
import { type MetricCardProps, metricCardSchema } from '../../schemas'
import { concreteClassNames } from '../../styles/class-names'
import { getMetricTrendTone, toIndicatorTone, toSparklineTone } from '../../utilities/data-tone'

type ComponentShellProps = {
	className?: string
}

export function MetricCard({ className, ...props }: MetricCardProps & ComponentShellProps) {
	const parsedProps = metricCardSchema.parse(props)
	const trendTone = parsedProps.trendTone ?? getMetricTrendTone(parsedProps.delta?.intent)

	return (
		<Card
			className={cn(
				concreteClassNames.metricCard,
				parsedProps.compact && concreteClassNames.metricCardCompact,
				className
			)}
			variant="raised"
		>
			<div className={concreteClassNames.metricHeader}>
				<span className={concreteClassNames.metricLabel}>{parsedProps.label}</span>
				{parsedProps.status ? (
					<Indicator tone={toIndicatorTone(parsedProps.status.tone)}>
						{parsedProps.status.label}
					</Indicator>
				) : null}
			</div>
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
					className={concreteClassNames.metricSparkline}
					showEndpoint={false}
					tone={toSparklineTone(trendTone)}
					values={parsedProps.trend}
				/>
			) : null}
			{parsedProps.description ? (
				<p className={concreteClassNames.metricDescription}>{parsedProps.description}</p>
			) : null}
		</Card>
	)
}

export type { MetricCardProps } from '../../schemas'
