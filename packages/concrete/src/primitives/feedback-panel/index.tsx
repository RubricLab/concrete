import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { FeedbackPanel } from './component'
import { feedbackPanelExamples } from './examples'
import { feedbackPanelMeta } from './meta'
import { type FeedbackPanelValue, feedbackPanelSchema } from './schema'

export type {
	FeedbackListItemProps,
	FeedbackListProps,
	FeedbackPanelItem,
	FeedbackPanelProps,
	FeedbackPanelStatus
} from './component'
export { FeedbackList, FeedbackListItem, FeedbackPanel } from './component'
export type { FeedbackPanelInput, FeedbackPanelValue } from './schema'
export { feedbackPanelPropsSchema, feedbackPanelSchema } from './schema'

export const feedbackPanelPrimitiveDefinition = createPrimitive({
	...feedbackPanelMeta,
	component: FeedbackPanel,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(feedbackPanelExamples, state),
	renderInput: input => renderFeedbackPanelInput(feedbackPanelSchema.parse(input)),
	schema: feedbackPanelSchema,
	slug: 'feedback-panel',
	states: exampleStates(feedbackPanelExamples, ['default', 'success'])
})

function renderFeedbackPanelInput({ issueCount, status }: FeedbackPanelValue) {
	const items = [
		{
			id: 'model',
			label: 'Default model',
			message: 'Choose a model before saving.',
			status
		},
		{
			id: 'retention',
			label: 'Retention window',
			message: 'Use a value between 7 and 90 days.',
			status
		},
		{
			id: 'access',
			label: 'Access policy',
			message: 'Select at least one reviewer.',
			status
		},
		{
			id: 'destination',
			label: 'Destination',
			message: 'Add a publish target.',
			status
		}
	].slice(0, issueCount)

	return (
		<FeedbackPanel
			description={
				status === 'success'
					? 'All required settings are complete.'
					: 'Review the listed fields before saving.'
			}
			items={items}
			status={status}
		/>
	)
}
