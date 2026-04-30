import { exampleStates, renderExample } from '../../factories/createExamples'
import { createComponent } from '../../factories/createItems'
import { chartPoints } from '../../utilities/data-fixtures'
import { DonutChart } from './component'
import { donutChartExamples } from './examples'
import { donutChartMeta } from './meta'
import { type DonutChartValue, donutChartComponentSchema } from './schema'

export type { DonutChartProps } from '../../schemas'
export { DonutChart } from './component'
export type { DonutChartInput, DonutChartValue } from './schema'
export { donutChartComponentSchema } from './schema'

export const donutChartComponentDefinition = createComponent({
	...donutChartMeta,
	component: DonutChart,
	kind: 'component',
	renderExample: (state?: string) => renderExample(donutChartExamples, state),
	renderInput: input => renderDonutChartInput(donutChartComponentSchema.parse(input)),
	schema: donutChartComponentSchema,
	seed: donutChartComponentSchema.parse({
		centerLabel: '64%',
		segments: chartPoints.slice(0, 4),
		title: 'Workload split'
	}),
	slug: 'donut-chart',
	states: exampleStates(donutChartExamples, [
		'default',
		'thin',
		'thick',
		'plain',
		'loading',
		'empty',
		'error'
	])
})

function renderDonutChartInput(input: DonutChartValue) {
	return <DonutChart {...input} />
}
