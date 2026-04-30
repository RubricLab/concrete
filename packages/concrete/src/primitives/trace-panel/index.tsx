import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { TracePanel, TraceStep, TraceSteps } from './component'
import { tracePanelExamples } from './examples'
import { tracePanelMeta } from './meta'
import { type TracePanelValue, tracePanelSchema } from './schema'

export type {
	TracePanelProps,
	TraceStepProps,
	TraceStepsProps
} from './component'
export { TracePanel, TraceStep, TraceSteps } from './component'
export type { TracePanelInput, TracePanelValue } from './schema'
export { tracePanelPropsSchema, tracePanelSchema } from './schema'

export const tracePanelPrimitiveDefinition = createPrimitive({
	...tracePanelMeta,
	component: TracePanel,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(tracePanelExamples, state),
	renderInput: input => renderTracePanelInput(tracePanelSchema.parse(input)),
	schema: tracePanelSchema,
	slug: 'trace-panel',
	states: exampleStates(tracePanelExamples, ['default', 'closed', 'error'])
})

function renderTracePanelInput({ open, status, summary, title }: TracePanelValue) {
	return (
		<TracePanel open={open} status={status} stepCount={3} summary={summary} title={title}>
			<TraceSteps>
				<TraceStep label="Context loaded" status="complete" />
				<TraceStep label="Boundary selected" status="complete" />
				<TraceStep label="Running action" status={status} />
			</TraceSteps>
		</TracePanel>
	)
}
