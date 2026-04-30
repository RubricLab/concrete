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
			'signal',
			"'terminal' | 'ultra' | 'error'",
			'Status signal. Amber warning is intentionally absent.',
			'terminal'
		),
		prop(
			'variant',
			"'soft' | 'solid' | 'ghost' | 'count'",
			'Badge emphasis and count treatment.',
			'soft'
		),
		prop('children', 'ReactNode', 'Badge label or count.')
	]
} as const satisfies BadgeMeta
