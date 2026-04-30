import { exampleStates, renderExample } from '../../factories/createExamples'
import { createComponent } from '../../factories/createItems'
import { heatmapCells } from '../../utilities/data-fixtures'
import { Heatmap } from './component'
import { heatmapExamples } from './examples'
import { heatmapMeta } from './meta'
import { type HeatmapValue, heatmapComponentSchema } from './schema'

export type { HeatmapProps } from '../../schemas'
export { Heatmap } from './component'
export type { HeatmapInput, HeatmapValue } from './schema'
export { heatmapComponentSchema } from './schema'

export const heatmapComponentDefinition = createComponent({
	...heatmapMeta,
	component: Heatmap,
	kind: 'component',
	renderExample: (state?: string) => renderExample(heatmapExamples, state),
	renderInput: input => renderHeatmapInput(heatmapComponentSchema.parse(input)),
	schema: heatmapComponentSchema,
	seed: heatmapComponentSchema.parse({
		cells: heatmapCells,
		title: 'Run intensity'
	}),
	slug: 'heatmap',
	states: exampleStates(heatmapExamples, ['default', 'quiet', 'sunken'])
})

function renderHeatmapInput(input: HeatmapValue) {
	return <Heatmap {...input} />
}
