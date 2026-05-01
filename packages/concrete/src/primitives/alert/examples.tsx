import { defineExamples } from '../../factories/createExamples'
import { Button } from '../button'
import { Stack } from '../stack'
import { Alert } from './component'

export const alertExamples = defineExamples({
	default: {
		description: 'Neutral inline status message.',
		render: () => (
			<Stack density="compact">
				<Alert title="Ready">All required fields are complete.</Alert>
				<Alert
					action={
						<Button density="small" hierarchy="secondary">
							Open
						</Button>
					}
					title="Draft saved"
				>
					Local changes are ready to review.
				</Alert>
			</Stack>
		)
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
