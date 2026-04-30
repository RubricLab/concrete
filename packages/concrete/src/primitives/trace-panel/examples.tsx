import { defineExamples } from '../../factories/createExamples'
import { TracePanel, TraceStep, TraceSteps } from './component'

export const tracePanelExamples = defineExamples({
	closed: {
		description: 'Closed trace summary.',
		render: () => (
			<TracePanel
				status="complete"
				stepCount={2}
				summary="Finished the verification pass."
				title="Reasoned"
			>
				<TraceSteps>
					<TraceStep label="Read context" status="complete" />
					<TraceStep label="Verified gates" status="complete" />
				</TraceSteps>
			</TracePanel>
		)
	},
	default: {
		description: 'Trace disclosure with compact step list.',
		render: () => (
			<TracePanel
				open
				status="streaming"
				stepCount={3}
				summary="Inspecting context and selecting the next action."
				title="Thinking"
			>
				<TraceSteps>
					<TraceStep label="Context loaded" status="complete" />
					<TraceStep
						detail="Focused primitives and component boundaries."
						label="Plan selected"
						status="complete"
					/>
					<TraceStep
						detail="Applying the current migration slice."
						label="Running action"
						status="streaming"
					/>
				</TraceSteps>
			</TracePanel>
		)
	},
	error: {
		description: 'Trace panel with failed step state.',
		render: () => (
			<TracePanel
				open
				status="error"
				stepCount={3}
				summary="Stopped after a catalog route returned an error."
				title="Needs attention"
			>
				<TraceSteps>
					<TraceStep label="Loaded registry" status="complete" />
					<TraceStep label="Rendered route" status="error" />
					<TraceStep label="Repair fixture" status="pending" />
				</TraceSteps>
			</TracePanel>
		)
	}
})
