import { defineExamples } from '../../factories/createExamples'
import { Frame } from '../frame/component'
import { Sparkline } from './component'

export const sparklineExamples = defineExamples({
	area: {
		description: 'Line with soft area and endpoint.',
		render: () => (
			<Frame>
				<Sparkline area values={[12, 18, 16, 24, 22, 31, 28, 36]} />
				<Sparkline area tone="terminal" values={[6, 10, 8, 14, 21, 18, 24]} />
				<Sparkline area tone="neutral" values={[14, 13, 15, 14, 13, 15, 14]} />
			</Frame>
		)
	},
	bar: {
		description: 'Bar density.',
		render: () => (
			<Frame>
				<Sparkline values={[6, 10, 8, 14, 21, 18, 24]} variant="bar" />
				<Sparkline tone="neutral" values={[24, 18, 21, 14, 8, 10, 6]} variant="bar" />
			</Frame>
		)
	},
	dot: {
		description: 'Dot distribution.',
		render: () => (
			<Frame>
				<Sparkline values={[8, 12, 18, 16, 22, 24, 28]} variant="dot" />
				<Sparkline tone="neutral" values={[28, 24, 22, 18, 16, 12, 8]} variant="dot" />
			</Frame>
		)
	},
	line: {
		description: 'Line trend.',
		render: () => (
			<Frame>
				<Sparkline values={[12, 18, 16, 24, 22, 31, 28, 36]} />
				<Sparkline values={[6, 10, 8, 14, 21, 18, 24]} variant="bar" />
			</Frame>
		)
	},
	volatile: {
		description: 'High variance trend.',
		render: () => (
			<Frame>
				<Sparkline tone="error" values={[14, 5, 28, 9, 32, 11, 26, 7, 22]} />
			</Frame>
		)
	}
})
