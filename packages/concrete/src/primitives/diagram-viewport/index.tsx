import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { DiagramHeader, DiagramShell, DiagramStage, DiagramViewport } from './component'
import { diagramViewportExamples } from './examples'
import { diagramViewportMeta } from './meta'
import { type DiagramViewportValue, diagramViewportSchema } from './schema'

export type {
	DiagramDisplay,
	DiagramElementButtonProps,
	DiagramElementProps,
	DiagramFooterProps,
	DiagramHeaderProps,
	DiagramShellProps,
	DiagramStageProps,
	DiagramSvgProps,
	DiagramViewportProps
} from './component'
export {
	DiagramElement,
	DiagramElementButton,
	DiagramFooter,
	DiagramHeader,
	DiagramShell,
	DiagramStage,
	DiagramSvg,
	DiagramViewport
} from './component'
export type { DiagramViewportInput, DiagramViewportValue } from './schema'
export { diagramViewportPropsSchema, diagramViewportSchema } from './schema'

export const diagramViewportPrimitiveDefinition = createPrimitive({
	...diagramViewportMeta,
	component: DiagramShell,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(diagramViewportExamples, state),
	renderInput: input => renderDiagramViewportInput(diagramViewportSchema.parse(input)),
	schema: diagramViewportSchema,
	slug: 'diagram-viewport',
	states: exampleStates(diagramViewportExamples, ['default', 'canvas', 'flow'])
})

function renderDiagramViewportInput({ description, height, title, width }: DiagramViewportValue) {
	return (
		<DiagramShell>
			<DiagramHeader description={description} title={title} />
			<DiagramViewport>
				<DiagramStage height={height} transform="translate(0px, 0px) scale(1)" width={width} />
			</DiagramViewport>
		</DiagramShell>
	)
}
