import { defineExamples } from '../../factories/createExamples'
import { Sparkline } from './component'

export const sparklineExamples = defineExamples({
	area: {
		description: 'Line with soft area and endpoint.',
		render: () => (
			<>
				<Sparkline area values={[12, 18, 16, 24, 22, 31, 28, 36]} />
				<Sparkline area tone="terminal" values={[6, 10, 8, 14, 21, 18, 24]} />
				<Sparkline area tone="neutral" values={[14, 13, 15, 14, 13, 15, 14]} />
			</>
		)
	},
	bar: {
		description: 'Bar density.',
		render: () => (
			<>
				<Sparkline values={[6, 10, 8, 14, 21, 18, 24]} variant="bar" />
				<Sparkline tone="neutral" values={[24, 18, 21, 14, 8, 10, 6]} variant="bar" />
			</>
		)
	},
	default: {
		description: 'Compact generated trend variants.',
		render: () => (
			<>
				<Sparkline area showEndpoint={false} values={[12, 18, 16, 24, 22, 31, 28, 36]} />
				<Sparkline tone="terminal" values={[6, 10, 8, 14, 21, 18, 24]} variant="bar" />
				<Sparkline tone="neutral" values={[14, 13, 15, 14, 13, 15, 14]} variant="dot" />
			</>
		)
	},
	dot: {
		description: 'Dot distribution.',
		render: () => (
			<>
				<Sparkline values={[8, 12, 18, 16, 22, 24, 28]} variant="dot" />
				<Sparkline tone="neutral" values={[28, 24, 22, 18, 16, 12, 8]} variant="dot" />
			</>
		)
	},
	line: {
		description: 'Line trend.',
		render: () => renderLineSparkline()
	},
	signals: {
		description: 'Sparkline tone variants for data cards.',
		render: () => (
			<>
				<Sparkline tone="sky" values={[12, 18, 16, 24, 22, 31, 28, 36]} />
				<Sparkline tone="terminal" values={[6, 10, 8, 14, 21, 18, 24]} />
				<Sparkline tone="error" values={[14, 5, 28, 9, 32, 11, 26, 7, 22]} />
				<Sparkline tone="neutral" values={[20, 19, 20, 21, 20, 20]} />
			</>
		)
	},
	volatile: {
		description: 'High variance trend.',
		render: () => (
			<>
				<Sparkline tone="error" values={[14, 5, 28, 9, 32, 11, 26, 7, 22]} />
			</>
		)
	}
})

function renderLineSparkline() {
	return (
		<>
			<Sparkline values={[12, 18, 16, 24, 22, 31, 28, 36]} />
			<Sparkline values={[6, 10, 8, 14, 21, 18, 24]} variant="bar" />
		</>
	)
}
