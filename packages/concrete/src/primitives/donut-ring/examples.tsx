import { defineExamples } from '../../factories/createExamples'
import { DonutCenter, DonutPlot, DonutSegment, DonutTrack } from './component'

export const donutRingExamples = defineExamples({
	default: {
		description: 'Donut ring with track, segment, and center value.',
		render: () => (
			<DonutPlot>
				<svg aria-hidden viewBox="0 0 120 120">
					<title>Donut ring</title>
					<DonutTrack cx="60" cy="60" r="42" />
					<DonutSegment cx="60" cy="60" pathLength="100" r="42" strokeDasharray="72 28" />
				</svg>
				<DonutCenter label="accepted" value="72%" />
			</DonutPlot>
		)
	}
})
