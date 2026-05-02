import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { DiagramShell, DiagramViewport } from '../diagram-viewport'
import { DiagramEdgePath, DiagramEdges } from './component'
import { diagramEdgeExamples } from './examples'
import { diagramEdgeMeta } from './meta'
import { type DiagramEdgeValue, diagramEdgeSchema } from './schema'

export type { DiagramEdgeDisplay, DiagramEdgePathProps, DiagramEdgesProps } from './component'
export { DiagramEdgePath, DiagramEdges } from './component'
export type { DiagramEdgeInput, DiagramEdgeValue } from './schema'
export { diagramEdgePropsSchema, diagramEdgeRelationValues, diagramEdgeSchema } from './schema'

export const diagramEdgePrimitiveDefinition = createPrimitive({
	...diagramEdgeMeta,
	component: DiagramEdgePath,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(diagramEdgeExamples, state),
	renderInput: input => renderDiagramEdgeInput(diagramEdgeSchema.parse(input)),
	schema: diagramEdgeSchema,
	slug: 'diagram-edge',
	states: exampleStates(diagramEdgeExamples, ['default', 'canvas', 'flow', 'relations'])
})

function renderDiagramEdgeInput({ label, selected, intent, relation }: DiagramEdgeValue) {
	return (
		<DiagramShell>
			<DiagramViewport>
				<DiagramEdges
					height={120}
					markerId="diagram-edge-input"
					reverseMarkerId="diagram-edge-input-reverse"
					width={260}
				>
					<DiagramEdgePath
						label={label}
						labelPoint={{ x: 130, y: 60 }}
						markerEnd="url(#diagram-edge-input)"
						path="M20 72 C80 72 180 48 240 48"
						selected={selected}
						intent={intent}
						relation={relation}
					/>
				</DiagramEdges>
			</DiagramViewport>
		</DiagramShell>
	)
}
