import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type TargetLineMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const targetLineMeta = {
	category: 'data',
	description: 'Chart target or threshold marker group.',
	guidance:
		'Use Target Line for goal, threshold, and comparator markers after scale utilities produce coordinates.',
	name: 'Target Line',
	pressure: ['product', 'generative'],
	props: [
		prop('ChartTarget.children', 'ReactNode', 'Target line and label SVG children.', undefined, true)
	]
} as const satisfies TargetLineMeta
