import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { ConceptConnector } from './component'
import { conceptConnectorExamples } from './examples'
import { conceptConnectorMeta } from './meta'
import { type ConceptConnectorValue, conceptConnectorPrimitiveSchema } from './schema'

export type { ConceptConnectorProps } from './component'
export { ConceptConnector } from './component'
export type { ConceptConnectorInput, ConceptConnectorValue } from './schema'
export {
	conceptConnectorPrimitivePropsSchema,
	conceptConnectorPrimitiveSchema
} from './schema'

export const conceptConnectorPrimitiveDefinition = createPrimitive({
	...conceptConnectorMeta,
	component: ConceptConnector,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(conceptConnectorExamples, state),
	renderInput: input => renderConceptConnectorInput(conceptConnectorPrimitiveSchema.parse(input)),
	schema: conceptConnectorPrimitiveSchema,
	slug: 'concept-connector',
	states: exampleStates(conceptConnectorExamples, ['default', 'selected', 'intents'])
})

function renderConceptConnectorInput(input: ConceptConnectorValue) {
	return <ConceptConnector {...input} />
}
