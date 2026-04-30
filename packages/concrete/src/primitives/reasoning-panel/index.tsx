import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { ReasoningPanel, ReasoningPanelStep, ReasoningSteps } from './component'
import { reasoningPanelExamples } from './examples'
import { reasoningPanelMeta } from './meta'
import { type ReasoningPanelValue, reasoningPanelSchema } from './schema'

export type {
	ReasoningPanelProps,
	ReasoningPanelStepProps,
	ReasoningStepsProps
} from './component'
export { ReasoningPanel, ReasoningPanelStep, ReasoningSteps } from './component'
export type { ReasoningPanelInput, ReasoningPanelValue } from './schema'
export { reasoningPanelPropsSchema, reasoningPanelSchema } from './schema'

export const reasoningPanelPrimitiveDefinition = createPrimitive({
	...reasoningPanelMeta,
	component: ReasoningPanel,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(reasoningPanelExamples, state),
	renderInput: input => renderReasoningPanelInput(reasoningPanelSchema.parse(input)),
	schema: reasoningPanelSchema,
	slug: 'reasoning-panel',
	states: exampleStates(reasoningPanelExamples, ['default', 'closed', 'error'])
})

function renderReasoningPanelInput({ open, status, summary, title }: ReasoningPanelValue) {
	return (
		<ReasoningPanel open={open} status={status} stepCount={3} summary={summary} title={title}>
			<ReasoningSteps>
				<ReasoningPanelStep label="Context loaded" status="complete" />
				<ReasoningPanelStep label="Boundary selected" status="complete" />
				<ReasoningPanelStep label="Running action" status={status} />
			</ReasoningSteps>
		</ReasoningPanel>
	)
}
