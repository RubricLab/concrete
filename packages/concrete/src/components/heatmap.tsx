import type { ReactNode } from 'react'
import { booleanControl, numberControl, selectControl, textControl } from '../registry/controls'
import { defineConcreteComponent } from '../registry/definition'
import { prop, states } from '../registry/props'
import { type HeatmapProps, heatmapChartSchema } from '../schemas'
import { renderParsedChart } from './chart-rendering'
import { DataWideStage, heatmapCells } from './data-fixtures'

const chartSurfaceValues = ['raised', 'sunken', 'transparent'] as const

export const heatmapComponentSchema = heatmapChartSchema.omit({ variant: true })

export const heatmapComponentDefinition = defineConcreteComponent({
	category: 'data',
	component: Heatmap,
	controls: [
		selectControl('fixture', 'Fixture', 'default', ['default', 'quiet', 'sunken']),
		textControl('title', 'Title', 'Run intensity'),
		numberControl('height', 'Height', '220'),
		booleanControl('showValues', 'Values', 'true'),
		selectControl('surface', 'Surface', 'raised', chartSurfaceValues)
	],
	description: 'Two-axis intensity grid for compact activity and density summaries.',
	guidance:
		'Heatmap should use one accent scale with restrained contrast. Use it when relative density matters more than exact values.',
	kind: 'component',
	name: 'Heatmap',
	pressure: ['product', 'educational', 'generative'],
	props: [
		prop('title', 'string', 'Chart title.', undefined, true),
		prop('description', 'string', 'Muted supporting copy.'),
		prop('cells', 'readonly HeatmapCell[]', 'Two-axis intensity cells.', '[]'),
		prop('showValues', 'boolean', 'Shows cell values.', 'true'),
		prop('state', "'ready' | 'loading' | 'empty' | 'error'", 'Async data state.', 'ready'),
		prop('height', 'number', 'Grid stage height.', '220'),
		prop('surface', "'raised' | 'sunken' | 'transparent'", 'Grid stage surface.', 'raised')
	],
	renderExample: renderHeatmapExample,
	schema: heatmapComponentSchema,
	slug: 'heatmap',
	states: states([
		['default', 'Labeled intensity grid with values.'],
		['quiet', 'Values hidden for denser overview cards.'],
		['sunken', 'Sunken plot surface for dashboard wells.']
	])
})

function renderHeatmapExample(state = 'default'): ReactNode {
	return (
		<DataWideStage>
			<Heatmap
				cells={heatmapCells}
				showValues={state !== 'quiet'}
				surface={state === 'sunken' ? 'sunken' : 'raised'}
				title="Run intensity"
			/>
		</DataWideStage>
	)
}

type ComponentShellProps = {
	className?: string
}

export function Heatmap({ className, ...props }: HeatmapProps & ComponentShellProps) {
	const parsedProps = heatmapChartSchema.parse({ ...props, variant: 'heatmap' })

	return renderParsedChart(parsedProps, className)
}
