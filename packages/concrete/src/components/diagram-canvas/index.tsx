import { exampleStates, renderExample } from '../../factories/createExamples'
import { createComponent } from '../../factories/createItems'
import { diagramCanvasGraph } from '../../utilities/data-fixtures'
import { DiagramCanvas } from './component'
import { diagramCanvasExamples } from './examples'
import { diagramCanvasMeta } from './meta'
import { type DiagramCanvasValue, diagramCanvasComponentSchema } from './schema'

export type { DiagramCanvasProps } from '../../schemas'
export { DiagramCanvas } from './component'
export type { DiagramCanvasInput, DiagramCanvasValue } from './schema'
export { diagramCanvasComponentSchema } from './schema'

export const diagramCanvasComponentDefinition = createComponent({
	...diagramCanvasMeta,
	component: DiagramCanvas,
	kind: 'component',
	renderExample: (state?: string) => renderExample(diagramCanvasExamples, state),
	renderInput: input => renderDiagramCanvasInput(diagramCanvasComponentSchema.parse(input)),
	schema: diagramCanvasComponentSchema,
	seed: diagramCanvasComponentSchema.parse({
		description:
			'Editorial explainer graph for request routing, context, model synthesis, and streamed output.',
		graph: diagramCanvasGraph,
		title: 'Request flow',
		width: 820
	}),
	slug: 'diagram-canvas',
	states: exampleStates(diagramCanvasExamples, ['default', 'selected', 'interactive', 'compact'])
})

function renderDiagramCanvasInput(input: DiagramCanvasValue) {
	return <DiagramCanvas {...input} />
}
