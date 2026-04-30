import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { ChartAxis, ChartAxisLabel, ChartBaseline, ChartTickLabel } from './component'
import { axisExamples } from './examples'
import { axisMeta } from './meta'
import { type AxisValue, axisSchema } from './schema'

export type { ChartAxisLineProps, ChartAxisTextProps } from './component'
export {
	ChartAxis,
	ChartAxisLabel,
	ChartBaseline,
	ChartEndLabel,
	ChartRowLabel,
	ChartTickLabel,
	ChartValueLabel
} from './component'
export type { AxisInput, AxisValue } from './schema'
export { axisPropsSchema, axisSchema } from './schema'

export const axisPrimitiveDefinition = createPrimitive({
	...axisMeta,
	component: ChartAxis,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(axisExamples, state),
	renderInput: input => renderAxisInput(axisSchema.parse(input)),
	schema: axisSchema,
	slug: 'axis',
	states: exampleStates(axisExamples, ['default'])
})

function renderAxisInput({ baseline, labels }: AxisValue) {
	return (
		<svg aria-hidden viewBox="0 0 160 96">
			<title>Axis</title>
			<ChartAxis x1="16" x2="144" y1="76" y2="76" />
			{baseline ? <ChartBaseline x1="16" x2="144" y1="52" y2="52" /> : null}
			{labels ? (
				<>
					<ChartTickLabel textAnchor="end" x="12" y="55">
						50
					</ChartTickLabel>
					<ChartAxisLabel textAnchor="middle" x="80" y="92">
						Window
					</ChartAxisLabel>
				</>
			) : null}
		</svg>
	)
}
