import type { ReactNode } from 'react'
import { booleanControl, numberControl, selectControl, textControl } from '../registry/controls'
import { defineConcreteComponent } from '../registry/definition'
import { prop, states } from '../registry/props'
import { type LineChartProps, lineChartSchema } from '../schemas'
import { renderParsedChart } from './chart-rendering'
import { chartSeries, DataWideStage } from './data-fixtures'

const chartSurfaceValues = ['raised', 'sunken', 'transparent'] as const

export const lineChartComponentSchema = lineChartSchema.omit({ variant: true })

export const lineChartComponentDefinition = defineConcreteComponent({
	category: 'data',
	component: LineChart,
	controls: [
		selectControl('fixture', 'Fixture', 'default', [
			'default',
			'target',
			'inspect',
			'loading',
			'empty',
			'error'
		]),
		textControl('title', 'Title', 'Agent runs'),
		numberControl('height', 'Height', '220'),
		booleanControl('showDots', 'Dots', 'false'),
		selectControl('surface', 'Surface', 'raised', chartSurfaceValues)
	],
	description: 'Multi-series trend chart with Concrete grid, endpoint, target, and legend language.',
	guidance:
		'Line chart is the default trend primitive for product summaries. Use dots only for inspection states; let the line and endpoint carry the hierarchy.',
	kind: 'component',
	name: 'Line chart',
	pressure: ['product', 'generative'],
	props: [
		prop('title', 'string', 'Chart title.', undefined, true),
		prop('description', 'string', 'Muted supporting copy.'),
		prop('series', 'readonly DataSeries[]', 'One or more typed data series.', '[]'),
		prop('target', 'number', 'Optional horizontal reference line.'),
		prop('state', "'ready' | 'loading' | 'empty' | 'error'", 'Async data state.', 'ready'),
		prop('message', 'string', 'Optional async state message override.'),
		prop('showDots', 'boolean', 'Shows every point marker for inspection states.', 'false'),
		prop('showEndLabels', 'boolean', 'Labels each series endpoint.', 'true'),
		prop('showGrid', 'boolean', 'Shows horizontal grid rules.', 'true'),
		prop('showXAxis', 'boolean', 'Shows sparse x-axis labels.', 'true'),
		prop('showYAxis', 'boolean', 'Shows y-axis tick labels.', 'true'),
		prop('height', 'number', 'SVG plot height.', '220'),
		prop('legend', 'boolean', 'Shows derived legend indicators.', 'true'),
		prop('surface', "'raised' | 'sunken' | 'transparent'", 'Plot stage surface.', 'raised')
	],
	renderExample: renderLineChartExample,
	schema: lineChartComponentSchema,
	slug: 'line-chart',
	states: states([
		['default', 'Multi-series line chart with endpoint labels.'],
		['target', 'Trend with a horizontal reference target.'],
		['inspect', 'Point markers enabled for inspection.'],
		['loading', 'Stable loading state.'],
		['empty', 'No-data state.'],
		['error', 'Failed data state.']
	])
})

function renderLineChartExample(state = 'default'): ReactNode {
	if (state === 'loading' || state === 'empty' || state === 'error') {
		return (
			<DataWideStage>
				<LineChart
					height={220}
					message={state === 'error' ? 'Could not load the run summary.' : undefined}
					series={[]}
					state={state}
					title="Agent runs"
				/>
			</DataWideStage>
		)
	}

	return (
		<DataWideStage>
			<LineChart
				description="Agent run volume with accepted output overlay."
				series={chartSeries}
				showDots={state === 'inspect'}
				target={state === 'target' ? 58 : undefined}
				title="Agent runs"
			/>
		</DataWideStage>
	)
}

type ComponentShellProps = {
	className?: string
}

export function LineChart({ className, ...props }: LineChartProps & ComponentShellProps) {
	const parsedProps = lineChartSchema.parse({ ...props, variant: 'line' })

	return renderParsedChart(parsedProps, className)
}
