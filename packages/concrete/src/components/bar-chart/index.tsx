import { exampleStates, renderExample } from '../../factories/createExamples'
import { createComponent } from '../../factories/createItems'
import { chartPoints } from '../../utilities/data-fixtures'
import { BarChart } from './component'
import { barChartExamples } from './examples'
import { barChartMeta } from './meta'
import { type BarChartValue, barChartComponentSchema } from './schema'

export type { BarChartProps } from '../../schemas'
export { BarChart } from './component'
export type { BarChartInput, BarChartValue } from './schema'
export { barChartComponentSchema } from './schema'

export const barChartComponentDefinition = createComponent({
	...barChartMeta,
	component: BarChart,
	kind: 'component',
	renderExample: (state?: string) => renderExample(barChartExamples, state),
	renderInput: input => renderBarChartInput(barChartComponentSchema.parse(input)),
	schema: barChartComponentSchema,
	seed: barChartComponentSchema.parse({
		points: chartPoints,
		title: 'Capability score'
	}),
	slug: 'bar-chart',
	states: exampleStates(barChartExamples, [
		'default',
		'comparison',
		'horizontal',
		'quiet',
		'loading',
		'empty',
		'error'
	])
})

function renderBarChartInput(input: BarChartValue) {
	return <BarChart {...input} />
}
