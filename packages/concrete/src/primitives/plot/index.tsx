import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { ChartAxis } from '../axis'
import { ChartGrid } from '../chart-grid'
import { ChartTarget } from '../target-line'
import { ChartSvg } from './component'
import { plotExamples } from './examples'
import { plotMeta } from './meta'
import { type PlotValue, plotSchema } from './schema'

export type { ChartSvgProps } from './component'
export { ChartSvg } from './component'
export type { PlotInput, PlotValue } from './schema'
export { plotPropsSchema, plotSchema } from './schema'

export const plotPrimitiveDefinition = createPrimitive({
	...plotMeta,
	component: ChartSvg,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(plotExamples, state),
	renderInput: input => renderPlotInput(plotSchema.parse(input)),
	schema: plotSchema,
	slug: 'plot',
	states: exampleStates(plotExamples, ['default'])
})

function renderPlotInput({ title, viewBox }: PlotValue) {
	return (
		<ChartSvg title={title} viewBox={viewBox}>
			<ChartGrid>
				<ChartAxis x1="16" x2="144" y1="76" y2="76" />
			</ChartGrid>
			<ChartTarget>
				<line x1="104" x2="104" y1="12" y2="76" />
			</ChartTarget>
		</ChartSvg>
	)
}
