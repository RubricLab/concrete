import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { DiagramControls } from './component'
import { diagramControlsExamples } from './examples'
import { diagramControlsMeta } from './meta'
import { type DiagramControlsValue, diagramControlsSchema } from './schema'

export type { DiagramControlsProps } from './component'
export { DiagramControls } from './component'
export type { DiagramControlsInput, DiagramControlsValue } from './schema'
export { diagramControlsPropsSchema, diagramControlsSchema } from './schema'

export const diagramControlsPrimitiveDefinition = createPrimitive({
	...diagramControlsMeta,
	component: DiagramControls,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(diagramControlsExamples, state),
	renderInput: input => renderDiagramControlsInput(diagramControlsSchema.parse(input)),
	schema: diagramControlsSchema,
	slug: 'diagram-controls',
	states: exampleStates(diagramControlsExamples, ['default', 'disabled', 'compact'])
})

function renderDiagramControlsInput({ disabled, zoom }: DiagramControlsValue) {
	return <DiagramControls disabled={disabled} zoom={zoom} />
}
