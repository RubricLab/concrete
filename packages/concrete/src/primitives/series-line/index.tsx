import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { ChartArea, ChartLine } from './component'
import { seriesLineExamples } from './examples'
import { seriesLineMeta } from './meta'
import { type SeriesLineValue, seriesLineSchema } from './schema'

export type { ChartSvgPathProps } from './component'
export { ChartArea, ChartLine } from './component'
export type { SeriesLineInput, SeriesLineValue } from './schema'
export { seriesLinePropsSchema, seriesLineSchema } from './schema'

export const seriesLinePrimitiveDefinition = createPrimitive({
	...seriesLineMeta,
	component: ChartLine,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(seriesLineExamples, state),
	renderInput: input => renderSeriesLineInput(seriesLineSchema.parse(input)),
	schema: seriesLineSchema,
	slug: 'series-line',
	states: exampleStates(seriesLineExamples, ['default'])
})

function renderSeriesLineInput({ area }: SeriesLineValue) {
	return (
		<svg aria-hidden viewBox="0 0 160 80">
			<title>Line series</title>
			{area ? <ChartArea d="M12 58 C42 18 72 46 100 24 S138 34 148 16 L148 70 L12 70 Z" /> : null}
			<ChartLine d="M12 58 C42 18 72 46 100 24 S138 34 148 16" />
		</svg>
	)
}
