import { defineExamples } from '../../factories/createExamples'
import { ChartTarget } from './component'

export const targetLineExamples = defineExamples({
	default: {
		description: 'Target marker line and label group.',
		render: () => (
			<svg aria-hidden viewBox="0 0 160 96">
				<title>Target line</title>
				<ChartTarget>
					<line x1="16" x2="144" y1="40" y2="40" />
					<text textAnchor="end" x="140" y="32">
						target 80
					</text>
				</ChartTarget>
			</svg>
		)
	}
})
