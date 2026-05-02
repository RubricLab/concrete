import { exampleStates, renderExample } from '../../factories/createExamples'
import { createComponent } from '../../factories/createItems'
import { chartSeries } from '../../utilities/data-fixtures'
import { AreaChart } from './component'
import { areaChartExamples } from './examples'
import { areaChartMeta } from './meta'
import { type AreaChartValue, areaChartComponentSchema } from './schema'

export type { AreaChartProps } from '../../schemas'
export { AreaChart } from './component'
export type { AreaChartInput, AreaChartValue } from './schema'
export { areaChartComponentSchema } from './schema'

export const areaChartComponentDefinition = createComponent({
	...areaChartMeta,
	component: AreaChart,
	kind: 'component',
	renderExample: (state?: string) => renderExample(areaChartExamples, state),
	renderInput: input => renderAreaChartInput(areaChartComponentSchema.parse(input)),
	schema: areaChartComponentSchema,
	seed: areaChartComponentSchema.parse({
		description: 'Accepted runs and total executions.',
		series: chartSeries,
		target: 58,
		title: 'Execution trend'
	}),
	slug: 'area-chart',
	states: exampleStates(areaChartExamples, [
		'default',
		'quiet',
		'dots',
		'compact',
		'loading',
		'empty',
		'error'
	])
})

function renderAreaChartInput(input: AreaChartValue) {
	return <AreaChart {...input} />
}
