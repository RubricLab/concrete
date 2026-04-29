import type { ReactNode } from 'react'
import { booleanControl, numberControl, selectControl, textControl } from '../registry/controls'
import { defineConcreteComponent } from '../registry/definition'
import { prop, states } from '../registry/props'
import { type DonutChartProps, donutChartSchema } from '../schemas'
import { renderParsedChart } from './chart-rendering'
import { chartPoints, DataWideStage } from './data-fixtures'

const donutThicknessValues = ['thin', 'medium', 'thick'] as const
const chartSurfaceValues = ['raised', 'sunken', 'transparent'] as const

export const donutChartComponentSchema = donutChartSchema.omit({ variant: true })

export const donutChartComponentDefinition = defineConcreteComponent({
	category: 'data',
	component: DonutChart,
	controls: [
		selectControl('fixture', 'Fixture', 'default', ['default', 'thin', 'thick', 'plain']),
		textControl('title', 'Title', 'Workload split'),
		textControl('centerLabel', 'Center', '64%'),
		numberControl('height', 'Height', '220'),
		selectControl('thickness', 'Thickness', 'medium', donutThicknessValues),
		booleanControl('showCenterLabel', 'Center label', 'true'),
		selectControl('surface', 'Surface', 'raised', chartSurfaceValues)
	],
	description: 'Part-to-whole ring summary with controlled center metric and thickness.',
	guidance:
		'Donut chart works best for a small number of stable segments. It should summarize, not explain an entire distribution.',
	kind: 'component',
	name: 'Donut chart',
	pressure: ['generative', 'product'],
	props: [
		prop('title', 'string', 'Chart title.', undefined, true),
		prop('description', 'string', 'Muted supporting copy.'),
		prop('segments', 'readonly DataPoint[]', 'Part-to-whole segments.', '[]'),
		prop('centerLabel', 'string', 'Optional center metric override.'),
		prop('showCenterLabel', 'boolean', 'Shows the center metric and leading segment label.', 'true'),
		prop('thickness', "'thin' | 'medium' | 'thick'", 'Ring stroke thickness.', 'medium'),
		prop('state', "'ready' | 'loading' | 'empty' | 'error'", 'Async data state.', 'ready'),
		prop('height', 'number', 'Plot stage height.', '220'),
		prop('legend', 'boolean', 'Shows derived legend indicators.', 'true'),
		prop('surface', "'raised' | 'sunken' | 'transparent'", 'Plot stage surface.', 'raised')
	],
	renderExample: renderDonutChartExample,
	schema: donutChartComponentSchema,
	slug: 'donut-chart',
	states: states([
		['default', 'Medium ring with center label.'],
		['thin', 'Thin ring for quiet summaries.'],
		['thick', 'Thick ring for primary scorecards.'],
		['plain', 'Ring without center label.']
	])
})

function renderDonutChartExample(state = 'default'): ReactNode {
	return (
		<DataWideStage>
			<DonutChart
				centerLabel="64%"
				segments={chartPoints.slice(0, 4)}
				showCenterLabel={state !== 'plain'}
				thickness={state === 'thin' ? 'thin' : state === 'thick' ? 'thick' : 'medium'}
				title="Workload split"
			/>
		</DataWideStage>
	)
}

type ComponentShellProps = {
	className?: string
}

export function DonutChart({ className, ...props }: DonutChartProps & ComponentShellProps) {
	const parsedProps = donutChartSchema.parse({ ...props, variant: 'donut' })

	return renderParsedChart(parsedProps, className)
}
