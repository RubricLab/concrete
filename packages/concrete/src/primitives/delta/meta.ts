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
		prop('size', "'small' | 'medium' | 'large' | 'xlarge'", 'Delta type and icon scale.', 'medium'),
		prop('variant', "'bare' | 'wash'", 'Plain inline delta or soft tinted chip.', 'bare'),
		prop('basis', 'ReactNode', 'Optional comparison basis text.')
	]
} as const satisfies DeltaMeta
