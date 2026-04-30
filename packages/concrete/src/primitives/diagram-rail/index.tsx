import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { DiagramRail } from './component'
import { diagramRailExamples } from './examples'
import { diagramRailMeta } from './meta'
import { type DiagramRailValue, diagramRailSchema } from './schema'

export type { DiagramRailProps } from './component'
export { DiagramRail } from './component'
export type { DiagramRailInput, DiagramRailValue } from './schema'
export { diagramRailPropsSchema, diagramRailSchema } from './schema'

export const diagramRailPrimitiveDefinition = createPrimitive({
	...diagramRailMeta,
	component: DiagramRail,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(diagramRailExamples, state),
	renderInput: input => renderDiagramRailInput(diagramRailSchema.parse(input)),
	schema: diagramRailSchema,
	slug: 'diagram-rail',
	states: exampleStates(diagramRailExamples, ['default', 'active', 'tools'])
})

function renderDiagramRailInput({ activeIndex }: DiagramRailValue) {
	return <DiagramRail activeIndex={activeIndex} />
}
