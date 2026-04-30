import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type TypographyMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly []
}

export const typographyMeta = {
	category: 'typography',
	description:
		'Type families, scale, line height, and tracking for Concrete reading and product UI.',
	guidance: 'Use Jakarta for interface density and reserve Fraunces for editorial display moments.',
	name: 'Typography',
	pressure: ['product', 'editorial', 'educational'],
	props: []
} as const satisfies TypographyMeta
