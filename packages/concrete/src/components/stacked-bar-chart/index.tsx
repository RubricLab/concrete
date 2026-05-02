import { exampleStates, renderExample } from '../../factories/createExamples'
import { createComponent } from '../../factories/createItems'
import { stackedChartGroups } from '../../utilities/data-fixtures'
import { StackedBarChart } from './component'
import { stackedBarChartExamples } from './examples'
import { stackedBarChartMeta } from './meta'
import { type StackedBarChartValue, stackedBarChartComponentSchema } from './schema'

export type { StackedBarChartProps } from '../../schemas'
export { StackedBarChart } from './component'
export type { StackedBarChartInput, StackedBarChartValue } from './schema'
export { stackedBarChartComponentSchema } from './schema'

export const stackedBarChartComponentDefinition = createComponent({
	...stackedBarChartMeta,
	component: StackedBarChart,
	kind: 'component',
	renderExample: (state?: string) => renderExample(stackedBarChartExamples, state),
	renderInput: input => renderStackedBarChartInput(stackedBarChartComponentSchema.parse(input)),
	schema: stackedBarChartComponentSchema,
	seed: stackedBarChartComponentSchema.parse({
		groups: stackedChartGroups,
		title: 'Run composition'
	}),
	slug: 'stacked-bar-chart',
	states: exampleStates(stackedBarChartExamples, [
		'default',
		'normalized',
		'horizontal',
		'compact',
		'loading',
		'empty',
		'error'
	])
})

function renderStackedBarChartInput(input: StackedBarChartValue) {
	return <StackedBarChart {...input} />
}
