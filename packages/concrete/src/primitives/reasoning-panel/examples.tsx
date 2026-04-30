import { defineExamples } from '../../factories/createExamples'
import { ReasoningPanel, ReasoningPanelStep, ReasoningSteps } from './component'

export const reasoningPanelExamples = defineExamples({
	closed: {
		description: 'Closed reasoning summary.',
		render: () => (
			<ReasoningPanel
				status="complete"
				stepCount={2}
				summary="Finished the verification pass."
				title="Reasoned"
			>
				<ReasoningSteps>
					<ReasoningPanelStep label="Read context" status="complete" />
					<ReasoningPanelStep label="Verified gates" status="complete" />
				</ReasoningSteps>
			</ReasoningPanel>
		)
	},
	default: {
		description: 'Reasoning disclosure with compact step list.',
		render: () => (
			<ReasoningPanel
				open
				status="streaming"
				stepCount={3}
				summary="Inspecting context and selecting the next action."
				title="Thinking"
			>
				<ReasoningSteps>
					<ReasoningPanelStep label="Context loaded" status="complete" />
					<ReasoningPanelStep
						detail="Focused primitives and component boundaries."
						label="Plan selected"
						status="complete"
					/>
					<ReasoningPanelStep
						detail="Applying the current migration slice."
						label="Running action"
						status="streaming"
					/>
				</ReasoningSteps>
			</ReasoningPanel>
		)
	},
	error: {
		description: 'Reasoning panel with failed step state.',
		render: () => (
			<ReasoningPanel
				open
				status="error"
				stepCount={3}
				summary="Stopped after a catalog route returned an error."
				title="Needs attention"
			>
				<ReasoningSteps>
					<ReasoningPanelStep label="Loaded registry" status="complete" />
					<ReasoningPanelStep label="Rendered route" status="error" />
					<ReasoningPanelStep label="Repair fixture" status="pending" />
				</ReasoningSteps>
			</ReasoningPanel>
		)
	}
})
