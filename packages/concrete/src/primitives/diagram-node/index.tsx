import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { DiagramNode } from './component'
import { diagramNodeExamples } from './examples'
import { diagramNodeMeta } from './meta'
import { type DiagramNodeValue, diagramNodePrimitiveSchema } from './schema'

export type { DiagramNodeProps } from './component'
export { DiagramNode } from './component'
export type { DiagramNodeInput, DiagramNodeValue } from './schema'
export { diagramNodePrimitivePropsSchema, diagramNodePrimitiveSchema } from './schema'

export const diagramNodePrimitiveDefinition = createPrimitive({
	...diagramNodeMeta,
	component: DiagramNode,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(diagramNodeExamples, state),
	renderInput: input => renderDiagramNodeInput(diagramNodePrimitiveSchema.parse(input)),
	schema: diagramNodePrimitiveSchema,
	slug: 'diagram-node',
	states: exampleStates(diagramNodeExamples, ['default', 'selected', 'muted'])
})

function renderDiagramNodeInput({ meta, ...props }: DiagramNodeValue) {
	return <DiagramNode {...props} {...(meta ? { meta } : {})} />
}
