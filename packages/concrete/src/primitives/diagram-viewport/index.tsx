import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import {
	DiagramCanvasHeader,
	DiagramCanvasShell,
	DiagramCanvasStage,
	DiagramCanvasViewport
} from './component'
import { diagramViewportExamples } from './examples'
import { diagramViewportMeta } from './meta'
import { type DiagramViewportValue, diagramViewportSchema } from './schema'

export type {
	DiagramCanvasElementButtonProps,
	DiagramCanvasElementProps,
	DiagramCanvasFooterProps,
	DiagramCanvasHeaderProps,
	DiagramCanvasShellProps,
	DiagramCanvasStageProps,
	DiagramCanvasViewportProps,
	FlowDiagramShellProps,
	FlowDiagramSvgProps,
	FlowDiagramViewportProps
} from './component'
export {
	DiagramCanvasElement,
	DiagramCanvasElementButton,
	DiagramCanvasFooter,
	DiagramCanvasHeader,
	DiagramCanvasShell,
	DiagramCanvasStage,
	DiagramCanvasViewport,
	FlowDiagramShell,
	FlowDiagramSvg,
	FlowDiagramViewport
} from './component'
export type { DiagramViewportInput, DiagramViewportValue } from './schema'
export { diagramViewportPropsSchema, diagramViewportSchema } from './schema'

export const diagramViewportPrimitiveDefinition = createPrimitive({
	...diagramViewportMeta,
	component: DiagramCanvasShell,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(diagramViewportExamples, state),
	renderInput: input => renderDiagramViewportInput(diagramViewportSchema.parse(input)),
	schema: diagramViewportSchema,
	slug: 'diagram-viewport',
	states: exampleStates(diagramViewportExamples, ['default', 'canvas', 'flow'])
})

function renderDiagramViewportInput({ description, height, title, width }: DiagramViewportValue) {
	return (
		<DiagramCanvasShell>
			<DiagramCanvasHeader description={description} title={title} />
			<DiagramCanvasViewport>
				<DiagramCanvasStage height={height} transform="translate(0px, 0px) scale(1)" width={width} />
			</DiagramCanvasViewport>
		</DiagramCanvasShell>
	)
}
