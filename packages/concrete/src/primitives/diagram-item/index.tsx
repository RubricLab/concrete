import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { DiagramItem } from './component'
import { diagramItemExamples } from './examples'
import { diagramItemMeta } from './meta'
import { type DiagramItemValue, diagramItemPrimitiveSchema } from './schema'

export type { DiagramItemProps } from './component'
export { DiagramItem } from './component'
export type { DiagramItemInput, DiagramItemValue } from './schema'
export { diagramItemPrimitivePropsSchema, diagramItemPrimitiveSchema } from './schema'

export const diagramItemPrimitiveDefinition = createPrimitive({
	...diagramItemMeta,
	component: DiagramItem,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(diagramItemExamples, state),
	renderInput: input => renderDiagramItemInput(diagramItemPrimitiveSchema.parse(input)),
	schema: diagramItemPrimitiveSchema,
	slug: 'diagram-item',
	states: exampleStates(diagramItemExamples, ['default', 'selected', 'tones'])
})

function renderDiagramItemInput({ meta, value, ...props }: DiagramItemValue) {
	return <DiagramItem {...props} {...(meta ? { meta } : {})} {...(value ? { value } : {})} />
}
