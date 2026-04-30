import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type FrameMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const frameMeta = {
	category: 'layout',
	description: 'Single-border content frame with optional texture ground.',
	guidance:
		'Frames are for contained examples, generated panels, and educational fragments. Do not use them as a default page section wrapper.',
	name: 'Frame',
	pressure: ['editorial', 'product', 'educational'],
	props: [
		prop('header', 'ReactNode', 'Optional top eyebrow slot.'),
		prop('headerMeta', 'ReactNode', 'Optional top-right meta slot.'),
		prop('footer', 'ReactNode', 'Optional bottom eyebrow slot.'),
		prop('footerMeta', 'ReactNode', 'Optional bottom-right meta slot.'),
		prop('texture', "'lattice' | 'dots' | 'lines'", 'Optional tokenized body ground pattern.'),
		prop('children', 'ReactNode', 'Frame body content.')
	]
} as const satisfies FrameMeta
