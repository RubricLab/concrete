import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { Indicator } from './component'
import { indicatorExamples } from './examples'
import { indicatorMeta } from './meta'
import { type IndicatorValue, indicatorSchema } from './schema'

export type { IndicatorIntent, IndicatorProps } from './component'
export { Indicator } from './component'
export type { IndicatorInput, IndicatorValue } from './schema'
export { indicatorIntentValues, indicatorPropsSchema, indicatorSchema } from './schema'

export const indicatorPrimitiveDefinition = createPrimitive({
	...indicatorMeta,
	component: Indicator,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(indicatorExamples, state),
	renderInput: input => renderIndicatorInput(indicatorSchema.parse(input)),
	schema: indicatorSchema,
	slug: 'indicator',
	states: exampleStates(indicatorExamples, ['default', 'muted'])
})

function renderIndicatorInput({ label, ...input }: IndicatorValue) {
	return <Indicator {...input}>{label}</Indicator>
}
