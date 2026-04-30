import { defineExamples } from '../../factories/createExamples'
import { Delta } from '../delta'
import { Indicator } from '../indicator'
import { Progress } from '../progress'
import { Stat } from '../stat'
import {
	MetricDescription,
	MetricFooter,
	MetricHeader,
	MetricProgressRing,
	MetricShell,
	MetricSparkline
} from './component'

export const metricShellExamples = defineExamples({
	compact: {
		description: 'Compact metric density for tight dashboard grids.',
		render: () => (
			<MetricShell compact>
				<MetricHeader end={<Indicator tone="sky">Review</Indicator>} label="Queue depth" />
				<Stat
					delta={<Delta basis="since 09:00" intent="negative" size="small" value="-2.4%" />}
					size="large"
					value="248"
					variant="lockup"
				/>
				<MetricSparkline showEndpoint={false} tone="sky" values={[34, 32, 28, 26, 24, 22]} />
				<MetricDescription>Open review items after agent triage.</MetricDescription>
			</MetricShell>
		)
	},
	default: {
		description: 'Metric card shell with status, stat lockup, sparkline, and caption.',
		render: () => renderMetricShellExample()
	},
	meter: {
		description: 'Meter card shell with header, progress, and footer.',
		render: () => (
			<MetricShell kind="meter">
				<MetricHeader kind="meter" label="Usage" value="72%" />
				<Progress tone="sky" value={72} />
				<MetricFooter end="Workspace command budget" start="Target 80" />
			</MetricShell>
		)
	},
	metric: {
		description: 'Metric card shell with neutral trend and explanatory copy.',
		render: () => (
			<MetricShell>
				<MetricHeader end={<Indicator tone="muted">Steady</Indicator>} label="Latency" />
				<Stat
					delta={<Delta basis="p95" size="small" value="0.0%" />}
					size="xlarge"
					unit="ms"
					value="184"
					variant="lockup"
				/>
				<MetricSparkline showEndpoint={false} tone="neutral" values={[20, 19, 20, 21, 20, 20]} />
				<MetricDescription>Median tool response across production runs.</MetricDescription>
			</MetricShell>
		)
	},
	ring: {
		description: 'Ring meter shell with scalar summary alignment.',
		render: () => (
			<MetricShell kind="meter" ring>
				<MetricHeader kind="meter" label="Review" value="58%" />
				<MetricProgressRing tone="ultra" value={58} />
				<MetricFooter end="Policy confidence" />
			</MetricShell>
		)
	}
})

function renderMetricShellExample() {
	return (
		<MetricShell>
			<MetricHeader end={<Indicator tone="terminal">Live</Indicator>} label="Agent runs" />
			<Stat
				delta={<Delta basis="vs last week" intent="positive" size="small" value="+18.6%" />}
				size="xlarge"
				value="14,842"
				variant="lockup"
			/>
			<MetricSparkline area showEndpoint={false} tone="terminal" values={[42, 48, 53, 58, 64, 72]} />
			<MetricDescription>Accepted agent runs across production workspaces.</MetricDescription>
		</MetricShell>
	)
}
