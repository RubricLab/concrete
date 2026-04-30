import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { DiagramLegend } from './component'
import { diagramLegendExamples } from './examples'
import { diagramLegendMeta } from './meta'
import { type DiagramLegendValue, diagramLegendSchema } from './schema'

export type { DiagramLegendItem, DiagramLegendKind, DiagramLegendProps } from './component'
export { DiagramLegend } from './component'
export type { DiagramLegendInput, DiagramLegendValue } from './schema'
export {
	diagramLegendItemSchema,
	diagramLegendKindValues,
	diagramLegendPropsSchema,
	diagramLegendSchema
} from './schema'

export const diagramLegendPrimitiveDefinition = createPrimitive({
	...diagramLegendMeta,
	component: DiagramLegend,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(diagramLegendExamples, state),
	renderInput: input => renderDiagramLegendInput(diagramLegendSchema.parse(input)),
	schema: diagramLegendSchema,
	slug: 'diagram-legend',
	states: exampleStates(diagramLegendExamples, ['default', 'custom'])
})

function renderDiagramLegendInput({ items }: DiagramLegendValue) {
	return <DiagramLegend items={items} />
}
