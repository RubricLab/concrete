import type { ReactNode } from 'react'
import { booleanControl, numberControl, selectControl, textControl } from '../registry/controls'
import { defineConcreteComponent } from '../registry/definition'
import { prop, states } from '../registry/props'
import { type StackedBarChartProps, stackedBarChartSchema } from '../schemas'
import { renderParsedChart } from './chart-rendering'
import { DataWideStage, stackedChartGroups } from './data-fixtures'

const chartOrientationValues = ['vertical', 'horizontal'] as const

export const stackedBarChartComponentSchema = stackedBarChartSchema.omit({ variant: true })

export const stackedBarChartComponentDefinition = defineConcreteComponent({
	category: 'data',
	component: StackedBarChart,
	controls: [
		selectControl('fixture', 'Fixture', 'default', ['default', 'normalized', 'horizontal']),
		textControl('title', 'Title', 'Run composition'),
		numberControl('height', 'Height', '220'),
		selectControl('orientation', 'Orientation', 'vertical', chartOrientationValues),
		booleanControl('normalized', 'Normalized', 'false')
	],
	description: 'Composition chart for small category stacks across time or groups.',
	guidance:
		'Stacked bar chart is for composition, not precise comparison. Keep the segment count low and prefer normalized bars when the share is more important than total volume.',
	kind: 'component',
	name: 'Stacked bar chart',
	pressure: ['product', 'generative'],
	props: [
		prop('title', 'string', 'Chart title.', undefined, true),
		prop('description', 'string', 'Muted supporting copy.'),
		prop('groups', 'readonly StackedBarGroup[]', 'Stacked bar groups.', '[]'),
		prop('normalized', 'boolean', 'Normalizes each group to 100%.', 'false'),
		prop('orientation', "'vertical' | 'horizontal'", 'Column or rail layout.', 'vertical'),
		prop('state', "'ready' | 'loading' | 'empty' | 'error'", 'Async data state.', 'ready'),
		prop('showValues', 'boolean', 'Shows group total labels.', 'true'),
		prop('showGrid', 'boolean', 'Shows horizontal grid rules in vertical mode.', 'true'),
		prop('showXAxis', 'boolean', 'Shows axis labels in vertical mode.', 'true'),
		prop('showYAxis', 'boolean', 'Shows tick labels in vertical mode.', 'true'),
		prop('height', 'number', 'SVG plot height.', '220'),
		prop('legend', 'boolean', 'Shows derived legend indicators.', 'true')
	],
	renderExample: renderStackedBarChartExample,
	schema: stackedBarChartComponentSchema,
	slug: 'stacked-bar-chart',
	states: states([
		['default', 'Vertical stacked composition.'],
		['normalized', 'Normalized 100% composition.'],
		['horizontal', 'Rail layout for compact summaries.']
	])
})

function renderStackedBarChartExample(state = 'default'): ReactNode {
	return (
		<DataWideStage>
			<StackedBarChart
				groups={stackedChartGroups}
				normalized={state === 'normalized'}
				orientation={state === 'horizontal' ? 'horizontal' : 'vertical'}
				title="Run composition"
			/>
		</DataWideStage>
	)
}

type ComponentShellProps = {
	className?: string
}

export function StackedBarChart({
	className,
	...props
}: StackedBarChartProps & ComponentShellProps) {
	const parsedProps = stackedBarChartSchema.parse({ ...props, variant: 'stacked-bar' })

	return renderParsedChart(parsedProps, className)
}
