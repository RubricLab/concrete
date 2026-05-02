import { defineExamples } from '../../factories/createExamples'
import { ChartAxis, ChartTickLabel } from '../axis'
import { ChartGrid, ChartPlotBackground } from '../chart-grid'
import { ChartTarget } from '../target-line'
import { ChartSvg } from './component'

export const plotExamples = defineExamples({
	default: {
		description: 'Plot root with grid, background, labels, and target line.',
		render: () => (
			<ChartSvg title="Plot" viewBox="0 0 160 96">
				<ChartGrid>
					<ChartPlotBackground height="64" rx="8" width="128" x="16" y="12" />
					<ChartAxis x1="16" x2="144" y1="76" y2="76" />
					<ChartTickLabel x="16" y="90">
						Mon
					</ChartTickLabel>
					<ChartTickLabel x="124" y="90">
						Fri
					</ChartTickLabel>
				</ChartGrid>
				<ChartTarget>
					<line x1="104" x2="104" y1="12" y2="76" />
				</ChartTarget>
			</ChartSvg>
		)
	}
})
