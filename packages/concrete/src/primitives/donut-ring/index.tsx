import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { DonutCenter, DonutPlot, DonutSegment, DonutTrack } from './component'
import { donutRingExamples } from './examples'
import { donutRingMeta } from './meta'
import { type DonutRingValue, donutRingSchema } from './schema'

export type {
	DonutCenterProps,
	DonutPlotProps,
	DonutSvgCircleProps,
	DonutThickness
} from './component'
export { DonutCenter, DonutPlot, DonutSegment, DonutTrack } from './component'
export type { DonutRingInput, DonutRingValue } from './schema'
export { donutRingPropsSchema, donutRingSchema, donutThicknessValues } from './schema'

export const donutRingPrimitiveDefinition = createPrimitive({
	...donutRingMeta,
	component: DonutPlot,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(donutRingExamples, state),
	renderInput: input => renderDonutRingInput(donutRingSchema.parse(input)),
	schema: donutRingSchema,
	slug: 'donut-ring',
	states: exampleStates(donutRingExamples, ['default'])
})

function renderDonutRingInput({ label, thickness, value }: DonutRingValue) {
	return (
		<DonutPlot thickness={thickness}>
			<svg aria-hidden viewBox="0 0 120 120">
				<title>Donut ring</title>
				<DonutTrack cx="60" cy="60" r="42" />
				<DonutSegment cx="60" cy="60" pathLength="100" r="42" strokeDasharray="72 28" />
			</svg>
			<DonutCenter label={label} value={value} />
		</DonutPlot>
	)
}
