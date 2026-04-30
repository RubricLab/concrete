import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { ChartGrid, ChartPlotBackground } from './component'
import { chartGridExamples } from './examples'
import { chartGridMeta } from './meta'
import { type ChartGridValue, chartGridSchema } from './schema'

export type { ChartGridGroupProps, ChartPlotBackgroundProps } from './component'
export { ChartGrid, ChartPlotBackground } from './component'
export type { ChartGridInput, ChartGridValue } from './schema'
export { chartGridPropsSchema, chartGridSchema } from './schema'

export const chartGridPrimitiveDefinition = createPrimitive({
	...chartGridMeta,
	component: ChartGrid,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(chartGridExamples, state),
	renderInput: input => renderChartGridInput(chartGridSchema.parse(input)),
	schema: chartGridSchema,
	slug: 'chart-grid',
	states: exampleStates(chartGridExamples, ['default'])
})

function renderChartGridInput({ background, lines }: ChartGridValue) {
	return (
		<svg aria-hidden viewBox="0 0 160 96">
			<title>Chart grid</title>
			<ChartGrid>
				{background ? <ChartPlotBackground height="64" rx="8" width="128" x="16" y="12" /> : null}
				{Array.from({ length: lines }).map((_, lineIndex) => {
					const y = 28 + lineIndex * 18

					return <line key={y} x1="16" x2="144" y1={y} y2={y} />
				})}
			</ChartGrid>
		</svg>
	)
}
