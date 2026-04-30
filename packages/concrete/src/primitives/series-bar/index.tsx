import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { ChartBar, ChartBarComparison, ChartBarTrack, ChartStackSegment } from './component'
import { seriesBarExamples } from './examples'
import { seriesBarMeta } from './meta'
import { type SeriesBarValue, seriesBarSchema } from './schema'

export type { ChartBarRectProps } from './component'
export { ChartBar, ChartBarComparison, ChartBarTrack, ChartStackSegment } from './component'
export type { SeriesBarInput, SeriesBarValue } from './schema'
export { seriesBarPropsSchema, seriesBarSchema } from './schema'

export const seriesBarPrimitiveDefinition = createPrimitive({
	...seriesBarMeta,
	component: ChartBar,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(seriesBarExamples, state),
	renderInput: input => renderSeriesBarInput(seriesBarSchema.parse(input)),
	schema: seriesBarSchema,
	slug: 'series-bar',
	states: exampleStates(seriesBarExamples, ['default'])
})

function renderSeriesBarInput({ comparison, stacked }: SeriesBarValue) {
	return (
		<svg aria-hidden viewBox="0 0 160 80">
			<title>Bar series</title>
			<ChartBarTrack height="12" rx="6" width="128" x="16" y="18" />
			{comparison ? <ChartBarComparison height="12" rx="6" width="84" x="16" y="18" /> : null}
			<ChartBar height="12" rx="6" width="104" x="16" y="18" />
			{stacked ? (
				<>
					<ChartStackSegment height="12" rx="6" width="42" x="16" y="48" />
					<ChartStackSegment height="12" rx="6" width="58" x="58" y="48" />
				</>
			) : null}
		</svg>
	)
}
