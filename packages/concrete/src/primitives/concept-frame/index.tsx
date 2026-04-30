import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { ConceptFrame } from './component'
import { conceptFrameExamples } from './examples'
import { conceptFrameMeta } from './meta'
import { type ConceptFrameValue, conceptFramePrimitiveSchema } from './schema'

export type { ConceptFrameProps, ConceptFrameSize } from './component'
export { ConceptFrame } from './component'
export type { ConceptFrameInput, ConceptFrameValue } from './schema'
export { conceptFramePrimitivePropsSchema, conceptFramePrimitiveSchema } from './schema'

export const conceptFramePrimitiveDefinition = createPrimitive({
	...conceptFrameMeta,
	component: ConceptFrame,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(conceptFrameExamples, state),
	renderInput: input => renderConceptFrameInput(conceptFramePrimitiveSchema.parse(input)),
	schema: conceptFramePrimitiveSchema,
	slug: 'concept-frame',
	states: exampleStates(conceptFrameExamples, ['default', 'selected', 'muted', 'sizes'])
})

function renderConceptFrameInput(input: ConceptFrameValue) {
	return <ConceptFrame {...input} />
}
