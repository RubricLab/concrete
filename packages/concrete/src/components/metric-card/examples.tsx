import type { ReactNode } from 'react'
import { defineExamples } from '../../factories/createExamples'
import { MetricCard } from './component'

const metricCardTrend = [42, 48, 45, 53, 58, 57, 64, 72, 76, 83]

export const metricCardExamples = defineExamples({
	compact: {
		description: 'Dense grid tile for dashboard rows.',
		render: () => renderMetricCardExample('compact')
	},
	default: {
		description: 'KPI tile with value, delta, and sparkline.',
		render: () => renderMetricCardExample()
	},
	status: {
		description: 'Metric with a terminal status indicator.',
		render: () => renderMetricCardExample('status')
	}
})

function renderMetricCardExample(state = 'default'): ReactNode {
	return (
		<>
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
				trend={metricCardTrend}
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
		</>
	)
}
