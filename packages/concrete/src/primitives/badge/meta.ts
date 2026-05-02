import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type BadgeMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const badgeMeta = {
	category: 'status',
	description: 'Status-leading signal label using terminal, ultra, or error only.',
	guidance:
		'Badges are terse status markers. Keep them signal-bound, numeric only for counts, and avoid inventing warning states.',
	name: 'Badge',
	pressure: ['product'],
	props: [
		prop(
			'intent',
			"'terminal' | 'ultra' | 'danger'",
			'Status intent. Amber warning is intentionally absent.',
			'terminal'
		),
		prop(
			'hierarchy',
			"'ghost' | 'soft' | 'solid'",
			'Badge emphasis without opening visual overrides.',
			'soft'
		),
		prop('purpose', "'status' | 'count'", 'Status text or numeric count treatment.', 'status'),
		prop('children', 'ReactNode', 'Badge label or count.')
	]
} as const satisfies BadgeMeta
