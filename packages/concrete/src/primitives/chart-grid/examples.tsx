import { defineExamples } from '../../factories/createExamples'
import { ChartGrid, ChartPlotBackground } from './component'

export const chartGridExamples = defineExamples({
	default: {
		description: 'Chart plot background and gridline group.',
		render: () => (
			<svg aria-hidden viewBox="0 0 160 96">
				<title>Chart grid</title>
				<ChartGrid>
					<ChartPlotBackground height="64" rx="8" width="128" x="16" y="12" />
					<line x1="16" x2="144" y1="28" y2="28" />
					<line x1="16" x2="144" y1="52" y2="52" />
					<line x1="16" x2="144" y1="76" y2="76" />
				</ChartGrid>
			</svg>
		)
	}
})
