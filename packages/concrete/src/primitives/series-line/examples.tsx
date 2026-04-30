import { defineExamples } from '../../factories/createExamples'
import { ChartArea, ChartLine } from './component'

export const seriesLineExamples = defineExamples({
	default: {
		description: 'Line and area series path marks.',
		render: () => (
			<svg aria-hidden viewBox="0 0 160 80">
				<title>Line series</title>
				<ChartArea d="M12 58 C42 18 72 46 100 24 S138 34 148 16 L148 70 L12 70 Z" />
				<ChartLine d="M12 58 C42 18 72 46 100 24 S138 34 148 16" />
			</svg>
		)
	}
})
