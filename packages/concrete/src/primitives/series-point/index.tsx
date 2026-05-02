import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { ChartEndpoint, ChartPoint } from './component'
import { seriesPointExamples } from './examples'
import { seriesPointMeta } from './meta'
import { type SeriesPointValue, seriesPointSchema } from './schema'

export type { SeriesPointCircleProps } from './component'
export { ChartEndpoint, ChartPoint } from './component'
export type { SeriesPointInput, SeriesPointValue } from './schema'
export { seriesPointPropsSchema, seriesPointSchema } from './schema'

export const seriesPointPrimitiveDefinition = createPrimitive({
	...seriesPointMeta,
	component: ChartPoint,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(seriesPointExamples, state),
	renderInput: input => renderSeriesPointInput(seriesPointSchema.parse(input)),
	schema: seriesPointSchema,
	slug: 'series-point',
	states: exampleStates(seriesPointExamples, ['default'])
})

function renderSeriesPointInput({ endpoint }: SeriesPointValue) {
	return (
		<svg aria-hidden viewBox="0 0 160 80">
			<title>Series point</title>
			<ChartPoint cx="42" cy="44" r="3" />
			<ChartPoint cx="82" cy="26" r="3" />
			{endpoint ? <ChartEndpoint cx="124" cy="18" r="3" /> : null}
		</svg>
	)
}
