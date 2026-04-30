import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { ChartLegend, ChartLegendItem } from './component'
import { chartLegendExamples } from './examples'
import { chartLegendMeta } from './meta'
import { type ChartLegendValue, chartLegendSchema } from './schema'

export type { ChartLegendItemProps, ChartLegendProps } from './component'
export { ChartLegend, ChartLegendItem } from './component'
export type { ChartLegendInput, ChartLegendValue } from './schema'
export {
	chartLegendItemSchema,
	chartLegendPropsSchema,
	chartLegendSchema,
	chartLegendToneValues
} from './schema'

export const chartLegendPrimitiveDefinition = createPrimitive({
	...chartLegendMeta,
	component: ChartLegend,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(chartLegendExamples, state),
	renderInput: input => renderChartLegendInput(chartLegendSchema.parse(input)),
	schema: chartLegendSchema,
	slug: 'chart-legend',
	states: exampleStates(chartLegendExamples, ['default', 'plain'])
})

function renderChartLegendInput({ items }: ChartLegendValue) {
	return (
		<ChartLegend>
			{items.map(item => (
				<ChartLegendItem
					key={`${item.label}-${item.value ?? 'none'}`}
					label={item.label}
					tone={item.tone}
					value={item.value}
				/>
			))}
		</ChartLegend>
	)
}
