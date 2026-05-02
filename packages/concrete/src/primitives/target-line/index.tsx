import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { ChartTarget } from './component'
import { targetLineExamples } from './examples'
import { targetLineMeta } from './meta'
import { type TargetLineValue, targetLineSchema } from './schema'

export type { TargetLineProps } from './component'
export { ChartTarget } from './component'
export type { TargetLineInput, TargetLineValue } from './schema'
export { targetLinePropsSchema, targetLineSchema } from './schema'

export const targetLinePrimitiveDefinition = createPrimitive({
	...targetLineMeta,
	component: ChartTarget,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(targetLineExamples, state),
	renderInput: input => renderTargetLineInput(targetLineSchema.parse(input)),
	schema: targetLineSchema,
	slug: 'target-line',
	states: exampleStates(targetLineExamples, ['default'])
})

function renderTargetLineInput({ label }: TargetLineValue) {
	return (
		<svg aria-hidden viewBox="0 0 160 96">
			<title>Target line</title>
			<ChartTarget>
				<line x1="16" x2="144" y1="40" y2="40" />
				<text textAnchor="end" x="140" y="32">
					{label}
				</text>
			</ChartTarget>
		</svg>
	)
}
