import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { DiagramCanvasControls } from './component'
import { diagramControlsExamples } from './examples'
import { diagramControlsMeta } from './meta'
import { type DiagramControlsValue, diagramControlsSchema } from './schema'

export type {
	DiagramCanvasControlsProps,
	FlowDiagramControlButtonProps,
	FlowDiagramControlsProps
} from './component'
export { DiagramCanvasControls, FlowDiagramControlButton, FlowDiagramControls } from './component'
export type { DiagramControlsInput, DiagramControlsValue } from './schema'
export { diagramControlsPropsSchema, diagramControlsSchema } from './schema'

export const diagramControlsPrimitiveDefinition = createPrimitive({
	...diagramControlsMeta,
	component: DiagramCanvasControls,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(diagramControlsExamples, state),
	renderInput: input => renderDiagramControlsInput(diagramControlsSchema.parse(input)),
	schema: diagramControlsSchema,
	slug: 'diagram-controls',
	states: exampleStates(diagramControlsExamples, ['default', 'canvas', 'disabled', 'flow'])
})

function renderDiagramControlsInput({ disabled, zoom }: DiagramControlsValue) {
	return <DiagramCanvasControls disabled={disabled} zoom={zoom} />
}
