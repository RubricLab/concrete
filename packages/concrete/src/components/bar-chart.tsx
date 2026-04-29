import type { ReactNode } from 'react'
import { booleanControl, numberControl, selectControl, textControl } from '../registry/controls'
import { defineConcreteComponent } from '../registry/definition'
import { prop, states } from '../registry/props'
import { type BarChartProps, barChartSchema } from '../schemas'
import { renderParsedChart } from './chart-rendering'
import { chartComparisonPoints, chartPoints, DataWideStage } from './data-fixtures'

const chartOrientationValues = ['vertical', 'horizontal'] as const
const chartSurfaceValues = ['raised', 'sunken', 'transparent'] as const

export const barChartComponentSchema = barChartSchema.omit({ variant: true })

export const barChartComponentDefinition = defineConcreteComponent({
	category: 'data',
	component: BarChart,
	controls: [
		selectControl('fixture', 'Fixture', 'default', ['default', 'comparison', 'horizontal', 'quiet']),
		textControl('title', 'Title', 'Capability score'),
		numberControl('height', 'Height', '220'),
		selectControl('orientation', 'Orientation', 'vertical', chartOrientationValues),
		booleanControl('showValues', 'Values', 'true'),
		selectControl('surface', 'Surface', 'raised', chartSurfaceValues)
	],
	description: 'Categorical comparison chart with optional comparison bars and horizontal rails.',
	guidance:
		'Bar chart is for ranked or categorical values. Keep labels sparse and use comparison bars only when they answer a direct before/after question.',
	kind: 'component',
	name: 'Bar chart',
	pressure: ['product', 'generative'],
	props: [
		prop('title', 'string', 'Chart title.', undefined, true),
		prop('description', 'string', 'Muted supporting copy.'),
		prop('points', 'readonly DataPoint[]', 'Primary bar data.', '[]'),
		prop('comparisonPoints', 'readonly DataPoint[]', 'Muted comparison bars.', '[]'),
		prop('baseline', 'number', 'Value used as the zero rail for positive or negative bars.', '0'),
		prop('orientation', "'vertical' | 'horizontal'", 'Column or rail layout.', 'vertical'),
		prop('state', "'ready' | 'loading' | 'empty' | 'error'", 'Async data state.', 'ready'),
		prop('showValues', 'boolean', 'Shows value labels.', 'true'),
		prop('showGrid', 'boolean', 'Shows horizontal grid rules in vertical mode.', 'true'),
		prop('showXAxis', 'boolean', 'Shows axis labels in vertical mode.', 'true'),
		prop('showYAxis', 'boolean', 'Shows tick labels in vertical mode.', 'true'),
		prop('height', 'number', 'SVG plot height.', '220'),
		prop('legend', 'boolean', 'Shows derived legend indicators.', 'true'),
		prop('surface', "'raised' | 'sunken' | 'transparent'", 'Plot stage surface.', 'raised')
	],
	renderExample: renderBarChartExample,
	schema: barChartComponentSchema,
	slug: 'bar-chart',
	states: states([
		['default', 'Vertical bars with value labels.'],
		['comparison', 'Muted comparison bars behind the primary series.'],
		['horizontal', 'Horizontal rail layout for ranked lists.'],
		['quiet', 'No value labels for dense cards.']
	])
})

function renderBarChartExample(state = 'default'): ReactNode {
	return (
		<DataWideStage>
			<BarChart
				comparisonPoints={state === 'comparison' ? chartComparisonPoints : []}
				orientation={state === 'horizontal' ? 'horizontal' : 'vertical'}
				points={chartPoints}
				showValues={state !== 'quiet'}
				title="Capability score"
			/>
		</DataWideStage>
	)
}

type ComponentShellProps = {
	className?: string
}

export function BarChart({ className, ...props }: BarChartProps & ComponentShellProps) {
	const parsedProps = barChartSchema.parse({ ...props, variant: 'bar' })

	return renderParsedChart(parsedProps, className)
}
