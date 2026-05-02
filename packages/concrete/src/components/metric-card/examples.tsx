import type { ReactNode } from 'react'
import { defineExamples } from '../../factories/createExamples'
import { MetricCard } from './component'

const metricCardTrend = [42, 48, 45, 53, 58, 57, 64, 72, 76, 83]

export const metricCardExamples = defineExamples({
	compact: {
		description: 'Dense grid tile for dashboard rows.',
		render: () => renderMetricCardExample('compact')
	},
	critical: {
		description: 'Negative signal tile for blocked workflow metrics.',
		render: () => renderMetricCardExample('critical')
	},
	default: {
		description: 'KPI tile with value, delta, and sparkline.',
		render: () => renderMetricCardExample()
	},
	status: {
		description: 'Metric with a terminal status indicator.',
		render: () => renderMetricCardExample('status')
	},
	trendless: {
		description: 'Static KPI tile when trend data is unavailable.',
		render: () => renderMetricCardExample('trendless')
	}
})

function renderMetricCardExample(state = 'default'): ReactNode {
	if (state === 'critical') {
		return (
			<>
				<MetricCard
					delta={{ basis: 'blocked', intent: 'negative', value: '+12.4%' }}
					description="Runs held for policy review across production workspaces."
					label="Blocked runs"
					status={{ intent: 'error', label: 'Watch' }}
					trend={[18, 21, 25, 31, 34, 42, 48]}
					trendIntent="error"
					value="148"
				/>
				<MetricCard
					compact
					delta={{ basis: '24h', intent: 'negative', value: '+6' }}
					label="Escalations"
					status={{ intent: 'error', label: 'Hot' }}
					trend={[5, 6, 7, 7, 9, 10, 14]}
					trendIntent="error"
					value="14"
				/>
			</>
		)
	}

	return (
		<>
			<MetricCard
				compact={state === 'compact'}
				delta={{
					basis: 'vs last week',
					intent: state === 'status' || state === 'trendless' ? 'neutral' : 'positive',
					value: state === 'status' || state === 'trendless' ? '+0.8%' : '+18.6%'
				}}
				description={
					state === 'compact' ? undefined : 'Accepted agent runs across production workspaces.'
				}
				label={state === 'status' || state === 'trendless' ? 'Eval health' : 'Agent runs'}
				status={state === 'status' ? { intent: 'terminal', label: 'Live' } : undefined}
				trend={state === 'trendless' ? [] : metricCardTrend}
				value={state === 'compact' ? '14.8k' : '14,842'}
			/>
			<MetricCard
				compact={state === 'compact'}
				delta={{ basis: 'blocked', intent: 'negative', value: '-2.4%' }}
				label="Intervention rate"
				status={state === 'status' ? { intent: 'ultra', label: 'Watch' } : undefined}
				trend={state === 'trendless' ? [] : [48, 44, 41, 39, 35, 32, 29]}
				trendIntent="error"
				value="4.2%"
			/>
		</>
	)
}
