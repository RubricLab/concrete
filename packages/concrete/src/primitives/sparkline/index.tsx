import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { Sparkline } from './component'
import { sparklineExamples } from './examples'
import { sparklineMeta } from './meta'
import { type SparklineValue, sparklineSchema } from './schema'

export type { SparklineProps, SparklineTone, SparklineVariant } from './component'
export { Sparkline } from './component'
export type { SparklineInput, SparklineValue } from './schema'
export { sparklinePropsSchema, sparklineSchema } from './schema'

export const sparklinePrimitiveDefinition = createPrimitive({
	...sparklineMeta,
	component: Sparkline,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(sparklineExamples, state),
	renderInput: input => renderSparklineInput(sparklineSchema.parse(input)),
	schema: sparklineSchema,
	slug: 'sparkline',
	states: exampleStates(sparklineExamples, [
		'default',
		'line',
		'area',
		'bar',
		'dot',
		'signals',
		'volatile'
	])
})

function renderSparklineInput(input: SparklineValue) {
	return <Sparkline {...input} />
}
