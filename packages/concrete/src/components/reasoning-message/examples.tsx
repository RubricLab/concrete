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
					summary="Schema boundary verified; rerun passed."
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
					summary="Schema boundary verified; rerun passed."
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
					summary="Render failed after schema parsing."
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
					summary="Waiting for the active build gate."
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
	return <ReasoningMessage open summary="Checking schema and render boundaries before patching." />
}

const completeReasoningSteps = [
	{
		detail: 'Mapped the failing route to the generated example state.',
		id: 'route',
		label: 'Route',
		status: 'complete'
	},
	{
		detail: 'Checked the component schema, render input, and primitive assembly.',
		id: 'schema',
		label: 'Boundary',
		status: 'complete'
	},
	{
		detail: 'Patched the fixture and reran the catalog audit.',
		id: 'audit',
		label: 'Audit',
		status: 'complete'
	}
] as const

const errorReasoningSteps = [
	{
		detail: 'Loaded the docs route and captured the failing render input.',
		id: 'route',
		label: 'Route',
		status: 'complete'
	},
	{
		detail: 'The example still passes a function prop into a server-rendered client component.',
		id: 'serialize',
		label: 'Serialize',
		status: 'error'
	}
] as const

const pendingReasoningSteps = [
	{
		detail: 'The build gate is still running, so no file changes have started for this slice.',
		id: 'wait',
		label: 'Queued',
		status: 'pending'
	}
] as const
