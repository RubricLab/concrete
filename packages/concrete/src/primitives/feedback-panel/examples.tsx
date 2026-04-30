import { defineExamples } from '../../factories/createExamples'
import { Button } from '../button'
import { FeedbackPanel } from './component'

const feedbackItems = [
	{
		id: 'model',
		label: 'Default model',
		message: 'Choose a model before saving.'
	},
	{
		id: 'retention',
		label: 'Retention window',
		message: 'Use a value between 7 and 90 days.'
	}
] as const

export const feedbackPanelExamples = defineExamples({
	default: {
		description: 'Error feedback with field-level issue rows.',
		render: () => (
			<FeedbackPanel
				action={
					<Button size="small" variant="secondary">
						Review
					</Button>
				}
				description="Two fields need attention before this form can be saved."
				items={feedbackItems}
			/>
		)
	},
	success: {
		description: 'Success feedback after validation passes.',
		render: () => (
			<FeedbackPanel
				description="All required settings are complete."
				items={feedbackItems.map(item => ({ ...item, status: 'success' }))}
				status="success"
			/>
		)
	}
})
