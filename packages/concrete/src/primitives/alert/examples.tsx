import { defineExamples } from '../../factories/createExamples'
import { Button } from '../button'
import { Alert } from './component'

export const alertExamples = defineExamples({
	default: {
		description: 'Neutral inline status message.',
		render: () => <Alert title="Ready">All required fields are complete.</Alert>
	},
	error: {
		description: 'Error status message with action slot.',
		render: () => (
			<Alert action={<Button density="small">Review</Button>} status="error" title="Review required">
				Two fields need attention.
			</Alert>
		)
	},
	success: {
		description: 'Success status message.',
		render: () => (
			<Alert status="success" title="Saved">
				Settings were updated.
			</Alert>
		)
	}
})
