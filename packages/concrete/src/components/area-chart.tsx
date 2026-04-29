import type { ReactNode } from 'react'
import { booleanControl, numberControl, selectControl, textControl } from '../registry/controls'
import { defineConcreteComponent } from '../registry/definition'
import { prop, states } from '../registry/props'
import { type AreaChartProps, areaChartSchema } from '../schemas'
import { renderParsedChart } from './chart-rendering'
import { chartSeries, DataWideStage } from './data-fixtures'

const chartSurfaceValues = ['raised', 'sunken', 'transparent'] as const

export const areaChartComponentSchema = areaChartSchema.omit({ variant: true })

export const areaChartComponentDefinition = defineConcreteComponent({
	category: 'data',
	component: AreaChart,
	controls: [
		selectControl('fixture', 'Fixture', 'default', ['default', 'quiet', 'dots']),
		textControl('title', 'Title', 'Execution trend'),
		numberControl('height', 'Height', '220'),
		booleanControl('showDots', 'Dots', 'false'),
		selectControl('surface', 'Surface', 'raised', chartSurfaceValues)
	],
	description: 'Soft filled trend chart for volume, confidence, and generated UI previews.',
	guidance:
		'Area chart should stay light. It is useful when the signal is cumulative or atmospheric, not when exact comparison is the main task.',
	kind: 'component',
	name: 'Area chart',
	pressure: ['generative', 'product'],
	props: [
		prop('title', 'string', 'Chart title.', undefined, true),
		prop('description', 'string', 'Muted supporting copy.'),
		prop('series', 'readonly DataSeries[]', 'One or more typed data series.', '[]'),
		prop('target', 'number', 'Optional horizontal reference line.'),
		prop('state', "'ready' | 'loading' | 'empty' | 'error'", 'Async data state.', 'ready'),
		prop('showDots', 'boolean', 'Shows every point marker for inspection states.', 'false'),
		prop('showEndLabels', 'boolean', 'Labels each series endpoint.', 'true'),
		prop('showGrid', 'boolean', 'Shows horizontal grid rules.', 'true'),
		prop('showXAxis', 'boolean', 'Shows sparse x-axis labels.', 'true'),
		prop('showYAxis', 'boolean', 'Shows y-axis tick labels.', 'true'),
		prop('stacked', 'boolean', 'Reserved for stacked area compositions.', 'false'),
		prop('height', 'number', 'SVG plot height.', '220'),
		prop('legend', 'boolean', 'Shows derived legend indicators.', 'true'),
		prop('surface', "'raised' | 'sunken' | 'transparent'", 'Plot stage surface.', 'raised')
	],
	renderExample: renderAreaChartExample,
	schema: areaChartComponentSchema,
	slug: 'area-chart',
	states: states([
		['default', 'Soft area chart with endpoint labels.'],
		['quiet', 'Transparent surface and hidden axes for compact generated UI.'],
		['dots', 'Inspection state with point markers.']
	])
})

function renderAreaChartExample(state = 'default'): ReactNode {
	return (
		<DataWideStage>
			<AreaChart
				description={state === 'quiet' ? undefined : 'Accepted runs and total executions.'}
				series={chartSeries}
				showDots={state === 'dots'}
				showEndLabels={state !== 'quiet'}
				showGrid={state !== 'quiet'}
				showXAxis={state !== 'quiet'}
				showYAxis={state !== 'quiet'}
				surface={state === 'quiet' ? 'transparent' : 'raised'}
				target={state === 'quiet' ? undefined : 58}
				title="Execution trend"
			/>
		</DataWideStage>
	)
}

type ComponentShellProps = {
	className?: string
}

export function AreaChart({ className, ...props }: AreaChartProps & ComponentShellProps) {
	const parsedProps = areaChartSchema.parse({ ...props, variant: 'area' })

	return renderParsedChart(parsedProps, className)
}
