import type { ReactNode } from 'react'
import { defineExamples } from '../../factories/createExamples'
import { DataWideStage, heatmapCells } from '../../utilities/data-fixtures'
import { Heatmap } from './component'

export const heatmapExamples = defineExamples({
	default: {
		description: 'Labeled intensity grid with values.',
		render: () => renderHeatmapExample('default')
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
