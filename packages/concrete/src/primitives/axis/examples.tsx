import { defineExamples } from '../../factories/createExamples'
import { ChartAxis, ChartAxisLabel, ChartBaseline, ChartTickLabel } from './component'

export const axisExamples = defineExamples({
	default: {
		description: 'Chart axis line, baseline, and labels.',
		render: () => (
			<svg aria-hidden viewBox="0 0 160 96">
				<title>Axis</title>
				<ChartAxis x1="16" x2="144" y1="76" y2="76" />
				<ChartBaseline x1="16" x2="144" y1="52" y2="52" />
				<ChartTickLabel textAnchor="end" x="12" y="55">
					50
				</ChartTickLabel>
				<ChartAxisLabel textAnchor="middle" x="80" y="92">
					Window
				</ChartAxisLabel>
			</svg>
		)
	}
})
