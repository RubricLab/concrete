import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type DeltaMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const deltaMeta = {
	category: 'data',
	description: 'Compact change indicator using terminal, error, or neutral ink.',
	guidance:
		'Delta is a numeric modifier. Keep the value concise and include basis only when the comparison would otherwise be unclear.',
	name: 'Delta',
	pressure: ['product'],
	props: [
		prop('value', 'string', 'Formatted delta text.', '', true),
		prop(
			'intent',
			"'positive' | 'negative' | 'neutral'",
			'Terminal, error, or neutral ink treatment.',
			'neutral'
		),
		prop(
			'density',
			"'compact' | 'comfortable' | 'editorial' | 'display'",
			'Delta type and icon rhythm.',
			'comfortable'
		),
		prop('hierarchy', "'plain' | 'wash'", 'Plain inline delta or soft tinted chip.', 'plain'),
		prop('basis', 'ReactNode', 'Optional comparison basis text.')
	]
} as const satisfies DeltaMeta
