import { exampleStates, renderExample } from '../../factories/createExamples'
import { createComponent } from '../../factories/createItems'
import { chartSeries } from '../../utilities/data-fixtures'
import { Chart } from './component'
import { chartExamples } from './examples'
import { chartMeta } from './meta'
import { type ChartValue, chartComponentSchema } from './schema'

export type { ChartProps } from '../../schemas'
export { Chart } from './component'
export type { ChartInput, ChartValue } from './schema'
export { chartComponentSchema } from './schema'

export const chartComponentDefinition = createComponent({
	...chartMeta,
	component: Chart,
	kind: 'component',
	renderExample: (state?: string) => renderExample(chartExamples, state),
	renderInput: input => renderChartInput(chartComponentSchema.parse(input)),
	schema: chartComponentSchema,
	seed: chartComponentSchema.parse({
		description: 'Agent run volume with accepted output overlay.',
		kind: 'line',
		series: chartSeries,
		target: 58,
		title: 'Agent runs'
	}),
	slug: 'chart',
	states: exampleStates(chartExamples, [
		'default',
		'line',
		'area',
		'bar',
		'stacked',
		'donut',
		'heatmap',
		'loading',
		'empty',
		'error'
	])
})

function renderChartInput(input: ChartValue) {
	return <Chart {...input} />
}
