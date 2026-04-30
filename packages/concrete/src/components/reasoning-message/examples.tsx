import { defineExamples } from '../../factories/createExamples'
import { ReasoningMessage } from './component'

export const reasoningMessageExamples = defineExamples({
	collapsed: {
		description: 'Collapsed summary-only state.',
		render: () => (
			<>
				<ReasoningMessage
					open={false}
					status="complete"
					steps={completeReasoningSteps}
					summary="Mapped failing logs to the evaluation fixture, checked schema boundaries, and isolated the change needed before rerunning."
				/>
			</>
		)
	},
	complete: {
		description: 'Completed reasoning summary.',
		render: () => (
			<>
				<ReasoningMessage
					open
					status="complete"
					steps={completeReasoningSteps}
					summary="Mapped failing logs to the evaluation fixture, checked schema boundaries, and isolated the change needed before rerunning."
				/>
			</>
		)
	},
	default: {
		description: 'Open reasoning artifact with active step.',
		render: () => renderStreamingReasoningMessage()
	},
	error: {
		description: 'Reasoning artifact with a failed verification step.',
		render: () => (
			<>
				<ReasoningMessage
					open
					status="error"
					steps={errorReasoningSteps}
					summary="The catalog route failed after the generated input passed schema parsing."
				/>
			</>
		)
	},
	pending: {
		description: 'Queued reasoning artifact before tool traces start.',
		render: () => (
			<>
				<ReasoningMessage
					status="pending"
					steps={pendingReasoningSteps}
					summary="Waiting for the current build gate before continuing the audit."
				/>
			</>
		)
	},
	streaming: {
		description: 'Open reasoning artifact with active step.',
		render: () => renderStreamingReasoningMessage()
	}
})

function renderStreamingReasoningMessage() {
	return (
		<ReasoningMessage
			open
			summary="Mapped failing logs to the evaluation fixture, checked schema boundaries, and isolated the change needed before rerunning."
		/>
	)
}

const completeReasoningSteps = [
	{
		detail: 'Mapped the failing route to the generated example state.',
		id: 'route',
		label: 'Route identified',
		status: 'complete'
	},
	{
		detail: 'Checked the component schema, render input, and primitive assembly.',
		id: 'schema',
		label: 'Boundary verified',
		status: 'complete'
	},
	{
		detail: 'Patched the fixture and reran the catalog audit.',
		id: 'audit',
		label: 'Audit passed',
		status: 'complete'
	}
] as const

const errorReasoningSteps = [
	{
		detail: 'Loaded the docs route and captured the failing render input.',
		id: 'route',
		label: 'Route identified',
		status: 'complete'
	},
	{
		detail: 'The example still passes a function prop into a server-rendered client component.',
		id: 'serialize',
		label: 'Serialization failed',
		status: 'error'
	}
] as const

const pendingReasoningSteps = [
	{
		detail: 'The build gate is still running, so no file changes have started for this slice.',
		id: 'wait',
		label: 'Waiting for gate',
		status: 'pending'
	}
] as const
