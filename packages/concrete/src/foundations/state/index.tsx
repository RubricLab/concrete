import { exampleStates, renderExample } from '../../factories/createExamples'
import { createFoundation } from '../../factories/createItems'
import { stateExamples } from './examples'
import { stateMeta } from './meta'
import { stateFoundationSchema, stateTokens } from './schema'

export {
	commandItemIntentSchema,
	commandItemIntentValues,
	type Density,
	dataComponentStateSchema,
	dataComponentStateValues,
	dataDeltaIntentSchema,
	dataDeltaIntentValues,
	dataToneSchema,
	dataToneValues,
	densitySchema,
	densityValues,
	fieldStatusSchema,
	fieldStatusValues,
	type Hierarchy,
	hierarchySchema,
	hierarchyValues,
	messageStatusSchema,
	messageStatusValues,
	type StateFoundationInput,
	type StateFoundationValue,
	type StateSignal,
	type StateToken,
	stateFoundationSchema,
	stateSignalSchema,
	stateSignalValues,
	stateTokenKindSchema,
	stateTokenSchema,
	stateTokens,
	toolCallStatusSchema,
	toolCallStatusValues,
	uploadItemStatusSchema,
	uploadItemStatusValues
} from './schema'

export const stateFoundationDefinition = createFoundation({
	...stateMeta,
	kind: 'foundation',
	renderExample: (state?: string) => renderExample(stateExamples, state),
	schema: stateFoundationSchema,
	slug: 'state',
	states: exampleStates(stateExamples, ['default', 'statuses', 'tones']),
	tokens: stateTokens
})
