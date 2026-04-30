import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { DiagramCanvasShell, DiagramCanvasViewport } from '../diagram-viewport'
import { DiagramCanvasEdgePath, DiagramCanvasEdges } from './component'
import { diagramEdgeExamples } from './examples'
import { diagramEdgeMeta } from './meta'
import { type DiagramEdgeValue, diagramEdgeSchema } from './schema'

export type {
	DiagramCanvasEdgePathProps,
	DiagramCanvasEdgesProps,
	FlowDiagramEdgePathProps
} from './component'
export { DiagramCanvasEdgePath, DiagramCanvasEdges, FlowDiagramEdgePath } from './component'
export type { DiagramEdgeInput, DiagramEdgeValue } from './schema'
export { diagramEdgePropsSchema, diagramEdgeSchema, diagramEdgeVariantValues } from './schema'

export const diagramEdgePrimitiveDefinition = createPrimitive({
	...diagramEdgeMeta,
	component: DiagramCanvasEdgePath,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(diagramEdgeExamples, state),
	renderInput: input => renderDiagramEdgeInput(diagramEdgeSchema.parse(input)),
	schema: diagramEdgeSchema,
	slug: 'diagram-edge',
	states: exampleStates(diagramEdgeExamples, ['default', 'canvas', 'flow', 'variants'])
})

function renderDiagramEdgeInput({ label, selected, tone, variant }: DiagramEdgeValue) {
	return (
		<DiagramCanvasShell>
			<DiagramCanvasViewport>
				<DiagramCanvasEdges
					height={120}
					markerId="diagram-edge-input"
					reverseMarkerId="diagram-edge-input-reverse"
					width={260}
				>
					<DiagramCanvasEdgePath
						label={label}
						labelPoint={{ x: 130, y: 60 }}
						markerEnd="url(#diagram-edge-input)"
						path="M20 72 C80 72 180 48 240 48"
						selected={selected}
						tone={tone}
						variant={variant}
					/>
				</DiagramCanvasEdges>
			</DiagramCanvasViewport>
		</DiagramCanvasShell>
	)
}
