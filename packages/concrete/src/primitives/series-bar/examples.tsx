import { defineExamples } from '../../factories/createExamples'
import { ChartBar, ChartBarComparison, ChartBarTrack, ChartStackSegment } from './component'

export const seriesBarExamples = defineExamples({
	default: {
		description: 'Bar series marks with track and comparison.',
		render: () => (
			<svg aria-hidden viewBox="0 0 160 80">
				<title>Bar series</title>
				<ChartBarTrack height="12" rx="6" width="128" x="16" y="18" />
				<ChartBarComparison height="12" rx="6" width="84" x="16" y="18" />
				<ChartBar height="12" rx="6" width="104" x="16" y="18" />
				<ChartStackSegment height="12" rx="6" width="42" x="16" y="48" />
				<ChartStackSegment height="12" rx="6" width="58" x="58" y="48" />
			</svg>
		)
	}
})
