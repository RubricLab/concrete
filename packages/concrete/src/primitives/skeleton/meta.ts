import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type SkeletonMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const skeletonMeta = {
	category: 'feedback',
	description: 'Structural loading atom for educational and product placeholders.',
	guidance:
		'Skeletons should preserve the shape of pending content. Avoid using them as decorative shimmer blocks.',
	name: 'Skeleton',
	pressure: ['product', 'educational'],
	props: [
		prop('width', 'number | string', 'Rendered skeleton width.', '100%'),
		prop('height', 'number | string', 'Rendered skeleton height.', '12')
	]
} as const satisfies SkeletonMeta
