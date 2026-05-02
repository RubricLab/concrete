import { defineExamples } from '../../factories/createExamples'
import { ChartEndpoint, ChartPoint } from './component'

export const seriesPointExamples = defineExamples({
	default: {
		description: 'Line chart points and emphasized endpoint.',
		render: () => (
			<svg aria-hidden viewBox="0 0 160 80">
				<title>Series points</title>
				<ChartPoint cx="42" cy="44" r="3" />
				<ChartPoint cx="82" cy="26" r="3" />
				<ChartEndpoint cx="124" cy="18" r="3" />
			</svg>
		)
	}
})
