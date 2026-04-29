import type { ReactNode } from 'react'
import { Card, Delta, Indicator, Sparkline, Stat } from '../primitives'
import { cn } from '../primitives/utils'
import { selectControl, textControl } from '../registry/controls'
import { defineConcreteComponent } from '../registry/definition'
import { prop, states } from '../registry/props'
import { type MetricCardProps, metricCardSchema } from '../schemas'
import { concreteClassNames } from '../styles/class-names'
import { getMetricTrendTone, toIndicatorTone, toSparklineTone } from './data-tone'

const metricTrend = [42, 48, 45, 53, 58, 57, 64, 72, 76, 83]

export const metricCardComponentDefinition = defineConcreteComponent({
	category: 'data',
	component: MetricCard,
	controls: [
		selectControl('fixture', 'Fixture', 'default', ['default', 'status', 'compact']),
		textControl('label', 'Label', 'Agent runs'),
		textControl('value', 'Value', '14,842'),
		textControl('delta', 'Delta', '+18.6%'),
		selectControl('intent', 'Intent', 'positive', ['positive', 'neutral', 'negative'])
	],
	description:
		'KPI tile composed from Stat, Delta, Sparkline, Indicator, and Concrete surface primitives.',
	guidance:
		'Metric card is for compact dashboard summaries. It accepts formatted values at the boundary and leaves business math to product code.',
	kind: 'component',
	name: 'Metric card',
	pressure: ['product', 'generative'],
	props: [
		prop('label', 'string', 'Metric label shown above the value.', undefined, true),
		prop('value', 'string', 'Formatted metric value.', undefined, true),
		prop('unit', 'string', 'Optional unit suffix beside the value.'),
		prop('delta', 'DataDelta', 'Optional terminal/error/neutral change indicator.'),
		prop('trend', 'readonly number[]', 'Optional inline sparkline values.', '[]'),
		prop('trendTone', 'DataTone', 'Overrides the sparkline tone derived from delta intent.'),
		prop('status', 'DataLegendItem', 'Small status indicator in the header.'),
		prop('compact', 'boolean', 'Tight metric card rhythm for dense dashboards.', 'false')
	],
	renderExample: renderMetricCardExample,
	schema: metricCardSchema,
	slug: 'metric-card',
	states: states([
		['default', 'KPI tile with value, delta, and sparkline.'],
		['status', 'Metric with a terminal status indicator.'],
		['compact', 'Dense grid tile for dashboard rows.']
	])
})

function renderMetricCardExample(state = 'default'): ReactNode {
	return (
		<DataGridStage>
			<MetricCard
				compact={state === 'compact'}
				delta={{
					basis: 'vs last week',
					intent: state === 'status' ? 'neutral' : 'positive',
					value: state === 'status' ? '+0.8%' : '+18.6%'
				}}
				description={
					state === 'compact' ? undefined : 'Accepted agent runs across production workspaces.'
				}
				label={state === 'status' ? 'Eval health' : 'Agent runs'}
				status={state === 'status' ? { label: 'Live', tone: 'terminal' } : undefined}
				trend={metricTrend}
				value={state === 'compact' ? '14.8k' : '14,842'}
			/>
			<MetricCard
				compact={state === 'compact'}
				delta={{ basis: 'blocked', intent: 'negative', value: '-2.4%' }}
				label="Intervention rate"
				status={state === 'status' ? { label: 'Watch', tone: 'ultra' } : undefined}
				trend={[48, 44, 41, 39, 35, 32, 29]}
				trendTone="error"
				value="4.2%"
			/>
		</DataGridStage>
	)
}

function DataGridStage({ children }: { children: ReactNode }) {
	return (
		<div
			style={{
				display: 'grid',
				gap: 12,
				gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
				maxWidth: 720,
				width: '100%'
			}}
		>
			{children}
		</div>
	)
}

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
