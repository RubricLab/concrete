import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { Progress } from '../progress'
import {
	MetricDescription,
	MetricHeader,
	MetricProgressRing,
	MetricShell,
	MetricSparkline
} from './component'
import { metricShellExamples } from './examples'
import { metricShellMeta } from './meta'
import { type MetricShellValue, metricShellSchema } from './schema'

export type {
	MetricDescriptionProps,
	MetricFooterProps,
	MetricHeaderProps,
	MetricProgressRingProps,
	MetricShellKind,
	MetricShellProps,
	MetricSparklineProps
} from './component'
export {
	MetricDescription,
	MetricFooter,
	MetricHeader,
	MetricProgressRing,
	MetricShell,
	MetricSparkline
} from './component'
export type { MetricShellInput, MetricShellValue } from './schema'
export { metricShellKindValues, metricShellPropsSchema, metricShellSchema } from './schema'

export const metricShellPrimitiveDefinition = createPrimitive({
	...metricShellMeta,
	component: MetricShell,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(metricShellExamples, state),
	renderInput: input => renderMetricShellInput(metricShellSchema.parse(input)),
	schema: metricShellSchema,
	slug: 'metric-shell',
	states: exampleStates(metricShellExamples, ['default', 'metric', 'compact', 'meter', 'ring'])
})

function renderMetricShellInput({ compact, description, kind, label, value }: MetricShellValue) {
	const ring = kind === 'meter-ring'
	const shellKind = kind === 'metric' ? 'metric' : 'meter'

	return (
		<MetricShell compact={compact} kind={shellKind} ring={ring}>
			<MetricHeader kind={shellKind} label={label} value={shellKind === 'meter' ? value : undefined} />
			{shellKind === 'meter' ? (
				ring ? (
					<MetricProgressRing compact={compact} tone="sky" value={72} />
				) : (
					<Progress size={compact ? 'thin' : 'medium'} tone="sky" value={72} />
				)
			) : (
				<MetricSparkline area showEndpoint={false} tone="sky" values={[42, 48, 53, 58, 64, 72]} />
			)}
			{description ? <MetricDescription>{description}</MetricDescription> : null}
		</MetricShell>
	)
}
