import type { ReactNode } from 'react'
import { defineExamples } from '../../factories/createExamples'
import { Button } from '../../primitives'
import { ValidationSummary } from './component'

export const validationSummaryExamples = defineExamples({
	error: {
		description: 'Submit-blocking errors with field links.',
		render: () => (
			<FormStage>
				<ValidationSummary
					description="Resolve the listed fields before saving the workflow."
					items={[
						{
							href: '#owner',
							id: 'owner',
							label: 'Owner',
							message: 'Assign a responsible operator.'
						},
						{
							href: '#budget',
							id: 'budget',
							label: 'Budget limit',
							message: 'Enter a value between 1 and 100.'
						}
					]}
					status="error"
				/>
			</FormStage>
		)
	},
	mixed: {
		description: 'Multiple rows with mixed statuses.',
		render: () => (
			<FormStage>
				<ValidationSummary
					description="Resolve the listed fields before saving the workflow."
					items={[
						{
							href: '#owner',
							id: 'owner',
							label: 'Owner',
							message: 'Assign a responsible operator.'
						},
						{
							href: '#budget',
							id: 'budget',
							label: 'Budget limit',
							message: 'Enter a value between 1 and 100.'
						},
						{
							id: 'uploads',
							label: 'Reference packet',
							message: 'Two files are attached.',
							status: 'success'
						}
					]}
					status="error"
				/>
			</FormStage>
		)
	},
	success: {
		description: 'Positive ready state.',
		render: () => (
			<FormStage>
				<ValidationSummary
					action={
						<Button size="small" variant="secondary">
							Review
						</Button>
					}
					description="All required fields are complete and ready to submit."
					items={[
						{
							id: 'ready',
							label: 'Configuration',
							message: 'No blocking validation remains.',
							status: 'success'
						}
					]}
					status="success"
				/>
			</FormStage>
		)
	}
})

function FormStage({ children }: { children: ReactNode }) {
	return <div style={{ maxWidth: 620, width: '100%' }}>{children}</div>
}
