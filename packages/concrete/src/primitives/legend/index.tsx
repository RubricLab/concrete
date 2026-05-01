import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { Legend, LegendItem } from './component'
import { legendExamples } from './examples'
import { legendMeta } from './meta'
import { type LegendValue, legendSchema } from './schema'

export type { LegendItemProps, LegendProps } from './component'
export { Legend, LegendItem } from './component'
export type { LegendInput, LegendValue } from './schema'
export { legendIntentValues, legendItemSchema, legendPropsSchema, legendSchema } from './schema'

export const legendPrimitiveDefinition = createPrimitive({
	...legendMeta,
	component: Legend,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(legendExamples, state),
	renderInput: input => renderLegendInput(legendSchema.parse(input)),
	schema: legendSchema,
	slug: 'legend',
	states: exampleStates(legendExamples, ['default', 'plain'])
})

function renderLegendInput({ items }: LegendValue) {
	return (
		<Legend>
			{items.map(item => (
				<LegendItem
					key={`${item.label}-${item.value ?? 'none'}`}
					intent={item.intent}
					label={item.label}
					value={item.value}
				/>
			))}
		</Legend>
	)
}
