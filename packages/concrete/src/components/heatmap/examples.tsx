import type { ReactNode } from 'react'
import { defineExamples } from '../../factories/createExamples'
import { heatmapCells } from '../../utilities/data-fixtures'
import { Heatmap } from './component'

export const heatmapExamples = defineExamples({
	default: {
		description: 'Labeled intensity grid with values.',
		render: () => renderHeatmapExample('default')
	},
	empty: {
		description: 'No-data state inside the heatmap shell.',
		render: () => renderHeatmapExample('empty')
	},
	error: {
		description: 'Failed data state with an explicit message.',
		render: () => renderHeatmapExample('error')
	},
	loading: {
		description: 'Stable loading state for async generated output.',
		render: () => renderHeatmapExample('loading')
	},
	quiet: {
		description: 'Values hidden for denser overview cards.',
		render: () => renderHeatmapExample('quiet')
	},
	sunken: {
		description: 'Sunken plot surface for dashboard wells.',
		render: () => renderHeatmapExample('sunken')
	}
})

function renderHeatmapExample(state = 'default'): ReactNode {
	if (state === 'loading' || state === 'empty' || state === 'error') {
		return (
			<Heatmap
				cells={[]}
				message={state === 'error' ? 'Could not load run intensity.' : undefined}
				state={state}
				title="Run intensity"
			/>
		)
	}

	return (
		<Heatmap
			cells={heatmapCells}
			showValues={state !== 'quiet'}
			surface={state === 'sunken' ? 'sunken' : 'raised'}
			title="Run intensity"
		/>
	)
}
