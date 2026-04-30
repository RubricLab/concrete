import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type FeedbackPanelMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const feedbackPanelMeta = {
	category: 'feedback',
	description: 'Compact validation feedback panel with status icon, action slot, and issue list.',
	guidance:
		'Use FeedbackPanel for aggregate form feedback. Keep field validation, issue derivation, focus routing, and submit behavior in the owning component.',
	name: 'Feedback Panel',
	pressure: ['product'],
	props: [
		prop('status', "'error' | 'success'", 'Overall feedback state.', 'error'),
		prop('title', 'ReactNode', 'Panel heading.'),
		prop('description', 'ReactNode', 'Optional supporting copy.'),
		prop('action', 'ReactNode', 'Trailing action slot.'),
		prop('items', 'FeedbackPanelItem[]', 'Validation issue rows.')
	]
} as const satisfies FeedbackPanelMeta
