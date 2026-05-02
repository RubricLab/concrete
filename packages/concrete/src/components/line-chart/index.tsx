import { exampleStates, renderExample } from '../../factories/createExamples'
import { createComponent } from '../../factories/createItems'
import { chartSeries } from '../../utilities/data-fixtures'
import { LineChart } from './component'
import { lineChartExamples } from './examples'
import { lineChartMeta } from './meta'
import { type LineChartValue, lineChartComponentSchema } from './schema'

export type { LineChartProps } from '../../schemas'
export { LineChart } from './component'
export type { LineChartInput, LineChartValue } from './schema'
export { lineChartComponentSchema } from './schema'

export const lineChartComponentDefinition = createComponent({
	...lineChartMeta,
	component: LineChart,
	kind: 'component',
	renderExample: (state?: string) => renderExample(lineChartExamples, state),
	renderInput: input => renderLineChartInput(lineChartComponentSchema.parse(input)),
	schema: lineChartComponentSchema,
	seed: lineChartComponentSchema.parse({
		description: 'Agent run volume with accepted output overlay.',
		series: chartSeries,
		target: 58,
		title: 'Agent runs'
	}),
	slug: 'line-chart',
	states: exampleStates(lineChartExamples, [
		'default',
		'target',
		'inspect',
		'compact',
		'loading',
		'empty',
		'error'
	])
})

function renderLineChartInput(input: LineChartValue) {
	return <LineChart {...input} />
}
