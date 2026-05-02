import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type TiltFrameMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const tiltFrameMeta = {
	category: 'surface',
	description: 'Pointer-aware depth container for one highlighted surface.',
	guidance:
		'Use TiltFrame for one highlighted surface, not for every card in a dense grid. Keep the intensity subtle and pair with ScaleFrame when fixed preview scaling is needed.',
	name: 'TiltFrame',
	pressure: ['product', 'generative', 'educational'],
	props: [
		prop('interactive', 'boolean', 'Enables cursor-driven rotation.', 'true'),
		prop('intensity', "'subtle' | 'medium'", 'Rotation strength.', 'subtle'),
		prop('surface', "'raised' | 'sunken' | 'transparent'", 'Frame surface treatment.', 'raised'),
		prop('children', 'ReactNode', 'Frame content.')
	]
} as const satisfies TiltFrameMeta
