import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type MotionMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly []
}

export const motionMeta = {
	category: 'foundation',
	description: 'Short motion tokens for focus, hover, disclosure, and loading feedback.',
	guidance: 'Motion should clarify state changes without becoming decorative.',
	name: 'Motion',
	pressure: ['product', 'generative'],
	props: []
} as const satisfies MotionMeta
