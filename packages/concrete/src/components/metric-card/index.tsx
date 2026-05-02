import { exampleStates, renderExample } from '../../factories/createExamples'
import { createComponent } from '../../factories/createItems'
import { MetricCard } from './component'
import { metricCardExamples } from './examples'
import { metricCardMeta } from './meta'
import { type MetricCardValue, metricCardSchema } from './schema'

export type { MetricCardProps } from './component'
export { MetricCard } from './component'
export type { MetricCardInput, MetricCardValue } from './schema'
export { metricCardSchema } from './schema'

export const metricCardComponentDefinition = createComponent({
	...metricCardMeta,
	component: MetricCard,
	kind: 'component',
	renderExample: (state?: string) => renderExample(metricCardExamples, state),
	renderInput: input => renderMetricCardInput(metricCardSchema.parse(input)),
	schema: metricCardSchema,
	seed: metricCardSchema.parse({
		delta: {
			basis: 'vs last week',
			intent: 'positive',
			value: '+18.6%'
		},
		description: 'Accepted agent runs across production workspaces.',
		label: 'Agent runs',
		trend: [42, 48, 45, 53, 58, 57, 64, 72, 76, 83],
		value: '14,842'
	}),
	slug: 'metric-card',
	states: exampleStates(metricCardExamples, [
		'default',
		'status',
		'compact',
		'critical',
		'trendless'
	])
})

function renderMetricCardInput(input: MetricCardValue) {
	return <MetricCard {...input} />
}
