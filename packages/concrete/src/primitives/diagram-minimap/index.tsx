import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { DiagramMiniMap } from './component'
import { diagramMiniMapExamples } from './examples'
import { diagramMiniMapMeta } from './meta'
import { type DiagramMiniMapValue, diagramMiniMapSchema } from './schema'

export type { DiagramMiniMapNode, DiagramMiniMapProps } from './component'
export { DiagramMiniMap } from './component'
export type { DiagramMiniMapInput, DiagramMiniMapValue } from './schema'
export {
	diagramMiniMapNodeSchema,
	diagramMiniMapPropsSchema,
	diagramMiniMapSchema
} from './schema'

export const diagramMiniMapPrimitiveDefinition = createPrimitive({
	...diagramMiniMapMeta,
	component: DiagramMiniMap,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(diagramMiniMapExamples, state),
	renderInput: input => renderDiagramMiniMapInput(diagramMiniMapSchema.parse(input)),
	schema: diagramMiniMapSchema,
	slug: 'diagram-minimap',
	states: exampleStates(diagramMiniMapExamples, ['default', 'selected'])
})

function renderDiagramMiniMapInput({ nodes, selectedId }: DiagramMiniMapValue) {
	return <DiagramMiniMap nodes={nodes} selectedId={selectedId} />
}
